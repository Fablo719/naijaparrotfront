import React from 'react';
import { Link } from 'react-router-dom';
import "./Ourstories.css";
const Ourstories = () => {
//   return (
//     <section className="about-timocomblog py-5">
//       <div className="container">
//         {/* Hero Section */}
//         <div className="row justify-content-center text-center mb-5">
//           <div className="col-lg-8">
//             <h1 className="display-4 fw-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
//               Everyone has a story to tell
//             </h1>
//             <p className="lead text-secondary mb-4" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
//               TimocomBlog is a home for human stories and ideas. Here, anyone can share knowledge 
//               and wisdom with the world—without having to build a mailing list or a following first.
//               The internet is noisy and chaotic; TimocomBlog is quiet yet full of insight. 
//               It's simple, beautiful, collaborative, and helps you find the right readers for 
//               whatever you have to say.
//             </p>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div className="row g-4 mb-5">
//           <div className="col-md-4">
//             <div className="card h-100 border-0 bg-light rounded-4 p-4">
//               <div className="card-body">
//                 <div className="feature-icon mb-4">
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
//                   </svg>
//                 </div>
//                 <h3 className="h5 fw-bold mb-3">Simple & Beautiful</h3>
//                 <p className="text-secondary mb-0">
//                   The internet is noisy and chaotic; TimocomBlog is quiet yet full of insight. 
//                   It's simple, beautiful, collaborative, and helps you find the right readers.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="card h-100 border-0 bg-light rounded-4 p-4">
//               <div className="card-body">
//                 <div className="feature-icon mb-4">
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                     <circle cx="12" cy="12" r="10"/>
//                     <path d="M12 6v6l4 2"/>
//                   </svg>
//                 </div>
//                 <h3 className="h5 fw-bold mb-3">Time Well Spent</h3>
//                 <p className="text-secondary mb-0">
//                   We're building a system that rewards depth, nuance, and time well spent. 
//                   A space for thoughtful conversation and substance over packaging.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="card h-100 border-0 bg-light rounded-4 p-4">
//               <div className="card-body">
//                 <div className="feature-icon mb-4">
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
//                     <circle cx="9" cy="7" r="4"/>
//                     <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
//                     <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//                   </svg>
//                 </div>
//                 <h3 className="h5 fw-bold mb-3">100M+ Readers</h3>
//                 <p className="text-secondary mb-0">
//                   Over 100 million people connect and share their wisdom on TimocomBlog every month. 
//                   From software developers to CEOs, everyone has a story.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mission Statement */}
//         <div className="row justify-content-center mb-5">
//           <div className="col-lg-8">
//             <div className="text-center p-5 bg-white rounded-4 border">
//               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-success">
//                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//               </svg>
//               <blockquote className="fs-4 fst-italic text-secondary mb-4" style={{ lineHeight: '1.6' }}>
//                 "Ultimately, our goal is to deepen our collective understanding of the world 
//                 through the power of writing. We believe that what you read and write matters. 
//                 Words can divide or empower us, inspire or discourage us."
//               </blockquote>
//               <div className="small text-muted">— The TimocomBlog Team</div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="row g-4">
//           <div className="col-md-4">
//             <Link to="/posts" className="text-decoration-none">
//               <div className="card h-100 border-0 bg-dark text-white rounded-4 p-4 hover-lift transition-all">
//                 <div className="card-body d-flex flex-column">
//                   <div className="d-flex align-items-center mb-4">
//                     <span className="display-6 me-3"></span>
//                     <h3 className="h4 fw-bold mb-0">Start reading</h3>
//                   </div>
//                   <p className="text-white-50 mb-4">
//                     Dive deeper into whatever matters to you. Find posts that help you learn 
//                     something new or reconsider something familiar.
//                   </p>
//                   <div className="mt-auto">
//                     <span className="text-white">
//                       Start reading → 
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>

//           <div className="col-md-4">
//             <Link to="/createpost" className="text-decoration-none">
//               <div className="card h-100 border-0 bg-success text-white rounded-4 p-4 hover-lift transition-all">
//                 <div className="card-body d-flex flex-column">
//                   <div className="d-flex align-items-center mb-4">
//                     <span className="display-6 me-3"></span>
//                     <h3 className="h4 fw-bold mb-0">Start writing</h3>
//                   </div>
//                   <p className="text-white-50 mb-4">
//                     Share your knowledge and wisdom with the world. Write about what you're 
//                     working on, what you've learned, or what keeps you up at night.
//                   </p>
//                   <div className="mt-auto">
//                     <span className="text-white">
//                       Start writing → 
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>

//           <div className="col-md-4">
//             <Link to="/membership" className="text-decoration-none">
//               <div className="card h-100 border-0 bg-primary text-white rounded-4 p-4 hover-lift transition-all">
//                 <div className="card-body d-flex flex-column">
//                   <div className="d-flex align-items-center mb-4">
//                     <span className="display-6 me-3"></span>
//                     <h3 className="h4 fw-bold mb-0">Become a member</h3>
//                   </div>
//                   <p className="text-white-50 mb-4">
//                     Instead of selling ads or your data, we're supported by a growing community 
//                     of over a million TimocomBlog members who believe in our mission.
//                   </p>
//                   <div className="mt-auto">
//                     <span className="text-white">
//                       Become a member → 
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="row mt-5 pt-5 justify-content-center text-center">
//           <div className="col-md-3 col-6 mb-4">
//             <div className="display-3 fw-bold text-dark">100M+</div>
//             <div className="text-secondary">Monthly readers</div>
//           </div>
//           <div className="col-md-3 col-6 mb-4">
//             <div className="display-3 fw-bold text-dark">1M+</div>
//             <div className="text-secondary">Members</div>
//           </div>
//           <div className="col-md-3 col-6 mb-4">
//             <div className="display-3 fw-bold text-dark">50K+</div>
//             <div className="text-secondary">Writers</div>
//           </div>
//           <div className="col-md-3 col-6 mb-4">
//             <div className="display-3 fw-bold text-dark">2024</div>
//             <div className="text-secondary">Founded</div>
//           </div>
//         </div>
//         <div>
//         </div>
//         <style>{`
//       body {
//   margin: 70px;
//   overflow-x: hidden;
//   margin-left: -320px;
// }
//   `}</style>
//       </div>
//     </section>
//   );
};

export default Ourstories;