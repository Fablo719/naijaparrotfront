import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Categories with icons
    const categories = [
        { id: 'all', name: 'All', icon: '🌐' },
        { id: 'technology', name: 'Technology', icon: '💻' },
        { id: 'business', name: 'Business', icon: '📈' },
        { id: 'lifestyle', name: 'Lifestyle', icon: '✨' },
        { id: 'creativity', name: 'Creativity', icon: '🎨' },
        { id: 'wisdom', name: 'Wisdom', icon: '📚' },
        { id: 'innovation', name: 'Innovation', icon: '⚡' }
    ];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUser(user);
        fetchPosts();
    }, []);

    // Filter and sort posts when category changes
    useEffect(() => {
        let filtered = [...posts];
        
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.postCategory === selectedCategory);
        }
        
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFilteredPosts(filtered);
    }, [posts, selectedCategory]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                "https://naijaparrot.vercel.app/api/v1/posts/getAllPosts",
                {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                }
            );
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const response = await axios.get(
                `https://naijaparrot.vercel.app//api/v1/posts/search?q=${searchQuery}`,
                {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                }
            );
            setSearchResults(response.data.posts || []);
        } catch (error) {
            console.error("Error searching posts:", error);
        } finally {
            setIsSearching(false);
        }
    };

const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `https://naijaparrot.vercel.app/api/v1/posts/${postId}/like`,
                {},
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            likes: response.data.isLiked
                                ? [...(post.likes || []), currentUser?._id]
                                : (post.likes || []).filter(id => id !== currentUser?._id)
                        }
                        : post
                )
            );
            if (response.data.isLiked) {
                toast.success('Post liked!');
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading amazing stories...</p>
            </div>
        );
    }

    return (
        <>
            {/* Premium Navigation */}
            <nav className="premium-navbar">
                <div className="nav-container">
                    <div className="nav-left">
                        <button className="menu-btn" onClick={() => setShowOffcanvas(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                        <div className="logo" onClick={() => navigate('/home')}>
                            <span className="logo-icon">🦜</span>
                            <span className="logo-text">NaijaParrot</span>
                        </div>
                    </div>

                    <div className="nav-search">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search stories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit">
                                {isSearching ? <span className="search-spinner"></span> : '🔍'}
                            </button>
                        </form>
                    </div>

                    <div className="nav-right">
                        <button className="compose-btn" onClick={() => navigate('/createpost')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>Compose</span>
                        </button>
                        <div className="user-avatar" onClick={() => setShowOffcanvas(true)}>
                            <img 
                                src={`https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=000000&color=fff&size=40&bold=true`} 
                                alt="avatar" 
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Premium Sidebar */}
            <div className={`premium-sidebar ${showOffcanvas ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <span className="logo-icon">🦜</span>
                        <span className="logo-text">NaijaParrot</span>
                    </div>
                    <button className="close-btn" onClick={() => setShowOffcanvas(false)}>✕</button>
                </div>
                
                <div className="sidebar-user">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=000000&color=fff&size=80&bold=true`} 
                        alt="profile" 
                    />
                    <h4>{currentUser?.name || 'Guest User'}</h4>
                    <p>{currentUser?.email || 'Not signed in'}</p>
                </div>

                <div className="sidebar-menu">
                    <button onClick={() => { navigate('/home'); setShowOffcanvas(false); }}>
                        <span>🏠</span> Home
                    </button>
                    <button onClick={() => { navigate('/profile'); setShowOffcanvas(false); }}>
                        <span>👤</span> Profile
                    </button>
                    {currentUser?.role === "admin" && (
                        <button onClick={() => { navigate('/Administrator/Dashboard'); setShowOffcanvas(false); }}>
                            <span>👨‍💼</span> You're an admin
                        </button>
                    )}
                    <button onClick={handleLogout} className="logout-btn">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </div>

            {showOffcanvas && <div className="sidebar-overlay" onClick={() => setShowOffcanvas(false)}></div>}

            {/* Main Content */}
            <main className="main-content">
                <div className="content-container">
                    {searchQuery && searchResults.length > 0 ? (
                        // Search Results
                        <>
                            <div className="search-header">
                                <h2>Search Results for "{searchQuery}"</h2>
                                <button onClick={clearSearch}>Clear Search</button>
                            </div>
                            <div className="posts-feed">
                                {searchResults.map(post => (
                                    <PostCard 
                                        key={post._id} 
                                        post={post} 
                                        handleLike={handleLike} 
                                        currentUser={currentUser} 
                                    />
                                ))}
                            </div>
                        </>
                    ) : searchQuery ? (
                        <div className="empty-search">
                            <span>🔍</span>
                            <h3>No results found</h3>
                            <p>Try searching for something else</p>
                            <button onClick={clearSearch}>Clear Search</button>
                        </div>
                    ) : (
                        <>
                            {/* Categories Section */}
                            <div className="categories-section">
                                <div className="categories-header">
                                    <h2>Trending</h2>
                                </div>
                                
                                <div className="categories-list">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(cat.id)}
                                        >
                                            <span>{cat.icon}</span>
                                            <span>{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Vertical Posts Feed */}
                            {filteredPosts.length > 0 ? (
                                <div className="posts-feed">
                                    {filteredPosts.map(post => (
                                        <PostCard 
                                            key={post._id} 
                                            post={post} 
                                            handleLike={handleLike} 
                                            currentUser={currentUser} 
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <span>📭</span>
                                    <h3>No posts in this category</h3>
                                    <p>Be the first to share a story in {categories.find(c => c.id === selectedCategory)?.name}</p>
                                    <button onClick={() => navigate('/createpost')}>Create a Post</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

// Post Card Component
const PostCard = ({ post, handleLike, currentUser }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [localComments, setLocalComments] = useState(post.comments || []);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => { 
        setLocalComments(post.comments || []); 
    }, [post.comments]);

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        try {
            const response = await axios.post(
                `https://naijaparrot.vercel.app/api/v1/posts/${post._id}/comment`,
                { comment: commentText },
                { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
            );
            if (response.data.success) {
                setLocalComments([...localComments, { 
                    userId: currentUser?.id, 
                    userName: currentUser?.name, 
                    comment: commentText, 
                    createdAt: new Date() 
                }]);
                setCommentText('');
            }
        } catch (error) { 
            console.error("Error adding comment:", error); 
        }
    };

    const isLiked = post.likes?.includes(currentUser?._id);
    const trendingScore = (post.likes?.length || 0) + (post.comments?.length || 0);

    const getCategoryIcon = (category) => {
        const icons = {
            technology: '💻',
            business: '📈',
            lifestyle: '✨',
            creativity: '🎨',
            wisdom: '📚',
            innovation: '⚡'
        };
        return icons[category] || '📄';
    };

    return (
        <article className="post-card-modern">
            {post.postImage && (
                <div className="post-image">
                    <img src={post.postImage} alt={post.postTitle} />
                </div>
            )}
            <div className="post-content">
                <div className="post-meta">
                    <div className="author-info">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${post.authorName}&background=000000&color=fff&size=32&bold=true`} 
                            alt={post.authorName} 
                        />
                        <div>
                            <span className="author-name">{post.authorName}</span>
                            <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <span className="category-badge">
                        {getCategoryIcon(post.postCategory)} {post.postCategory}
                    </span>
                    {trendingScore > 10 && (
                        <span className="trending-badge">🔥 Trending</span>
                    )}
                </div>

                <h3 className="post-title">{post.postTitle}</h3>
                
                <p className="post-excerpt">
                    {expanded ? post.postContent : post.postContent.slice(0, 180)}
                    {post.postContent.length > 180 && (
                        <button className="read-more" onClick={() => setExpanded(!expanded)}>
                            {expanded ? 'Show less' : '...Read more'}
                        </button>
                    )}
                </p>

                <div className="post-stats">
                    <button 
                        className={`stat-btn like-btn ${isLiked ? 'active' : ''}`} 
                        onClick={() => handleLike(post._id)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>{post.likes?.length || 0}</span>
                    </button>
                    <button 
                        className="stat-btn comment-btn" 
                        onClick={() => setShowComments(!showComments)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2"/>
                        </svg>
                        <span>{localComments.length}</span>
                    </button>
                </div>

                {showComments && (
                    <div className="comments-section">
                        <div className="add-comment">
                            <input 
                                type="text" 
                                placeholder="Write a comment..." 
                                value={commentText} 
                                onChange={(e) => setCommentText(e.target.value)} 
                            />
                            <button onClick={handleAddComment}>Post</button>
                        </div>
                        {localComments.map((comment, idx) => (
                            <div key={idx} className="comment">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${comment.userName || 'U'}&background=000000&color=fff&size=24&bold=true`} 
                                    alt="user" 
                                />
                                <div className="comment-content">
                                    <strong>{comment.userName || 'User'}</strong>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default Home;