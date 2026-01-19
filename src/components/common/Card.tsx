import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  const hoverClass = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg transition-all duration-300 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
