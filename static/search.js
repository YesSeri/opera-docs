const input = document.querySelector("#catalogue-search");
const help = document.querySelector("#search-help");
const results = document.querySelector("#search-results");

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const renderResults = (items) => {
  results.textContent = "";

  if (items.length === 0) {
    help.textContent = "No results found.";
    return;
  }

  help.textContent = "These are the results:";

  for (const item of items.slice(0, 19)) {
    const link = document.createElement("a");
    link.className = "result-pane search-result";
    link.href = item.url;
    link.textContent = item.title;
    results.appendChild(link);
  }
};

const initSearch = async () => {
  if (!input || !results) return;

  const response = await fetch("/search-index.json");
  const index = await response.json();
  const searchable = index.map((item) => ({
    ...item,
    normalizedTitle: normalize(item.title),
  }));

  input.focus();
  input.addEventListener("input", () => {
    const query = normalize(input.value);
    results.textContent = "";

    if (query.length < 2) {
      help.textContent = "Enter the name of an opera, composer or piece.";
      return;
    }

    const matches = searchable
      .map((item) => {
        const position = item.normalizedTitle.indexOf(query);
        if (position === -1) return null;
        return { ...item, score: position + Math.abs(item.normalizedTitle.length - query.length) / 100 };
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score || a.title.localeCompare(b.title));

    renderResults(matches);
  });
};

initSearch();
