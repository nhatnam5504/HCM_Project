import React from 'react';
import { blogPosts } from '../../data/blog';
import Card from '../common/Card';
import Badge from '../common/Badge';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Insights & Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest AI trends, tips, and news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.slice(0, 3).map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="text-purple-600 hover:text-purple-700 font-semibold text-lg inline-flex items-center"
          >
            View all articles
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
