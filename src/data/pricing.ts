import { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'Perfect for individuals and small projects',
    features: [
      '10,000 words per month',
      'Basic AI models',
      'Email support',
      '5 projects',
      'Basic templates',
    ],
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: '$49',
    period: '/month',
    description: 'Ideal for growing teams and businesses',
    features: [
      '100,000 words per month',
      'Advanced AI models',
      'Priority support',
      'Unlimited projects',
      'Custom templates',
      'Team collaboration',
      'API access',
    ],
    highlighted: true,
    buttonText: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited words',
      'All AI models',
      'Dedicated support',
      'Unlimited projects',
      'Custom AI training',
      'Advanced analytics',
      'SLA guarantee',
      'Custom integration',
    ],
    buttonText: 'Contact Sales',
  },
];
