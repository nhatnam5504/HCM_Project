export interface NavLink {
  label: string;
  href: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}
