import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let requestAnimationFrameId: number | null = null;

    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;

      const progressPercentage = scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

      setProgress(Math.min(progressPercentage, 100));
    };

    const handleScroll = () => {
      if (requestAnimationFrameId !== null) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
      requestAnimationFrameId = requestAnimationFrame(updateProgress);
    };

    // 初始计算
    updateProgress();

    // 监听滚动
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestAnimationFrameId !== null) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[60] transition-none"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="页面阅读进度"
    />
  );
};

export default ProgressBar;
