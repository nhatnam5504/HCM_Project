import gsap from 'gsap';

// Reusable animation presets
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  },
  fadeInDown: {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  },
  fadeInLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
  },
  fadeInRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
  },
  rotateIn: {
    from: { opacity: 0, rotation: -180, scale: 0 },
    to: { opacity: 1, rotation: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
  },
};

// Create a staggered animation
export const createStaggerAnimation = (
  targets: gsap.TweenTarget,
  preset: keyof typeof animationPresets = 'fadeInUp',
  staggerAmount: number = 0.1
) => {
  const { from, to } = animationPresets[preset];
  return gsap.fromTo(targets, from, { ...to, stagger: staggerAmount });
};

// Create a timeline with common defaults
export const createTimeline = (defaults?: gsap.TimelineVars) => {
  return gsap.timeline({
    defaults: {
      duration: 0.6,
      ease: 'power3.out',
      ...defaults,
    },
  });
};

// Parallax effect helper
export const createParallax = (
  element: gsap.TweenTarget,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  const property = direction === 'vertical' ? 'yPercent' : 'xPercent';
  return gsap.to(element, {
    [property]: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element as Element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Hover effect helper
export const createHoverEffect = (
  element: Element,
  hoverVars: gsap.TweenVars = { scale: 1.05, duration: 0.3 },
  resetVars: gsap.TweenVars = { scale: 1, duration: 0.3 }
) => {
  element.addEventListener('mouseenter', () => gsap.to(element, hoverVars));
  element.addEventListener('mouseleave', () => gsap.to(element, resetVars));
};

// Continuous animation helper
export const createContinuousAnimation = (
  element: gsap.TweenTarget,
  vars: gsap.TweenVars,
  options: { yoyo?: boolean; repeat?: number } = {}
) => {
  return gsap.to(element, {
    ...vars,
    repeat: options.repeat ?? -1,
    yoyo: options.yoyo ?? true,
    ease: vars.ease || 'sine.inOut',
  });
};

// Floating animation
export const createFloatingAnimation = (
  element: gsap.TweenTarget,
  distance: number = 20,
  duration: number = 3
) => {
  return gsap.to(element, {
    y: -distance,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

// Rotate animation
export const createRotateAnimation = (
  element: gsap.TweenTarget,
  duration: number = 10,
  clockwise: boolean = true
) => {
  return gsap.to(element, {
    rotation: clockwise ? 360 : -360,
    duration,
    repeat: -1,
    ease: 'none',
  });
};

// Pulse animation
export const createPulseAnimation = (
  element: gsap.TweenTarget,
  scale: number = 1.1,
  duration: number = 1
) => {
  return gsap.to(element, {
    scale,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
};

// Typewriter effect
export const createTypewriterEffect = (
  element: HTMLElement,
  text: string,
  duration: number = 2
) => {
  const chars = text.split('');
  element.textContent = '';
  
  return gsap.to({}, {
    duration,
    onUpdate: function () {
      const progress = this.progress();
      const currentLength = Math.floor(progress * chars.length);
      element.textContent = chars.slice(0, currentLength).join('');
    },
  });
};

// Scroll reveal helper
export const createScrollReveal = (
  elements: gsap.TweenTarget,
  options: {
    preset?: keyof typeof animationPresets;
    stagger?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    preset = 'fadeInUp',
    stagger = 0.1,
    start = 'top 75%',
    end = 'top 25%',
    scrub = false,
  } = options;

  const { from, to } = animationPresets[preset];

  return gsap.fromTo(elements, from, {
    ...to,
    stagger,
    scrollTrigger: {
      trigger: elements as Element,
      start,
      end,
      scrub,
      toggleActions: 'play none none reverse',
    },
  });
};

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2,
  startValue: number = 0
) => {
  const obj = { value: startValue };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
};

// Magnetic effect
export const createMagneticEffect = (
  element: HTMLElement,
  strength: number = 0.5
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export default {
  animationPresets,
  createStaggerAnimation,
  createTimeline,
  createParallax,
  createHoverEffect,
  createContinuousAnimation,
  createFloatingAnimation,
  createRotateAnimation,
  createPulseAnimation,
  createTypewriterEffect,
  createScrollReveal,
  animateCounter,
  createMagneticEffect,
};
