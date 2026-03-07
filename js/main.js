/* ══════════════════════════════════════
   N.S. Rathor Consulting — Main JS
══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Scroll Reveal ── */
  function triggerReveal() {
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08 });

    reveals.forEach(function (el) {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  }

  window.addEventListener('load', triggerReveal);
  window.addEventListener('scroll', triggerReveal);

  /* ── Mobile Menu ── */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  /* ── Sticky Nav Shadow ── */
  var mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', function () {
      mainNav.style.boxShadow =
        window.scrollY > 40 ? '0 4px 28px rgba(0,0,0,0.45)' : 'none';
    });
  }

  /* ── Active Nav Highlight ── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var pageMap = {
    'index.html': 'home',
    'about.html': 'about',
    'services.html': 'services',
    'projects.html': 'projects',
    'founder.html': 'founder',
    'contact.html': 'contact'
  };
  var activePage = pageMap[currentPage] || 'home';

  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    if (a.dataset.page === activePage) {
      a.classList.add('active-nav');
    }
  });

  /* ── Services Sidebar Scroll ── */
  window.scrollToSrv = function (id) {
    document.querySelectorAll('.srv-sidebar-nav a').forEach(function (a) {
      a.classList.remove('active');
    });
    var sNav = document.getElementById('sNav-' + id);
    if (sNav) sNav.classList.add('active');

    var el = document.getElementById('srv-' + id);
    if (el) {
      var offset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  /* ── Photo Slider ── */
  var slider = document.getElementById('photoSlider');
  if (slider) {
    var track = slider.querySelector('.slider-track');
    var slides = slider.querySelectorAll('.slider-slide');
    var dots = slider.querySelectorAll('.slider-dot');
    var counterCurrent = slider.querySelector('.slider-counter .current');
    var total = slides.length;
    var idx = 0;
    var autoInterval = null;

    function goTo(n) {
      idx = (n + total) % total;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
      });
      if (counterCurrent) counterCurrent.textContent = (idx + 1);
    }

    slider.querySelector('.slider-arrow.prev').addEventListener('click', function () {
      goTo(idx - 1);
      resetAuto();
    });
    slider.querySelector('.slider-arrow.next').addEventListener('click', function () {
      goTo(idx + 1);
      resetAuto();
    });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        resetAuto();
      });
    });

    function startAuto() {
      autoInterval = setInterval(function () { goTo(idx + 1); }, 5000);
    }
    function resetAuto() {
      clearInterval(autoInterval);
      startAuto();
    }

    var touchStartX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? idx + 1 : idx - 1);
        resetAuto();
      }
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* ── Contact Form Submit ── */
  window.handleSubmit = function () {
    alert(
      'Thank you for your enquiry! N.S. Rathor will personally review and respond within 24 hours.\n\nFor urgent matters, call or WhatsApp: +91-9826702652'
    );
  };
})();
