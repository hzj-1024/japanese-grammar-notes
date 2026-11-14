(function () {
  const search = document.getElementById("search");
  const cards = Array.from(document.querySelectorAll("[data-grammar]"));
  const empty = document.getElementById("empty");
  const filters = Array.from(document.querySelectorAll(".filter"));
  let level = "all";

  function normalize(s) {
    return (s || "").toLowerCase().replace(/\s+/g, "");
  }

  function apply() {
    const q = normalize(search ? search.value : "");
    let shown = 0;
    cards.forEach((card) => {
      const hay = normalize(card.getAttribute("data-grammar") + " " + card.textContent);
      const lv = card.getAttribute("data-level") || "";
      const okLevel = level === "all" || lv === level;
      const okText = !q || hay.indexOf(q) !== -1;
      const show = okLevel && okText;
      card.hidden = !show;
      if (show) shown += 1;
    });
    if (empty) empty.classList.toggle("show", shown === 0);
  }

  if (search) search.addEventListener("input", apply);
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      level = btn.getAttribute("data-level") || "all";
      filters.forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
      apply();
    });
  });
})();
