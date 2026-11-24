(() => {
  'use strict';

  const storageKey = 'yan-wang-language';
  const chinese = {
    subtitle: '四川大学人工智能学院 研究员',
    profile: '基本资料',
    news: '论文动态',
    publications: '发表论文',
    recruitmentTitle: '博士招生：2027 年秋季入学',
    recruitmentBody: '现招收 2027 年秋季入学的四川大学博士研究生。欢迎有意申请的同学通过以下邮箱联系我：',
    sentenceEnd: '。',
    biography: '王炎，四川大学人工智能学院研究员，博士毕业于四川大学计算机学院，曾任新加坡科技研究局（A*STAR）研究员、高级研究员。',
    research: '主要从事医学图像分析、多模态学习、领域泛化、基础模型及多模态模型幻觉检测研究，应用场景包括皮肤病学、眼科学、乳腺影像、胸片分析等临床医学影像任务。',
    venues: '相关成果发表于 The Lancet Digital Health、Medical Image Analysis、IEEE Transactions on Medical Imaging、IEEE Transactions on Evolutionary Computation 等期刊。',
    affiliationLabel: '工作单位',
    affiliation: '四川大学人工智能学院',
    scholar: '谷歌学术',
    scholarLink: '[谷歌学术]',
    email: '电子邮箱',
    metricsLabel: '学术指标',
    metrics: '引用次数 803；h 指数 15；i10 指数 20（截至 2026 年 11 月 20 日）',
    corresponding: '* 表示通讯作者。',
    futureYear: 'Google Scholar 标注为 2027 年，具体发表时间尚待确认。',
    footer: '© 2026 王炎。最后更新：2026 年 11 月 24 日。',
    language: '语言',
    navigation: '主导航',
    newsList: '可滚动的论文动态列表',
    publicationsList: '可滚动的发表论文列表',
  };

  const newsSubjects = {
    maZDTaKrznsC: 'MerMED-FM 多模态、多疾病医学影像基础模型',
    e5wmG9Sq2KIC: 'DualFete 半监督医学图像分割方法',
    bEWYMUwI8FkC: 'UG-HDR 不确定性引导的高动态范围成像',
    RHpTSmoSYBkC: '面向领域泛化的自适应医学图像分割网络',
    r0BpntZqJG4C: 'EAUWSeg 弱监督医学图像分割方法',
    YFjsv_pBGBYC: '跨多族群近视与非近视人群的青光眼检测',
    NMxIlDl6LWMC: 'V2-Former 胎儿脑室增宽分割与预测方法',
    TFP_iSt0sucC: '基于控制系统视角的测试时适应方法',
    'ZeXyd9-uunAC': '用于多标签皮肤病变分类的自适应多模态融合',
    hC7cP41nSMkC: 'GapMatch 半监督医学图像分割方法',
    '-f6ydRqryjwC': '中心受累型糖尿病黄斑水肿的多模态人工智能检测',
    qUcmZB5y_30C: '用于弱监督学习的局部极值映射',
    mB3voiENLucC: '基于路径平坦性感知优化的单域泛化',
    hFOr9nPyWt4C: '肺部肿瘤侵袭性的深度学习预测',
    _kc_bZDykSQC: 'MedNAS 医学图像分析神经架构搜索方法',
    '4TOpqqG69KYC': '基于几何对应的眼科影像多模态学习',
    M3ejUd6NZC8C: '结合渐进评估与子种群保留的神经架构搜索',
    QIV2ME_5wuYC: '用于领域泛化的连续解耦联合空间学习',
    IWHjjKOFINEC: '大语言模型安全全球挑战赛 Track 1',
    mVmsd5A6BfQC: '类别感知的测试时训练领域适应',
    'Wp0gIr-vW9MC': '用于视网膜眼底诊断的代价敏感分布对齐',
  };

  // Keep the static English document as the fallback and source for switching back.
  const textNodes = [...document.querySelectorAll('[data-i18n]')].map(element => ({
    element,
    key: element.dataset.i18n,
    english: element.textContent,
  }));
  const ariaNodes = [...document.querySelectorAll('[data-i18n-aria]')].map(element => ({
    element,
    key: element.dataset.i18nAria,
    english: element.getAttribute('aria-label'),
  }));
  const news = [...document.querySelectorAll('.news-list li')].map(element => {
    const link = element.querySelector('a');
    const id = new URL(link.href).searchParams.get('citation_for_view').split(':')[1];
    return {
      element,
      english: [...element.childNodes].map(node => node.cloneNode(true)),
      link: link.cloneNode(true),
      time: element.querySelector('time').cloneNode(true),
      venue: element.querySelector('em')?.cloneNode(true),
      subject: newsSubjects[id],
    };
  });
  const description = document.querySelector('meta[name="description"]');
  const englishDescription = description.content;
  const buttons = [...document.querySelectorAll('[data-language]')];
  const emailLink = document.querySelector('.recruitment-email');

  function setLanguage(language) {
    const isChinese = language === 'zh';
    document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
    document.title = isChinese ? '王炎 / Yan Wang' : 'Yan Wang / 王炎';
    description.content = isChinese
      ? '王炎，四川大学人工智能学院研究员。研究方向包括医学图像分析、多模态学习、领域泛化、基础模型及可信医学人工智能。'
      : englishDescription;

    for (const { element, key, english } of textNodes) {
      element.textContent = isChinese ? (chinese[key] ?? english) : english;
      element.lang = isChinese ? 'zh-CN' : 'en';
    }
    for (const { element, key, english } of ariaNodes) {
      element.setAttribute('aria-label', isChinese ? (chinese[key] ?? english) : english);
    }
    for (const item of news) {
      if (!isChinese || !item.subject) {
        item.element.replaceChildren(...item.english.map(node => node.cloneNode(true)));
        continue;
      }
      const link = item.link.cloneNode(true);
      link.textContent = item.subject;
      const content = [item.time.cloneNode(true), ' 研究成果“', link, '”'];
      if (item.venue) {
        const venue = item.venue.cloneNode(true);
        venue.lang = 'en';
        content.push('发表于 ', venue, '。');
      } else {
        content.push('已作为 arXiv 预印本发布。');
      }
      item.element.replaceChildren(...content);
    }
    const subject = isChinese ? '2027 年秋季博士招生咨询' : 'Fall 2027 PhD Inquiry';
    emailLink.href = 'mailto:wangyan93@scu.edu.cn?subject=' + encodeURIComponent(subject);
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const language = button.dataset.language;
      setLanguage(language);
      try {
        localStorage.setItem(storageKey, language);
      } catch {
        // Language switching also works when browser storage is unavailable.
      }
    });
  }

  let initialLanguage = 'en';
  try {
    if (localStorage.getItem(storageKey) === 'zh') initialLanguage = 'zh';
  } catch {
    // Retain the English default when storage is blocked.
  }
  setLanguage(initialLanguage);
  document.querySelector('.language-switch').hidden = false;
})();
