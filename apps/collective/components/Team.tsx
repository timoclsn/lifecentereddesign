import { Member } from 'contentlayer/generated';
import { Container, Heading, Text } from 'design-system';
import Image from 'next/future/image';

interface TeamProps {
  members: Array<Member>;
}

export const Team = ({ members }: TeamProps) => {
  return (
    <section id="team" className="bg-collective-team">
      <Container inset className="pt-20 pb-32">
        <Heading level="2" className="text-collective-text mb-4">
          The Team
        </Heading>
        <Text as="p" size="large" className="text-collective-text-light mb-20">
          The 7 people behind the Life Centered Design Collective
        </Text>
        <ul className="flex flex-wrap gap-20">
          {members.map((member, idx) => (
            <li
              key={idx}
              className="w-full sm:w-[calc(50%-40px)] md:w-[calc(33.33%-53.33px)] lg:w-[calc(25%-60px)]"
            >
              <Member name={member.name} description={member.body.raw} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

interface MemberProps {
  name: string;
  description: string;
}

const Member = ({ name, description }: MemberProps) => {
  const imageName = `${name.split(' ').join('-').toLocaleLowerCase()}.png`;
  return (
    <>
      <Image
        src={`/team/${imageName}`}
        alt={`Portrait of ${name}`}
        width={336}
        height={336}
        sizes="(max-width: 480px) 100vw,
              (max-width: 768px) 50vw,
              (max-width: 976px) 33vw,
              25vw"
        className="mb-4 w-full"
      />
      <Heading as="h3" level="4" className="text-collective-text mb-2">
        {name}
      </Heading>
      <Text as="p" className="text-collective-text-light">
        {description}
      </Text>
    </>
  );
};
