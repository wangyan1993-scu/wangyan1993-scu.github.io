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
