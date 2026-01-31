import { useState, useEffect } from 'react';

interface Section {
  id: string;
  name: string;
}

const sections: Section[] = [
  { id: 'ai-learning', name: 'AI 学习' },
  { id: 'work', name: '产品区' },
  { id: 'tools', name: '小工具区' },
  { id: 'resources', name: '资源库' },
  { id: 'recommended', name: '推荐工具' },
  { id: 'ai-news', name: 'AI 资讯' },
];

const FixedNav = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // 检测用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // 如果用户偏好减少动画，不启用固定导航
    }

    // Intersection Observer 检测当前可视区块
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px', // 当区块在视口中间时触发
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // 观察所有区块
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
      aria-label="页面导航"
    >
      {sections.map((section) => (
        <div key={section.id} className="relative group">
          {/* 导航圆点 */}
          <button
            onClick={() => handleClick(section.id)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-primary border-primary scale-125'
                : 'bg-transparent border-neutral-400 hover:border-primary'
            }`}
            aria-label={`跳转到${section.name}`}
            aria-current={activeSection === section.id ? 'true' : undefined}
          />

          {/* Tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 mono text-xs bg-neutral-900 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -translate-x-2 group-hover:translate-x-0 duration-200">
            {section.name}
          </span>
        </div>
      ))}
    </nav>
  );
};

export default FixedNav;
