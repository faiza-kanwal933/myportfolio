document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // ---- Theme handling ----
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll('[data-theme-btn]');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('fk-theme', theme);
    themeBtns.forEach(b => b.setAttribute('data-active', b.dataset.themeBtn === theme));
  }

  themeBtns.forEach(btn => btn.addEventListener('click', () => setTheme(btn.dataset.themeBtn)));
  setTheme(localStorage.getItem('fk-theme') || 'light');

  // ---- Sticky nav background on scroll ----
  const nav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });

  // ---- Mobile menu ----
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open);
    });

    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // ---- Contact form handling ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const subject = encodeURIComponent('Tutoring Inquiry from ' + name);
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      
      window.location.href = `mailto:faizakanwal945@gmail.com?subject=${subject}&body=${body}`;
      
      const formNote = document.getElementById('form-note');
      if (formNote) {
        formNote.textContent = 'Opening your email app...';
      }
    });
  }

  // ---- Dynamic Year ----
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
