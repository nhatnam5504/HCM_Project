import React from 'react';
import { pricingPlans } from '../../data/pricing';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include a 7-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 ${
                plan.highlighted
                  ? 'ring-4 ring-purple-600 scale-105 relative'
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="primary">Most Popular</Badge>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>

              <Button
                variant={plan.highlighted ? 'primary' : 'outline'}
                size="md"
                className="w-full mb-6"
              >
                {plan.buttonText}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Need a custom plan?{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
