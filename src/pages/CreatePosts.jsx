import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './CreatePosts.css';

// 🔥 IMAGE COMPRESS FUNCTION
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const maxWidth = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = height * (maxWidth / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          resolve(blob);
        },
        "image/jpeg",
        0.7
      );
    };
  });
};

const CreatePost = () => {
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postCategory, setPostCategory] = useState("technology");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    { id: "technology", name: "Technology", icon: "💻", description: "Cutting-edge tech" },
    { id: "business", name: "Business", icon: "📈", description: "Market & strategy" },
    { id: "lifestyle", name: "Lifestyle", icon: "✨", description: "Modern living" },
    { id: "creativity", name: "Creativity", icon: "🎨", description: "Art & ideas" },
    { id: "wisdom", name: "Wisdom", icon: "📚", description: "Mindset & growth" },
    { id: "innovation", name: "Innovation", icon: "⚡", description: "Future thinking" }
  ];

  // 🔥 FIXED IMAGE HANDLER
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Type check
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP allowed");
      return;
    }

    // ✅ Size check
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      const compressed = await compressImage(file);

      // Preview
      const preview = URL.createObjectURL(compressed);
      setImagePreview(preview);

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(compressed);

    } catch (err) {
      console.error(err);
      toast.error("Image processing failed");
    }
  };

  const sendPost = async () => {
    if (!postTitle.trim()) return toast.error("Enter title");
    if (!postContent.trim()) return toast.error("Enter content");

    setIsLoading(true);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    const payload = {
      postTitle: postTitle.trim(),
      postContent: postContent.trim(),
      postCategory,
      postImage: postImage || null,
      authorId: user.id || user._id,
      authorName: user.name || `${user.firstName} ${user.lastName}` || "Anonymous"
    };

    try {
      const res = await axios.post(
        "http://localhost:5008/api/v1/posts/createPost",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        toast.success("Post published 🎉");
        setTimeout(() => navigate("/home"), 1200);
      } else {
        toast.error("Failed to publish");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <ToastContainer />

      <div className="post-container">
        <div className="post-header">
          <button onClick={() => navigate(-1)}>←</button>
          <h3>Create New Post</h3>
        </div>

        <div className="post-card">

          {/* CATEGORY */}
          <div className="category-grid">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={postCategory === cat.id ? "active" : ""}
                onClick={() => setPostCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Title..."
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />

          {/* CONTENT */}
          <textarea
            placeholder="Write your story..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          {/* IMAGE */}
          {!imagePreview ? (
            <>
              <input type="file" id="postImage" hidden onChange={handleImage} />
              <button onClick={() => document.getElementById("postImage").click()}>
                Upload Image
              </button>
            </>
          ) : (
            <div>
              <img src={imagePreview} alt="preview" width="100%" />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setPostImage("");
                  document.getElementById("postImage").value = "";
                }}
              >
                Remove
              </button>
            </div>
          )}

          {/* SUBMIT */}
          <button disabled={isLoading} onClick={sendPost}>
            {isLoading ? "Publishing..." : "Publish"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreatePost;