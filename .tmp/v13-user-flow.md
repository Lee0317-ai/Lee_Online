# v1.3 核心用户操作流

```mermaid
flowchart TD
    A[访客进入首页] --> B[浏览首屏]
    B --> C{向下滚动}

    C --> D[触发滚动渐入动画]
    D --> E[区块内容渐入显示]

    E --> F{浏览 AI 学习板块}
    F --> F1[了解社区价值]
    F --> F2[查看训练营信息]
    F --> F3[扫描二维码]

    F1 --> G1[点击进入社区]
    F2 --> G2[点击立即报名]
    F3 --> G3[添加微信交流]

    G1 --> H1[跳转飞书社区]
    G2 --> H2[跳转训练营]
    G3 --> H3[保存二维码/微信号]

    H1 --> I[继续浏览其他内容]
    H2 --> I
    H3 --> I

    I --> J[滚动到底部 Footer]
    J --> K[查看联系方式]
    K --> K1[扫描微信二维码]
    K --> K2[复制微信号]

    style D fill:#e3f2fd
    style E fill:#bbdefb
    style F fill:#fff3e0
    style K1 fill:#f3e5f5
    style K2 fill:#f3e5f5
```

## 流程说明

### 主流程（Happy Path）
1. **滚动动画触发**: 访客向下滚动页面，各区块内容渐入显示
2. **AI 学习板块交互**:
   - 了解社区价值 → 点击进入社区
   - 查看训练营 → 点击立即报名
   - 扫描二维码 → 添加微信
3. **联系方式交互**: 底部扫描二维码或复制微信号

### 关键分支
- 用户可以选择进入社区、报名训练营或直接加微信
- 联系方式从公众号改为微信，降低交流门槛

### 技术要点
- 滚动动画：Intersection Observer + CSS transition
- 二维码显示：/public/wechat-qrcode.png
- 链接：Way To AGI 飞书社区
