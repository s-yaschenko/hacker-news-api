import { useEffect, useRef, useState } from "react";

export const useIsTopBlock = <T extends HTMLElement>() => {
  const [isTop, setIsTop] = useState(true);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      if (window.scrollY < ref.current.offsetTop) {
        setIsTop(() => true);
      } else {
        setIsTop(() => false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return [ref, isTop] as const;
}
