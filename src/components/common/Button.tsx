import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
  onClick,
  type = 'button',
}) => {
  const baseStyles = 'font-medium transition-all duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
