import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (
  animation: (context: gsap.Context) => void,
  dependencies: any[] = []
) => {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(animation, scope);
    return () => ctx.revert();
  }, dependencies);

  return scope;
};

export const useScrollTriggerAnimation = (
  target: RefObject<HTMLElement>,
  options: gsap.TweenVars = {}
) => {
  useEffect(() => {
    if (!target.current) return;

    const { scrollTrigger, ...tweenOptions } = options as any;

    const tween = gsap.fromTo(
      target.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        ...tweenOptions,
        scrollTrigger: {
          trigger: target.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          ...(scrollTrigger || {}),
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [target, options]);
};

export const useParallax = (
  target: RefObject<HTMLElement>,
  speed: number = 0.5
) => {
  useEffect(() => {
    if (!target.current) return;

    const tween = gsap.to(target.current, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: target.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [target, speed]);
};

export const useHoverAnimation = (
  target: RefObject<HTMLElement>,
  hoverVars: gsap.TweenVars = { scale: 1.05, duration: 0.3 },
  restVars: gsap.TweenVars = { scale: 1, duration: 0.3 }
) => {
  useEffect(() => {
    const element = target.current;
    if (!element) return;

    const onEnter = () => gsap.to(element, hoverVars);
    const onLeave = () => gsap.to(element, restVars);

    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);

    return () => {
      element.removeEventListener('mouseenter', onEnter);
      element.removeEventListener('mouseleave', onLeave);
    };
  }, [target, hoverVars, restVars]);
};
