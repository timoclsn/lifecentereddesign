import { CO2Badge } from './CO2Badge/CO2Badge';
import { Navigation } from './Navigation/Navigation';

export const Header = () => {
  return (
    <header className="mb-20 sm:mb-40">
      <div className="flex justify-center">
        <CO2Badge />
      </div>
      <Navigation />
    </header>
  );
};
