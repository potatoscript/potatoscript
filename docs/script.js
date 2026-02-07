document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     INTRO FADE OUT
  ========================= */
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (!intro) return;

    intro.style.transition = "opacity 2s";
    intro.style.opacity = "0";

    setTimeout(() => intro.remove(), 2000);
  }, 3000);

  /* =========================
     ROTATING EMOJI FAVICON
  ========================= */
  const favicon = document.getElementById("favicon");
  if (favicon) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 64;
    canvas.height = 64;

    let angle = 0;

    function draw() {
      ctx.clearRect(0, 0, 64, 64);
      ctx.save();
      ctx.translate(32, 32);
      ctx.rotate(angle);

      ctx.font = "40px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🥔", 0, 0);

      ctx.restore();

      favicon.href = canvas.toDataURL();
      angle += 0.03;

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* =========================
     PIE CHART
  ========================= */
  const chartEl = document.getElementById('expChart');

  if (chartEl && window.Chart && typeof ChartDataLabels !== 'undefined') {
    new Chart(chartEl, {
      type: 'pie',
      data: {
        labels: ['Eng', 'Auto', 'Soft'],
        datasets: [{
          data: [30, 10, 60],
          backgroundColor: ['#2c678e', '#5298b3', '#72a579']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, boxHeight: 12 }
          },
          datalabels: {
            color: '#fff',
            font: { weight: 'bold', size: 14 },
            formatter: (v) => v + "%"
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  /* =========================
     SCROLL REVEAL (OPTIMIZED)
  ========================= */
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

  /* =========================
     LANGUAGE TOGGLE
  ========================= */
  const elements = document.querySelectorAll("[data-i18n]");
  const toggleBtn = document.getElementById("langToggle");

  // Default language
  let currentLang = localStorage.getItem("lang") || (navigator.language.startsWith("ja") ? "jp" : "en");

  // Apply translations to page
  function applyLanguage(lang) {
    // Update all data-i18n elements
    elements.forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang]?.[key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update toggle button text to show the OTHER language
    if (toggleBtn) {
      toggleBtn.innerHTML = lang === "en" ? translations["jp"].langBtn : translations["en"].langBtn;
    }

    // Save selected language
    localStorage.setItem("lang", lang);
  }

  // Button click: toggle language
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "jp" : "en";
      applyLanguage(currentLang);
    });
  }

  // Initialize page with current language
  applyLanguage(currentLang);

});
