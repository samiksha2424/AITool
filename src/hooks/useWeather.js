import { useState, useEffect } from "react";

export function useWeather(city, unit) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${city.lat}&longitude=${city.lon}` +
      `&current_weather=true` +
      `&hourly=relativehumidity_2m,apparent_temperature,windspeed_10m` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
      `&timezone=auto` +
      `&temperature_unit=${unit}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;

        const cw = json.current_weather;
        const hourly = json.hourly;
        const daily = json.daily;

        // Find the hourly index matching current hour
        const nowIso = cw.time; // e.g. "2025-01-01T14:00"
        const hourlyIdx = hourly.time.findIndex((t) => t === nowIso);
        const idx = hourlyIdx >= 0 ? hourlyIdx : 0;

        setData({
          current: {
            temp: cw.temperature,
            feelsLike: hourly.apparent_temperature[idx],
            humidity: hourly.relativehumidity_2m[idx],
            windspeed: cw.windspeed,
            weathercode: cw.weathercode,
          },
          forecast: daily.time.map((date, i) => ({
            date,
            max: daily.temperature_2m_max[i],
            min: daily.temperature_2m_min[i],
            code: daily.weathercode[i],
          })),
        });
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [city, unit]);

  return { data, loading, error };
}
