// GHANEM HASSAN — main.js

// === NAV SCROLL BEHAVIOR ===
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// === SCROLL FADE IN ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.work-card, .work-detail, .exhibition-row, .evolution-chapter, .about-fact, .statement__inner, .about-strip__text, .about-strip__accent').forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${i * 0.07}s`;
  observer.observe(el);
});

// === CONTACT FORM — pre-fill subject from URL ===
const urlParams = new URLSearchParams(window.location.search);
const subjectParam = urlParams.get('type') || urlParams.get('work');
const subjectSelect = document.getElementById('subject');
if (subjectParam && subjectSelect) {
  const map = {
    commission: 'commission',
    gallery: 'gallery',
    press: 'press',
  };
  const val = map[subjectParam] || 'collector';
  subjectSelect.value = val;
}

// === EMAIL CAPTURE (no backend — just UX) ===
const captureBtn = document.querySelector('.email-capture__btn');
const captureInput = document.querySelector('.email-capture__input');
if (captureBtn && captureInput) {
  captureBtn.addEventListener('click', () => {
    const email = captureInput.value.trim();
    if (!email || !email.includes('@')) {
      captureInput.focus();
      return;
    }
    captureBtn.textContent = 'Noted.';
    captureBtn.style.background = '#2a2927';
    captureBtn.style.color = '#c8a96e';
    captureInput.value = '';
    captureInput.placeholder = 'You\'ll hear from Ghanem.';
    captureInput.disabled = true;
    captureBtn.disabled = true;
  });
}

// === WORKS FILTER ===
const filterBtns = document.querySelectorAll('.filter-btn');
const wcCards = document.querySelectorAll('.wc-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    wcCards.forEach(card => {
      if (f === 'all' || card.dataset.status === f) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
