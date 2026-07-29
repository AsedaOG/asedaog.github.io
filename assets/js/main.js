(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navList = document.getElementById("navList");
  var navLinks = document.querySelectorAll(".nav-link");
  var backToTop = document.getElementById("backToTop");
  var yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state + back-to-top visibility
  function onScroll() {
    var scrolled = window.scrollY > 24;
    header.classList.toggle("is-scrolled", scrolled);
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  function closeNav() {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.classList.remove("nav-open");
  }
  function openNav() {
    navList.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.classList.add("nav-open");
  }
  navToggle.addEventListener("click", function () {
    var isOpen = navList.classList.contains("is-open");
    isOpen ? closeNav() : openNav();
  });
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  // Scroll-spy active nav link
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  var spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(function (section) { spy.observe(section); });

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(function (el) { revealObserver.observe(el); });
})();
