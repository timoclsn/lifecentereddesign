export default function CO2Badge({ co2Consumption }) {
  return (
    <div>
      <span>
        {co2Consumption}g of CO<sub>2</sub>
      </span>
    </div>
  );
}
