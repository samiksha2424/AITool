import { wmoLabel } from "../../utils/weather";
import "./CurrentWeather.css";

function Skeleton() {
  return (
    <div className="current-card skeleton">
      <div className="sk-line sk-title" />
      <div className="sk-line sk-condition" />
      <div className="sk-line sk-temp" />
      <div className="stats-row">
        <div className="sk-line sk-stat" />
        <div className="sk-line sk-stat" />
        <div className="sk-line sk-stat" />
      </div>
    </div>
  );
}

export default function CurrentWeather({ data, unit, cityName, loading, error }) {
  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="current-card error-card">
        <p>Could not load weather data.</p>
        <p className="error-detail">{error}</p>
      </div>
    );
  }

  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  return (
    <div className="current-card">
      <div className="card-header">
        <h1 className="city-name">{cityName}</h1>
        <span className="condition">{wmoLabel(data.weathercode)}</span>
      </div>

      <div className="temp-display">
        {Math.round(data.temp)}
        <span className="unit-symbol">{unitSymbol}</span>
      </div>

      <div className="stats-row">
        <div className="stat">
          <span className="stat-label">Feels like</span>
          <span className="stat-value">{Math.round(data.feelsLike)}{unitSymbol}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{data.humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Wind</span>
          <span className="stat-value">{Math.round(data.windspeed)} km/h</span>
        </div>
      </div>
    </div>
  );
}
