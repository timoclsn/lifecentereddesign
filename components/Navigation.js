import Link from "next/link";

import CO2Badge from "@/components/CO2Badge";

export default function Navigation({ co2Consumption }) {
  return (
    <header>
      <span>Navigation: </span>
      <Link href="/">
        <a>
          <h1>Life Centered Design</h1>
        </a>
      </Link>
      <CO2Badge co2Consumption={co2Consumption} />
    </header>
  );
}
