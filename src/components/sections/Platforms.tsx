import React from 'react';
import { features } from '../../data/features';
import Card from '../common/Card';

const Platforms: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            One Platform, Endless Possibilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to supercharge your workflow with AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-8 text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
