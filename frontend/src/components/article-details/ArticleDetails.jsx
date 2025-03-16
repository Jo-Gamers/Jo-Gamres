
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../navbar/Navbar";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Fetch article data
  useEffect(() => {
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock article data
      const mockArticle = {
        id: 1,
        title: "Elden Ring DLC Announced: Shadow of the Erdtree",
        excerpt: "FromSoftware reveals new expansion coming this summer with new bosses, areas, and weapons. Prepare to die again in the land of shadows.",
        content: `
          <p>FromSoftware and Bandai Namco have officially announced the highly anticipated DLC for Elden Ring, titled "Shadow of the Erdtree." Set to release in Summer 2025, this expansion promises to build upon the critically acclaimed base game with a wealth of new content.</p>
          
          <p>According to game director Hidetaka Miyazaki, the expansion will take players to a completely new region that wasn't accessible in the original game. "We wanted to create something that would surprise even veteran players of Elden Ring," Miyazaki stated in a press release. "The Land of Shadow exists as a dark reflection of the Lands Between, with its own history and inhabitants."</p>
          
          <h3>New Features</h3>
          <p>The DLC is set to include:</p>
          <ul>
            <li>A vast new map area approximately 30% the size of the original game</li>
            <li>Over 10 new boss encounters, including 5 major story bosses</li>
            <li>Dozens of new weapons, armor sets, and spells</li>
            <li>New enemy types and NPCs with their own questlines</li>
            <li>Additional lore that expands on the enigmatic history of the Lands Between</li>
          </ul>
          
          <p>The trailer showcased several intimidating new bosses, including a towering knight wielding a massive crystalline greatsword and what appears to be a corrupted version of a familiar character from the base game.</p>
          
          <h3>Continuing the Legacy</h3>
          <p>Elden Ring has sold over 25 million copies since its release, becoming FromSoftware's most successful title to date. The game has received universal acclaim for its open-world design, challenging gameplay, and rich lore created in collaboration with fantasy author George R.R. Martin.</p>
          
          <p>The announcement comes as welcome news to the dedicated Elden Ring community, which has remained active with regular PvP events, speedrunning competitions, and lore discussions despite the game being out for over three years.</p>
          
          <h3>Availability and Pricing</h3>
          <p>Shadow of the Erdtree will be available on all platforms that currently support Elden Ring: PC, PlayStation 5, PlayStation 4, Xbox Series X|S, and Xbox One. The expansion will be priced at $39.99, with a Digital Deluxe Edition available for $49.99 that includes a digital artbook and soundtrack.</p>
          
          <p>Pre-orders are set to go live next month, with early purchasers receiving an exclusive in-game weapon and armor set.</p>
        `,
        platform: "PC, PS5, Xbox",
        category: "RPG",
        images: [
          "/api/placeholder/800/400",
          "/api/placeholder/800/400",
          "/api/placeholder/800/400",
          "/api/placeholder/800/400"
        ],
        date: "March 10, 2025",
        readTime: "8 min read",
        author: "Alex Johnson",
        authorImage: null,
        tags: ["FromSoftware", "Elden Ring", "DLC", "RPG", "Action RPG"]
      };

      // Mock comments
      const mockComments = [
        {
          id: 1,
          author: "SoulsBorne_Fan",
          content: "Can't wait for this DLC! Elden Ring is easily my GOTY for 2022, and I've been waiting for more content.",
          date: "March 10, 2025",
          likes: 24
        },
        {
          id: 2,
          author: "RPGLover42",
          content: "I hope they include more magic options in this DLC. The base game had some great spells but I'd love to see more variety for pure caster builds.",
          date: "March 11, 2025",
          likes: 17
        },
        {
          id: 3,
          author: "GitGudGamer",
          content: "The trailer looks amazing! That knight boss with the crystal sword is going to destroy us all...",
          date: "March 11, 2025",
          likes: 32
        }
      ];

      // Mock related articles
      const mockRelatedArticles = [
        {
          id: 2,
          title: "FromSoftware Hints at New IP in Development",
          image: "/api/placeholder/400/250",
          category: "Industry News"
        },
        {
          id: 3,
          title: "Elden Ring Game of the Year Edition Announced",
          image: "/api/placeholder/400/250",
          category: "RPG"
        },
        {
          id: 4,
          title: "Top 10 Hardest Bosses in Soulsborne Games",
          image: "/api/placeholder/400/250",
          category: "Lists"
        }
      ];

      setArticle(mockArticle);
      setComments(mockComments);
      setRelatedArticles(mockRelatedArticles);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Handle image slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === article.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? article.images.length - 1 : prev - 1));
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: "You",
      content: comment,
      date: new Date().toLocaleDateString(),
      likes: 0
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  // Toggle like/bookmark
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Get category icon
  const getCategoryIcon = (categoryName) => {
    const categories = [
      { name: "FPS", icon: "🎯" },
      { name: "RPG", icon: "⚔️" },
      { name: "Adventure", icon: "🗺️" },
      { name: "Strategy", icon: "🧠" },
      { name: "Sports", icon: "🏆" },
      { name: "Hardware", icon: "🖥️" },
      { name: "Indie", icon: "🎮" },
      { name: "Mobile", icon: "📱" },
      { name: "Industry News", icon: "📰" },
      { name: "Lists", icon: "📋" }
    ];
    
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : '📰';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFF5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#497174] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#497174] font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFF5F5]">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-8 mt-15">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-[#497174]">Home</a>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <a href="/articles" className="hover:text-[#497174]">Articles</a>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span className="text-[#497174] font-medium">{article.title}</span>
        </div>
        
       
        {/* Image Slider */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <div className="overflow-hidden aspect-video">
              {article.images.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Slider Controls */}
            <button 
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {article.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
        
         {/* Article Header */}
         <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#D6E4E5] text-[#497174] text-sm font-medium px-3 py-1 rounded-full flex items-center">
                {getCategoryIcon(article.category)} <span className="ml-1">{article.category}</span>
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                {article.platform}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {article.readTime}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {article.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#497174] mb-4">{article.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{article.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#497174] rounded-full flex items-center justify-center text-white text-lg">
                  {article.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-[#497174]">{article.author}</p>
                  <p className="text-xs text-gray-500">Staff Writer</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={toggleLike}
                  className={`p-2 rounded-full ${isLiked ? 'bg-[#EB6440] text-white' : 'bg-[#D6E4E5] text-[#497174]'}`}
                >
                  <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <button 
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full ${isBookmarked ? 'bg-[#497174] text-white' : 'bg-[#D6E4E5] text-[#497174]'}`}
                >
                  <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-[#D6E4E5] text-[#497174]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-[#D6E4E5] text-[#497174]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }}></div>
            
            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#497174] mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <a 
                    key={index}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-[#D6E4E5] text-[#497174] text-sm rounded-full hover:bg-[#497174] hover:text-white transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#497174] mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Comments ({comments.length})
            </h2>
            
            {/* Add Comment */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#497174] rounded-full flex items-center justify-center text-white">
                    Y
                  </div>
                </div>
                <div className="flex-grow">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 border border-[#D6E4E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#497174] min-h-24 bg-[#EFF5F5] resize-none"
                    placeholder="Share your thoughts..."
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button 
                      type="submit" 
                      className="px-6 py-2 bg-[#EB6440] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
            
            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#497174] rounded-full flex items-center justify-center text-white">
                        {comment.author.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center mb-1">
                        <h4 className="font-bold text-[#497174]">{comment.author}</h4>
                        <span className="text-xs text-gray-500 ml-2">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-[#EB6440]">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                          </svg>
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-gray-500 hover:text-[#497174]">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Related Articles */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#497174] mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <a 
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="block bg-[#EFF5F5] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-white text-[#497174] text-xs font-bold px-2 py-1 rounded-full">
                        {getCategoryIcon(article.category)} {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#497174] line-clamp-2">{article.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetails;