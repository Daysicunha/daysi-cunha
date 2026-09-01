(function () {
  const target = document.querySelector("[data-good-campaign-current]");
  if (!target) return;

  fetch("assets/data/good-campaign.json", { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) throw new Error("Não foi possível carregar a campanha atual.");
      return response.json();
    })
    .then((campaign) => {
      const title = target.querySelector("[data-good-institution]");
      const message = target.querySelector("[data-good-message]");
      const period = target.querySelector("[data-good-period]");
      const link = target.querySelector("[data-good-link]");

      if (title) title.textContent = campaign.institution || "Campanha em seleção";
      if (message) message.textContent = campaign.pageMessage || campaign.message || "";
      if (period) period.textContent = campaign.period || "";

      if (!link) return;

      if (campaign.status === "selection") {
        link.hidden = true;
        return;
      }

      link.hidden = false;
      link.textContent = campaign.linkLabel || "Conhecer e contribuir";
      link.href = campaign.url;

      if (campaign.external) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    })
    .catch(() => {
      const title = target.querySelector("[data-good-institution]");
      const message = target.querySelector("[data-good-message]");
      const link = target.querySelector("[data-good-link]");
      if (title) title.textContent = "Campanha em seleção";
      if (message) message.textContent = "A instituição apoiada será anunciada em breve.";
      if (link) link.hidden = true;
    });
})();
