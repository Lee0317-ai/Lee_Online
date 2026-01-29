const AboutLee = () => {
  const timelineData = [
    {
      year: "2025 · 初",
      lines: [
        "那个夜晚，我第一次和 AI 对话",
        "屏幕上的字，像一道光",
        "我意识到，世界已经不一样了"
      ]
    },
    {
      year: "2025 · 6月",
      lines: [
        "沉浸其中，无法自拔",
        "深深震撼，深深焦虑",
        "AI 奔跑的速度太快",
        "我怕被时代抛下，怕自己变得多余"
      ]
    },
    {
      year: "现在",
      lines: [
        "迷雾散去，答案浮现",
        "AI 不会取代我们",
        "它会让真正会用它的人，变得无可替代",
        "我是 Lee，一个程序员",
        "用代码 + AI，在这个时代写下自己的序章"
      ],
      highlight: true // 最后一个节点有特殊样式
    }
  ];

  return (
    <section className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
      <div className="max-w-3xl mx-auto px-4">
        {/* 标题 */}
        <div className="flex items-center gap-4 mb-12">
          <span className="mono text-primary text-sm">// ABOUT LEE</span>
          <h2 className="text-3xl font-bold uppercase text-foreground">关于我</h2>
          <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
        </div>

        {/* 时间线 */}
        <div className="relative">
          {/* 时间线连接线 */}
          <div className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary to-neutral-300 dark:to-neutral-700"></div>

          {timelineData.map((item, index) => (
            <div key={index} className="relative pl-12 pb-12 last:pb-0">
              {/* 时间节点圆点 */}
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary"></div>

              {/* 年份标签 */}
              <span className="mono text-xs text-primary font-bold uppercase tracking-wider">
                {item.year}
              </span>

              {/* 内容区 */}
              <div className="mt-4 space-y-3">
                {item.lines.map((line, lineIndex) => {
                  // 第一行用大字，特殊处理的行用 medium
                  const isFirstLine = lineIndex === 0;
                  const isMedium = line.includes("深深震撼") || line.includes("无可替代") || line.includes("程序员");

                  return (
                    <p
                      key={lineIndex}
                      className={`leading-relaxed ${
                        isFirstLine ? 'text-lg' : ''
                      } ${
                        isMedium ? 'font-medium text-foreground' : 'text-neutral-500 dark:text-neutral-400'
                      }`}
                    >
                      {line}
                    </p>
                  );
                })}

                {/* 最后一个节点底部边框 */}
                {item.highlight && (
                  <div className="pt-6 border-t-2 border-neutral-200 dark:border-neutral-800 mt-6">
                    <p className="text-lg font-bold text-foreground">我是 Lee，一个程序员</p>
                    <p className="text-primary mono text-sm mt-2">用代码 + AI，在这个时代写下自己的序章</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLee;
