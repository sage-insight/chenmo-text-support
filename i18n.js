(function () {
  function detectLang() {
    const langs = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (langs.includes('zh') || /Shanghai|Chongqing|Harbin|Urumqi|Hong_Kong|Taipei|Singapore/i.test(tz)) {
      return 'zh';
    }
    return 'en';
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = el.getAttribute('data-i18n-' + lang);
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const val = el.getAttribute('data-i18n-placeholder-' + lang);
      if (val != null) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-i18n-href]').forEach((el) => {
      const val = el.getAttribute('data-i18n-href-' + lang);
      if (val != null) el.setAttribute('href', val);
    });
    document.title = lang === 'zh'
      ? (document.body.getAttribute('data-title-zh') || document.title)
      : (document.body.getAttribute('data-title-en') || document.title);
    localStorage.setItem('sage_insight_lang', lang);
    const toggle = document.getElementById('langToggle');
    if (toggle) toggle.textContent = lang === 'zh' ? 'EN' : '中文';
  }

  window.toggleSiteLang = function () {
    const current = localStorage.getItem('sage_insight_lang') || detectLang();
    applyLang(current === 'zh' ? 'en' : 'zh');
  };

  document.addEventListener('DOMContentLoaded', function () {
    const lang = localStorage.getItem('sage_insight_lang') || detectLang();
    applyLang(lang);
  });
})();
