import "./UnitToggle.css";

export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="toggle-group" role="group" aria-label="Temperature unit">
      <button
        className={unit === "celsius" ? "active" : ""}
        onClick={() => onChange("celsius")}
      >
        °C
      </button>
      <button
        className={unit === "fahrenheit" ? "active" : ""}
        onClick={() => onChange("fahrenheit")}
      >
        °F
      </button>
    </div>
  );
}
