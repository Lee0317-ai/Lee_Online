import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Zap, Target } from 'lucide-react';

const AILearning = () => {
  // 使用 Intersection Observer 触发动画
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="ai-learning" ref={sectionRef} className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* 标题 */}
        <div className="flex items-center gap-4 mb-16 reveal-on-scroll">
          <span className="mono text-primary text-sm">// AI LEARNING</span>
          <h2 className="text-3xl font-bold uppercase text-foreground">AI 学习</h2>
          <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
        </div>

        {/* 主内容区 */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* 左侧：介绍 */}
          <div className="reveal-on-scroll">
            <h3 className="text-4xl font-bold text-foreground mb-6">
              加入 <span className="text-primary">Way To AGI</span> 社区
            </h3>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
              我在 Way To AGI 训练营中学习 AI 技术，从零基础到实战应用。
              现在训练营已经开展到第四期，如果你也对 AI 感兴趣，
              欢迎加入我们的社区一起学习成长。
            </p>

            {/* 特性卡片 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-neutral-50 dark:bg-transparent">
                <div className="w-12 h-12 border-2 border-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    活跃的学习社区
                  </h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    与志同道合的伙伴一起学习，分享经验，共同进步
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-neutral-50 dark:bg-transparent">
                <div className="w-12 h-12 border-2 border-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    实战项目驱动
                  </h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    通过实际项目学习，快速掌握 AI 应用开发技能
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-neutral-50 dark:bg-transparent">
                <div className="w-12 h-12 border-2 border-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    系统化课程
                  </h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    从基础到进阶，完整的学习路径，循序渐进
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：行动卡片 */}
          <div className="space-y-6 reveal-on-scroll">
            {/* 社区卡片 */}
            <div className="border-2 border-neutral-200 dark:border-neutral-800 p-8 hover:border-primary transition-all bg-neutral-50 dark:bg-neutral-900/30">
              <h4 className="text-2xl font-bold text-foreground mb-4">Way To AGI 社区</h4>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                加入飞书社区，获取最新资讯和学习资源
              </p>
              <a
                href="https://waytoagi.feishu.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-primary bg-primary text-primary-foreground px-6 py-3 font-bold uppercase hover:bg-transparent hover:text-primary transition-all w-full justify-center"
              >
                进入社区
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* 训练营卡片 */}
            <div className="border-2 border-brutal-purple p-8 hover:border-brutal-purple transition-all bg-brutal-purple/5 dark:bg-brutal-purple/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="mono text-xs px-2 py-1 border border-brutal-purple text-brutal-purple">
                  HOT
                </span>
                <h4 className="text-2xl font-bold text-foreground">WayToAGI 训练营</h4>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                名额有限，立即报名锁定席位
              </p>
              <a
                href="https://pcn6dg6krayk.feishu.cn/app/Gh1QbQ8bOaD1MJsBsBOcBfR1nZd?chunked=false&pageId=pgeeyqdJjSlIe9iM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-brutal-purple bg-brutal-purple text-white px-6 py-3 font-bold uppercase hover:bg-transparent hover:text-brutal-purple transition-all w-full justify-center"
              >
                进入社区
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILearning;
