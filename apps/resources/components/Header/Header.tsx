import { Await } from 'components/Await/Await';
import { getCO2Consumtion } from 'lib/co2';
import { CO2Badge } from './CO2Badge/CO2Badge';
import { Navigation } from './Navigation/Navigation';

export const Header = async () => {
  const promise = getCO2Consumtion('https://lifecentereddesign.net/');
  return (
    <header className="mb-20 sm:mb-40">
      <div className="flex h-10 justify-center">
        <Await promise={promise} loading={null} error={null}>
          {({ co2, cleanerThan }) => (
            <CO2Badge co2={co2} cleanerThan={cleanerThan} />
          )}
        </Await>
      </div>
      <Navigation />
    </header>
  );
};
