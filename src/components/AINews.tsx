import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  date: string; // YYYY-MM-DD
}

// v1.2: 手动配置的新闻列表
const newsData: NewsItem[] = [
  {
    id: '1',
    title: '过来人给独立开发者的建议（9）- 打造产品矩阵',
    url: 'https://mp.weixin.qq.com/s/wdnwYjI1nu9Gvwj_CaX0pA',
    source: 'Jace煜橙',
    date: '2025-01-31',
  },
  {
    id: '2',
    title: '如何让 AI 更"听话"｜Rules 高效使用指南',
    url: 'https://mp.weixin.qq.com/s/60SzfUpnSe5MIKlPwV8FmA',
    source: 'TRAE',
    date: '2025-01-31',
  },
  {
    id: '3',
    title: '告别灵感枯竭！Clawdbot大龙虾装上公众号内容矩阵skill，一人公司原地起飞！',
    url: 'https://mp.weixin.qq.com/s/lHxHcr57hPzLPUHmcB9nFw',
    source: '小虎AI生活',
    date: '2025-01-31',
  },
  {
    id: '4',
    title: 'OpenAI 发布 GPT-5 预览版，推理能力大幅提升',
    url: 'https://www.jiqizhixin.com/articles/2025-01-28',
    source: '机器之心',
    date: '2025-01-28',
  },
  {
    id: '5',
    title: '阿里通义千问开源新模型，中文理解能力 SOTA',
    url: 'https://www.tmtpost.com',
    source: '钛媒体',
    date: '2025-01-28',
  },
  {
    id: '6',
    title: 'Anthropic 完成 35 亿美元融资，估值创新高',
    url: 'https://36kr.com',
    source: '36氪',
    date: '2025-01-28',
  },
];

// 按日期分组
const groupByDate = (news: NewsItem[]) => {
  const grouped: Record<string, NewsItem[]> = {};
  news.forEach(item => {
    if (!grouped[item.date]) {
      grouped[item.date] = [];
    }
    grouped[item.date].push(item);
  });
  // 按日期降序排序
  return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
};

// 格式化日期显示
const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${month}/${day}`;
};

// 获取月份
const getMonth = (dateStr: string) => {
  const [year, month] = dateStr.split('-');
  return `${year}年${parseInt(month)}月`;
};

const AINews = () => {
  const groupedNews = groupByDate(newsData);
  const [currentMonth, setCurrentMonth] = useState(() => {
    return groupedNews.length > 0 ? getMonth(groupedNews[0][0]) : '';
  });

  return (
    <section id="ai-news" className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <span className="mono text-primary text-sm">05</span>
          <h2 className="text-3xl font-bold uppercase text-foreground">AI资讯</h2>
          <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
        </div>

        {/* 月份标题 */}
        <div className="text-center mb-12">
          <span className="mono text-xs text-neutral-400 uppercase tracking-widest">
            {currentMonth}
          </span>
        </div>

        {/* 时间线+卡片 */}
        <div className="space-y-12">
          {groupedNews.map(([date, items]) => (
            <div key={date} className="relative">
              {/* 日期节点 */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700"></div>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="mono text-sm text-neutral-500">{formatDate(date)}</span>
                  <div className="h-px w-12 bg-neutral-300 dark:bg-neutral-700"></div>
                </div>
              </div>

              {/* 卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-neutral-200 dark:border-neutral-800 p-5 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="mono text-xs px-2 py-1 border border-neutral-300 dark:border-neutral-700 text-neutral-500 group-hover:border-primary group-hover:text-primary transition-colors">
                        {item.source}
                      </span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 查看更多 */}
        <div className="text-center mt-12">
          <button
            onClick={() => toast.info('更多资讯即将更新')}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-primary hover:text-primary transition-all mono text-sm"
          >
            查看更多 →
          </button>
        </div>

        {/* 提示信息 */}
        <p className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-8">
          资讯来源：机器之心、AI前线、量子位、36氪等
        </p>
      </div>
    </section>
  );
};

export default AINews;
