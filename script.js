// ============================================================
// NAV: scroll shadow + mobile toggle
// ============================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navMobile.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// SKILLS LEDGER BARS -- animate width from data-level
// ============================================================
const ledgerRows = document.querySelectorAll('.ledger-row[data-level]');

ledgerRows.forEach(row => {
  const level = row.getAttribute('data-level');
  row.style.setProperty('--fill', level + '%');
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

ledgerRows.forEach(row => barObserver.observe(row));

// ============================================================
// CUSTOM CURSOR DOT (desktop / fine pointer only)
// ============================================================
const cursorDot = document.querySelector('.cursor-dot');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (supportsHover && cursorDot) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  const growTargets = document.querySelectorAll('a, button, .achieve-card, .project-card, .strength-pill');
  growTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.width = '26px';
      cursorDot.style.height = '26px';
      cursorDot.style.background = 'transparent';
      cursorDot.style.border = '1px solid var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
      cursorDot.style.background = 'var(--accent)';
      cursorDot.style.border = 'none';
    });
  });
}

// ============================================================
// HERO EYEBROW DATE -- live "ledger date" stamp
// ============================================================
const heroDate = document.getElementById('heroDate');
if (heroDate) {
  const now = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  heroDate.textContent = `Salem, Tamil Nadu · ${now.toLocaleDateString('en-US', options)}`;
}

// ============================================================
// SMOOTH ANCHOR SCROLL (offset for fixed nav)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
