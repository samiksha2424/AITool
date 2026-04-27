import "./CitySelector.css";

export default function CitySelector({ cities, selected, onChange }) {
  function handleChange(e) {
    const city = cities.find((c) => c.name === e.target.value);
    if (city) onChange(city);
  }

  return (
    <div className="city-selector">
      <label htmlFor="city-select">Select City</label>
      <select id="city-select" value={selected.name} onChange={handleChange}>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
