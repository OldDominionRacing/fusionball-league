/* Fusionball League — shared behaviour */
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav ul');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Mark the current page in the nav
  var here = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav li a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.indexOf('#') === 0) return;
    var target = new URL(href, location.href).pathname.replace(/index\.html$/, '');
    if (target === here) a.setAttribute('aria-current', 'page');
  });

  // Render a markdown document from /docs into an element with data-doc="path"
  var docEl = document.querySelector('[data-doc]');
  if (!docEl) return;
  var src = docEl.getAttribute('data-doc');

  function tagStatus(html) {
    // Turn the rulebook's FIXED / PROPOSED / OPEN markers into visible tags.
    return html
      .replace(/<strong><em>(FIXED|PROPOSED|OPEN)<\/em><\/strong>/g, '<span class="tag tag-$1">$1</span>')
      .replace(/<em><strong>(FIXED|PROPOSED|OPEN)<\/strong><\/em>/g, '<span class="tag tag-$1">$1</span>')
      .replace(/<strong>(FIXED|PROPOSED|OPEN)<\/strong>/g, '<span class="tag tag-$1">$1</span>')
      .replace(/— (FIXED|PROPOSED|OPEN)(?=[\s.<,;])/g, '— <span class="tag tag-$1">$1</span>')
      .replace(/class="tag tag-(FIXED|PROPOSED|OPEN)"/g, function (m, s) { return 'class="tag tag-' + s.toLowerCase() + '"'; });
  }

  function render(md) {
    var html = window.marked ? window.marked.parse(md) : '<pre>' + md.replace(/</g, '&lt;') + '</pre>';
    docEl.innerHTML = tagStatus(html);
  }

  function load() {
    fetch(src, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(render)
      .catch(function () {
        docEl.innerHTML = '<p class="doc-note">Could not load the document. <a href="' + src + '">Open the source file</a>.</p>';
      });
  }

  if (window.marked) { load(); }
  else {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js';
    s.onload = load;
    s.onerror = load;
    document.head.appendChild(s);
  }
})();
