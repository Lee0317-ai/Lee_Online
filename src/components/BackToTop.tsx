import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 检测用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // 如果用户偏好减少动画，不启用返回顶部按钮
    }

    const handleScroll = () => {
      // 滚动超过 400px 后显示按钮
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 添加滚动监听
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始检查
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed right-8 bottom-8 z-50 w-12 h-12 border-2 border-primary bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 ${
        isVisible
          ? 'opacity-100 pointer-events-auto translate-y-0'
          : 'opacity-0 pointer-events-none translate-y-4'
      }`}
      aria-label="返回顶部"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTop;
