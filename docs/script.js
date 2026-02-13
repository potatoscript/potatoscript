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
        maintainAspectRatio: false, // allow height to adjust
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
  const toggleInput = document.getElementById("langToggle"); // checkbox

  // Default language: English if nothing saved
  let currentLang = localStorage.getItem("lang") || "en";

  function applyLanguage(lang) {
    // Update page text
    elements.forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang]?.[key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Sync checkbox state: checked = JP, unchecked = EN
    if (toggleInput) {
      toggleInput.checked = lang === "jp";
    }

    // Save selected language
    localStorage.setItem("lang", lang);
  }

  // Initialize page
  applyLanguage(currentLang);

  // Toggle event
  if (toggleInput) {
    toggleInput.addEventListener("change", () => {
      currentLang = toggleInput.checked ? "jp" : "en"; // checkbox = JP
      applyLanguage(currentLang);
    });
  }

  // Toggle Language of clickable summary
  const details = document.querySelector("details");
  const summary = details.querySelector("summary");

  /* Toggle text */
  document.querySelectorAll(".smooth-details").forEach(details => {
  const summary = details.querySelector("summary");
  const content = details.querySelector(".content");

  summary.addEventListener("click", e => {
    e.preventDefault(); // STOP default toggle

    if (!details.open) {
      // OPEN
      details.open = true;

      content.style.maxHeight = "0px";

      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });

      summary.dataset.i18n = "showLess";
    } else {
      // CLOSE
      content.style.maxHeight = content.scrollHeight + "px";

      requestAnimationFrame(() => {
        content.style.maxHeight = "0px";
      });

      setTimeout(() => {
        details.open = false;
      }, 400);

      summary.dataset.i18n = "readMore";
    }

    applyLanguage(currentLang);
  });
});




  // auto play video
  const cadVideo = document.getElementById("cadVideo");
  if (cadVideo) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cadVideo.style.opacity = 1;
          cadVideo.play().catch(()=>{});
        } else {
          cadVideo.style.opacity = 0.5;
          cadVideo.pause();
        }
      });
    }, {
      threshold: 0.5 // play when 50% visible
    });

    observer.observe(cadVideo);

    cadVideo.addEventListener("error", () => {
      console.log("Video failed to load, Please reload page");
    });
  }

    // auto play video
  const rubberflowVideo = document.getElementById("rubberflowVideo");
  if (rubberflowVideo) {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          rubberflowVideo.style.opacity = 1;
          rubberflowVideo.play().catch(()=>{});
        } else {
          rubberflowVideo.style.opacity = 0.5;
          rubberflowVideo.pause();
        }
      });
    }, {
      threshold: 0.5 // play when 50% visible
    });

    observer.observe(rubberflowVideo);
    rubberflowVideo.addEventListener("error", () => {
      console.log("Video failed to load, Please reload page");
    });
  }




});
