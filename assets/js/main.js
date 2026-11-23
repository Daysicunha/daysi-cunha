(function () {
  const site = window.DaysiSite;
  const page = document.body.dataset.page || "";
  const root = document.body.dataset.root || "";
  const navItems = [["index.html#inicio","Início","inicio"],["sobre.html","Sobre mim","sobre"],["cases.html","Portfólio","cases"],["laboratorio.html","Laboratório","laboratorio"],["universo.html","Meu universo","universo"],["blog.html","Diário","blog"],["contato.html","Contato","contato"]];

  if (!document.querySelector("[data-good-band-style]")) {
    const goodBandStyle = document.createElement("link");
    goodBandStyle.rel = "stylesheet";
    goodBandStyle.href = `${root}assets/css/faca-o-bem.css`;
    goodBandStyle.dataset.goodBandStyle = "";
    document.head.appendChild(goodBandStyle);
  }

  const headerTarget = document.querySelector("[data-site-header]");
  if(headerTarget){
    headerTarget.innerHTML = `<a class="ct-skip" href="#conteudo">Pular para o conteúdo</a><header class="ct-header"><div class="ct-wrap ct-nav"><a class="ct-brand" href="${root}index.html#inicio" aria-label="Daysi Cunha, início"><span class="ct-brand-mark" aria-hidden="true">D</span><span>Daysi Cunha<i>.</i></span></a><button class="ct-btn ct-menu" type="button" aria-controls="ct-navigation" aria-expanded="false" aria-label="Abrir menu">Menu ☰</button><nav class="ct-navlinks" id="ct-navigation" aria-label="Navegação principal">${navItems.map(([href,label,key])=>`<a href="${root}${href}" ${page===key?'aria-current="page"':""}>${label}</a>`).join("")}</nav><a class="ct-btn" href="${root}contato.html">Vamos conversar ↗</a></div></header>`;
    const toggle=headerTarget.querySelector(".ct-menu"),nav=headerTarget.querySelector(".ct-navlinks");
    function setMenu(open){toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");nav.classList.toggle("is-open",open);}
    toggle.addEventListener("click",()=>setMenu(toggle.getAttribute("aria-expanded")!=="true"));
    nav.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false);});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&toggle.getAttribute("aria-expanded")==="true"){setMenu(false);toggle.focus();}});
  }

  const footerTarget = document.querySelector("[data-site-footer]");
  if (footerTarget) {
    footerTarget.innerHTML = `<footer class="ct-footer"><div class="ct-wrap"><div><a class="ct-brand" href="${root}index.html#inicio">Daysi Cunha<i>.</i></a><small>Designed &amp; Developed by me. · © ${new Date().getFullYear()}</small></div><nav class="ct-footer-links" aria-label="Redes e iniciativas"><a href="${site.social.instagram}">Instagram</a><a href="${site.social.linkedin}">LinkedIn</a><a href="${site.social.github}">GitHub</a><a href="${root}faca-o-bem.html">Faça o Bem</a><a href="${root}privacidade.html">Privacidade</a><a href="https://dayslume.daysicunha.com.br/">DAYSLUME</a></nav></div></footer>`;

    const renderGoodBand = (campaign) => {
      if (!campaign || !campaign.enabled) return;

      const campaignUrl = campaign.external
        ? campaign.url
        : `${root}${campaign.url}`;
      const externalAttributes = campaign.external
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";

      const band = document.createElement("aside");
      band.className = "good-band";
      band.setAttribute("aria-label", "Faça o Bem");
      band.innerHTML = `
        <div class="container good-band__inner">
          <a class="good-band__label" href="https://daysicunha.com.br/faca-o-bem.html" aria-label="Conhecer a iniciativa Faça o Bem">${campaign.label || "FAÇA O BEM"}</a>
          <span class="good-band__separator" aria-hidden="true">•</span>
          <span class="good-band__message">${campaign.message || "Conheça a iniciativa em destaque."}</span>
          ${campaign.period ? `<span class="good-band__separator good-band__separator--period" aria-hidden="true">•</span><span class="good-band__period">${campaign.period}</span>` : ""}
          <a class="good-band__link" href="${campaignUrl}"${externalAttributes}>${campaign.linkLabel || "Conhecer e contribuir"} <span aria-hidden="true">↗</span></a>
        </div>`;
      footerTarget.prepend(band);
    };

    fetch(`${root}assets/data/good-campaign.json`, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error("Campanha indisponível");
        return response.json();
      })
      .then(renderGoodBand)
      .catch(() => {});


  }

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(link.dataset.whatsappMessage || site.whatsappMessage)}`;
  });

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".button--primary").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        button.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      });
    });
  }

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const selectedService = new URLSearchParams(window.location.search).get("servico");
    const serviceField = contactForm.elements.service;
    if (selectedService && site.services[selectedService]) serviceField.value = selectedService;
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const message = [
        "Olá, Daysi! Gostaria de conversar.",
        `Nome: ${data.get("name")}`,
        `Empresa ou projeto: ${data.get("business") || "Não informado"}`,
        `E-mail: ${data.get("email")}`,
        `WhatsApp: ${data.get("whatsapp") || "Não informado"}`,
        `Assunto: ${site.services[data.get("service")] || data.get("service")}`,
        `Objetivo: ${data.get("goal")}`,
        `Prazo: ${data.get("deadline") || "Não informado"}`,
      ].join("\n");
      window.location.assign(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`);
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
      const categoryMatches = activeCategory === "todos" || card.dataset.category === activeCategory;
      const queryMatches = !query || card.textContent.toLowerCase().includes(query);
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
