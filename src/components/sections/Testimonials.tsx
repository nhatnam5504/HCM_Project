import React from 'react';
import { testimonials } from '../../data/testimonials';
import Card from '../common/Card';
import StarIcon from '../common/StarIcon';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Thousands of Users
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative mb-16">
          <div className="flex animate-marquee space-x-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-96 p-6"
                hover={false}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { value: '10,000+', label: 'Happy Customers' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '99%', label: 'Satisfaction Rate' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
