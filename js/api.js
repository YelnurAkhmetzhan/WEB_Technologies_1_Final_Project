(() => {
  "use strict";
  const loading = document.getElementById("country-loading");
  const card = document.getElementById("country-card");
  const data = document.getElementById("country-data");
  const error = document.getElementById("country-error");
  if (!loading || !card) return;
  fetch("https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current=temperature_2m,wind_speed_10m&timezone=auto")
    .then((response) => { if (!response.ok) throw new Error("Request failed"); return response.json(); })
    .then((weather) => {
      const current = weather.current;
      data.textContent = `Astana · Temperature: ${current.temperature_2m}°C · Wind: ${current.wind_speed_10m} km/h`;
      loading.hidden = true; card.hidden = false;
    })
    .catch(() => { loading.hidden = true; error.textContent = "Country data is temporarily unavailable. Please try again later."; });
})();
