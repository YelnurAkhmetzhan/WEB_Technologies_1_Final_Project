(() => {
  "use strict";
  const loading = document.getElementById("country-loading");
  const card = document.getElementById("country-card");
  const data = document.getElementById("country-data");
  const flag = document.getElementById("country-flag");
  const error = document.getElementById("country-error");
  if (!loading || !card) return;
  fetch("https://restcountries.com/v3.1/name/kazakhstan?fields=name,capital,population,flags")
    .then((response) => { if (!response.ok) throw new Error("Request failed"); return response.json(); })
    .then(([country]) => {
      flag.src = country.flags.svg; flag.alt = "Flag of Kazakhstan";
      data.textContent = `${country.name.common} · Capital: ${country.capital[0]} · Population: ${country.population.toLocaleString()}`;
      loading.hidden = true; card.hidden = false;
    })
    .catch(() => { loading.hidden = true; error.textContent = "Country data is temporarily unavailable. Please try again later."; });
})();
