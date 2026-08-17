(function () {
  const site = window.DaysiSite;
  const page = document.body.dataset.page || "";
  const root = document.body.dataset.root || "";
  const navItems = [
    ["index.html", "Início", "inicio"],
    ["solucoes.html", "Soluções", "solucoes"],
    ["cases.html", "Cases", "cases"],
    ["processo.html", "Processo", "processo"],
    ["blog.html", "Blog", "blog"],
    ["sobre.html", "Sobre", "sobre"],
    ["contato.html", "Contato", "contato"],
  ];

  const headerTarget = document.querySelector("[data-site-header]");
  if (headerTarget) {
    headerTarget.innerHTML = `
      <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="${root}index.html" aria-label="Daysi Cunha, página inicial"><span class="brand-daysi">DAYSI</span><span class="brand-cunha">CUNHA</span><span class="brand-point" aria-hidden="true">.</span></a>
          <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-menu"><span></span><span></span></button>
          <nav class="nav" id="main-menu" aria-label="Navegação principal">
            ${navItems.map(([href, label, key]) => `<a href="${root}${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
          </nav>
          <div class="header-social" aria-label="Redes sociais">
            <a href="${site.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
            <a href="${site.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
            <a href="${site.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg></a>
          </div>
          <a class="button button--primary nav-cta" href="${root}contato.html">Solicitar diagnóstico <span aria-hidden="true">↗</span></a>
        </div>
      </header>`;
    const toggle = headerTarget.querySelector(".menu-toggle");
    const nav = headerTarget.querySelector(".nav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      nav.classList.toggle("is-open", !open);
    });
  }

  const footerTarget = document.querySelector("[data-site-footer]");
  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer footer-editorial">
        <div class="container footer-center">
          <div class="footer-content">
            <strong class="brand"><span class="brand-daysi">DAYSI</span><span class="brand-cunha">CUNHA</span><span class="brand-point" aria-hidden="true">.</span></strong>
            <p>Presença digital estratégica com<br />clareza, intenção e proximidade.</p>
            <nav class="footer-links" aria-label="Navegação do rodapé"><a href="${root}index.html">Início</a><a href="${root}solucoes.html">Soluções</a><a href="${root}cases.html">Cases</a><a href="${root}processo.html">Processo</a><a href="${root}blog.html">Blog</a><a href="${root}sobre.html">Sobre</a><a href="${root}contato.html">Contato</a></nav>
            <div class="footer-social"><a href="${site.social.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a><a href="${site.social.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="${site.social.github}" target="_blank" rel="noopener noreferrer">GitHub</a></div>
          </div>
        </div>
        <div class="container footer-status footer-status--center"><span>Local: Brasil — <time id="clock" aria-label="Horário de São Paulo"></time></span></div>
        <div class="container footer-copyright"><span>© ${new Date().getFullYear()} Daysi Cunha. Todos os direitos reservados.</span><span>Designed &amp; Developed by Daysi Cunha</span></div>
      </footer>`;
    const clock = footerTarget.querySelector("#clock");
    const updateClock = () => {
      clock.textContent = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    };
    updateClock();
    window.setInterval(updateClock, 1000);
  }

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(link.dataset.whatsappMessage || site.whatsappMessage)}`;
  });

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".button--primary").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty(
          "--pointer-x",
          `${event.clientX - rect.left}px`,
        );
        button.style.setProperty(
          "--pointer-y",
          `${event.clientY - rect.top}px`,
        );
      });
    });
  }

  const hero = document.querySelector(".hero-editorial");
  const heroImage = hero?.querySelector(".hero-portrait img");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (hero && heroImage && !reduceMotion) {
    let animationFrame = 0;
    let heroIsVisible = true;

    const updateHeroImage = () => {
      animationFrame = 0;
      if (!heroIsVisible) return;

      const bounds = hero.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -bounds.top / Math.max(bounds.height, 1)),
      );
      heroImage.style.setProperty(
        "--hero-image-shift",
        `${(progress * 14).toFixed(2)}px`,
      );
      heroImage.style.setProperty(
        "--hero-image-scale",
        (1.025 + progress * 0.015).toFixed(4),
      );
    };

    const requestHeroUpdate = () => {
      if (!animationFrame)
        animationFrame = window.requestAnimationFrame(updateHeroImage);
    };

    if ("IntersectionObserver" in window) {
      const heroObserver = new IntersectionObserver(([entry]) => {
        heroIsVisible = entry.isIntersecting;
        if (heroIsVisible) requestHeroUpdate();
      });
      heroObserver.observe(hero);
    }

    updateHeroImage();
    window.addEventListener("scroll", requestHeroUpdate, { passive: true });
    window.addEventListener("resize", requestHeroUpdate);
  }

  const valueSection = document.querySelector(".value");
  if (
    valueSection &&
    !reduceMotion &&
    "IntersectionObserver" in window
  ) {
    valueSection.dataset.revealReady = "true";
    const valueObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        valueSection.classList.add("is-revealed");
        observer.unobserve(valueSection);
      },
      { threshold: 0.18 },
    );
    valueObserver.observe(valueSection);
  }

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const selectedService = new URLSearchParams(window.location.search).get(
      "servico",
    );
    const serviceField = contactForm.elements.service;
    if (selectedService && site.services[selectedService])
      serviceField.value = selectedService;
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const message = [
        "Olá, Daysi! Gostaria de solicitar um diagnóstico.",
        `Nome: ${data.get("name")}`,
        `Negócio: ${data.get("business")}`,
        `E-mail: ${data.get("email")}`,
        `WhatsApp: ${data.get("whatsapp") || "Não informado"}`,
        `Serviço: ${site.services[data.get("service")] || data.get("service")}`,
        `Objetivo: ${data.get("goal")}`,
        `Prazo: ${data.get("deadline") || "Não informado"}`,
      ].join("\n");
      window.location.assign(
        `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`,
      );
    });
  }

  const blogSearch = document.querySelector("[data-blog-search]");
  const categoryControls = document.querySelectorAll("[data-category]");
  const articleCards = document.querySelectorAll("[data-article-card]");
  const searchEmpty = document.querySelector("[data-search-empty]");
  let activeCategory = "todos";

  function filterArticles() {
    const query = blogSearch ? blogSearch.value.toLowerCase().trim() : "";
    let visible = 0;
    articleCards.forEach((card) => {
      const categoryMatches =
        activeCategory === "todos" || card.dataset.category === activeCategory;
      const queryMatches =
        !query || card.textContent.toLowerCase().includes(query);
      const show = categoryMatches && queryMatches;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (searchEmpty) searchEmpty.hidden = visible > 0;
  }

  if (blogSearch) blogSearch.addEventListener("input", filterArticles);
  categoryControls.forEach((control) => {
    control.addEventListener("click", () => {
      activeCategory = control.dataset.category;
      categoryControls.forEach((item) => {
        const selected = item === control;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      filterArticles();
    });
  });
})();
