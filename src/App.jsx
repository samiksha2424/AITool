import { useState } from "react";
import { CITIES } from "./constants/cities";
import { useWeather } from "./hooks/useWeather";
import CitySelector from "./components/CitySelector/CitySelector";
import UnitToggle from "./components/UnitToggle/UnitToggle";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import ForecastChart from "./components/ForecastChart/ForecastChart";
import "./App.css";

export default function App() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [unit, setUnit] = useState("celsius");

  const { data, loading, error } = useWeather(selectedCity, unit);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-row">
          <div className="brand">
            <span className="brand-icon">&#127777;</span>
            <span className="brand-name">India Weather</span>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} />
        </div>
        <div className="selector-row">
          <CitySelector cities={CITIES} selected={selectedCity} onChange={setSelectedCity} />
        </div>
      </header>

      <main>
        <CurrentWeather
          data={data?.current}
          unit={unit}
          cityName={selectedCity.name}
          loading={loading}
          error={error}
        />
        <ForecastChart
          forecast={data?.forecast}
          unit={unit}
          loading={loading}
          error={error}
        />
      </main>

      <footer className="app-footer">
        Data from{" "}
        <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
      </footer>
    </div>
  );
}
