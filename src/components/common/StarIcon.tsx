import React from 'react';

interface StarIconProps {
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 0l2.5 6.5L19 7.5l-5 4.5 1.5 7-5.5-3.5L4 19l1.5-7-5-4.5 6.5-1L10 0z" />
    </svg>
  );
};

export default StarIcon;
