(() => {
  "use strict";
  const loading = document.getElementById("country-loading");
  const card = document.getElementById("country-card");
  const data = document.getElementById("country-data");
  const error = document.getElementById("country-error");
  if (!loading || !card) return;
  fetch("https://api.open-meteo.com/v1/forecast?latitude=51.1694&longitude=71.4491&current_weather=true")
    .then((response) => { if (!response.ok) throw new Error("Request failed"); return response.json(); })
    .then((weather) => {
      const current = weather.current_weather;
      if (!current) throw new Error("Weather data missing");
      data.textContent = `Astana · Temperature: ${current.temperature}°C · Wind: ${current.windspeed} km/h`;
      loading.hidden = true; card.hidden = false;
    })
    .catch(() => {
      loading.hidden = true;
      card.hidden = false;
      data.textContent = "Astana · Live weather is temporarily unavailable. Please try again later.";
      error.textContent = "The API could not be reached, so a safe fallback message is shown.";
    });
})();
