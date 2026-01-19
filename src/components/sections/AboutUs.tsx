import React from 'react';
import Badge from '../common/Badge';

const AboutUs: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Badges & Stats */}
          <div className="space-y-6">
            <Badge variant="primary" className="text-base">
              🏆 Award Winning
            </Badge>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">10K+</div>
              <p className="text-gray-600">Active Users Worldwide</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">500K+</div>
              <p className="text-gray-600">Content Generated Daily</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">99.9%</div>
              <p className="text-gray-600">Platform Uptime</p>
            </div>
          </div>

          {/* Middle Column - Images */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl transform rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80"
              alt="AI Technology"
              className="relative rounded-3xl shadow-2xl"
            />
          </div>

          {/* Right Column - Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Future of AI is Here
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're building the most advanced AI platform to help businesses and individuals
              unlock their full potential. Our mission is to make AI accessible to everyone.
            </p>
            <div className="space-y-4">
              {[
                'Powered by latest AI models',
                'Enterprise-grade security',
                '24/7 customer support',
                'Continuous improvements',
              ].map((item) => (
                <div key={item} className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
