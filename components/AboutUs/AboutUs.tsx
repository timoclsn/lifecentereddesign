import React from 'react';

import { Container } from '../Container';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Stack } from '../Stack';
import { ProfileCard } from '../ProfileCard';

export function AboutUs() {
  return (
    <Container width="768px">
      <div id="about-us">
        <Stack space="48px">
          <Heading as="h2" size="32px">
            About us
          </Heading>
          <Stack space="32px">
            <Text>
              Hi{' '}
              <span role="img" aria-label="Waveing hand">
                👋
              </span>
            </Text>
            <Text>
              This is <strong>Katharina</strong>. My husband{' '}
              <strong>Timo</strong> and I are the two people behind Life
              Centered Design.Net.
            </Text>
            <Text>
              I have developed a passion for the mindset I associate with
              life-centered design. I am trying to weave in parts of this
              mindset into the things I do as{' '}
              <strong>Head of Strategy & UX</strong> at{' '}
              <a
                href="https://codeatelier.com"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Codeatelier
              </a>
              , a <strong>lecturer</strong> at{' '}
              <a
                href="https://www.hdm-stuttgart.de"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stuttgart Media University
              </a>{' '}
              and{' '}
              <a
                href="https://www.hs-esslingen.de"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                University of Applied Sciences Esslingen
              </a>
              , and as a <strong>board member</strong> of the{' '}
              <a
                href="https://makersleague.de"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Makers League e. V.
              </a>
            </Text>
            <Text>
              My husband Timo, <strong>CEO</strong> at{' '}
              <a
                href="https://codeatelier.com"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Codeatelier
              </a>{' '}
              shares this passion – especially when it comes to sustainability
              in (web) technologies.
            </Text>
            <Text>
              Because of my deep interest in that topic but also due to the
              fact, that it was very hard for me to find information and best
              practices on life-centered design in the past years, I wanted to
              create Life Centered Design.Net
            </Text>
          </Stack>
          <Stack
            direction={{
              default: 'vertical',
              '640px': 'horizontal',
            }}
            space="48px"
          >
            <ProfileCard
              name="Katharina Clasen"
              image="/profile/katharina-clasen.png"
              job={{
                role: 'Head of Strategy & UX',
                name: 'Codeatelier',
                url: 'https://codeatelier.com',
              }}
              bgColor="bg-sky"
              website="https://katharinaclasen.de"
              linkedin="https://www.linkedin.com/in/katharina-clasen/"
              instagram="https://www.instagram.com/katharinaclasen/"
              twitter="https://twitter.com/KatharinaClasen"
            />
            <ProfileCard
              name="Timo Clasen"
              image="/profile/timo-clasen.png"
              job={{
                role: 'CEO',
                name: 'Codeatelier',
                url: 'https://codeatelier.com',
              }}
              bgColor="bg-evening"
              website="https://timoclasen.de"
              linkedin="https://www.linkedin.com/in/timoclsn"
              twitter="https://twitter.com/timoclsn"
            />
          </Stack>
        </Stack>
      </div>
    </Container>
  );
}
