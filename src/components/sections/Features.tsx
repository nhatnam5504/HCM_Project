import React, { useState } from 'react';
import Button from '../common/Button';

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Content Creation',
      description: 'Generate high-quality content in seconds with advanced AI models',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    },
    {
      title: 'Smart Analytics',
      description: 'Get deep insights and actionable data from your AI-generated content',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time collaboration features',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, manage, and scale your AI-powered workflows
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab, index) => (
              <Button
                key={index}
                variant={activeTab === index ? 'primary' : 'outline'}
                size="md"
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {tabs[activeTab].title}
              </h3>
              <p className="text-lg text-gray-600 mb-8">{tabs[activeTab].description}</p>
              <ul className="space-y-4">
                {[
                  'Advanced AI algorithms for better results',
                  'Customizable templates and workflows',
                  'Real-time collaboration and feedback',
                  'Seamless integration with your tools',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
