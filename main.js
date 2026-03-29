// Inject shared nav
(function () {
  var segments = location.pathname.split('/').filter(Boolean);
  var page = segments[segments.length - 1] || 'index.html';
  var links = [
    { href: '/index.html',    label: 'Home',     match: 'index.html'    },
    { href: '/posts.html',    label: 'Posts',    match: 'posts.html'    },
    { href: '/projects.html', label: 'Projects', match: 'projects.html' }
  ];
  var navLinks = links.map(function (l) {
    return '<a href="' + l.href + '"' + (page === l.match ? ' class="active"' : '') + '>' + l.label + '</a>';
  }).join('');

  document.getElementById('nav').innerHTML =
    '<div class="nav-inner">' +
      '<a class="nav-title" href="/index.html">Tales of the Fat Tails</a>' +
      '<div class="nav-right">' + navLinks +
        '<button id="theme-toggle" aria-label="Toggle theme">' +
          '<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
          '<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>';
}());

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Share links
(function () {
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);
  var map = {
    'share-twitter':  'https://twitter.com/intent/tweet?url=' + url + '&text=' + title,
    'share-linkedin': 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
    'share-reddit':   'https://reddit.com/submit?url=' + url + '&title=' + title,
    'share-facebook': 'https://www.facebook.com/sharer/sharer.php?u=' + url
  };
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = map[id];
  });

  // Copy link / native share button
  var copyBtn = document.getElementById('share-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var pageUrl = window.location.href;
      if (navigator.share) {
        navigator.share({ title: document.title, url: pageUrl });
      } else {
        navigator.clipboard.writeText(pageUrl).then(function () {
          copyBtn.title = 'Copied!';
          copyBtn.style.color = 'var(--accent)';
          copyBtn.style.borderColor = 'var(--accent)';
          setTimeout(function () {
            copyBtn.title = 'Copy link';
            copyBtn.style.color = '';
            copyBtn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  }
}());

// Mobile TOC toggle
var tocToggle = document.getElementById('toc-toggle');
var tocPanel = document.getElementById('toc-panel');
if (tocToggle && tocPanel) {
  tocToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    tocPanel.classList.toggle('open');
  });
  tocPanel.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { tocPanel.classList.remove('open'); });
  });
  document.addEventListener('click', function () { tocPanel.classList.remove('open'); });
}

// KaTeX auto-render
if (typeof renderMathInElement !== 'undefined') {
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$',  right: '$',  display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ]
  });
}
