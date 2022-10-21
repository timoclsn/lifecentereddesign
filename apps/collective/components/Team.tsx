import { Container, Heading, Text } from 'design-system';
import Image from 'next/future/image';

const team = [
  {
    name: 'Damien Lutz',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
  {
    name: 'Monika Sznel',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
  {
    name: 'Martin Tomitsch',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
  {
    name: 'Jeroen Spoelstra',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
  {
    name: 'Katharina Clasen',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
  {
    name: 'Estela Duhart Benavides',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
  {
    name: 'Madeleine van Venetie',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
  },
] as const;

export const Team = () => {
  return (
    <section className="bg-collective-team">
      <Container inset className="pt-20 pb-32">
        <Heading level="2" className="text-collective-text mb-4">
          The Team
        </Heading>
        <Text as="p" size="large" className="text-collective-text-light mb-20">
          The 7 people behind the Life Centered Design Collective
        </Text>
        <ul className="flex flex-wrap gap-20">
          {team.map((member, idx) => (
            <li key={idx} className="w-[calc(25%-80px)]">
              <TeamMember name={member.name} description={member.description} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

interface Props {
  name: string;
  description: string;
}

const TeamMember = ({ name, description }: Props) => {
  return (
    <div>
      <Image
        src={`/team/${name.split(' ').join('-').toLocaleLowerCase()}.png`}
        alt={`Portrait of ${name}`}
        width={336}
        height={336}
        className="mb-4"
      />
      <Heading level="4" className="text-collective-text mb-2">
        {name}
      </Heading>
      <Text as="p" className="text-collective-text-light">
        {description}
      </Text>
    </div>
  );
};
