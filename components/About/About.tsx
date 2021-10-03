import React from 'react';

import { Container } from '../Container';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';

export function About() {
  return (
    <Container width="768px">
      <Stack space="48px">
        <Heading as="h2" size="32px">
          About Life Centered Design.Net
        </Heading>
        <Stack space="32px">
          <Text>
            <strong>User-centered design (UCD)</strong> is an approach for
            designing interactive systems that places the users and their needs
            in the center of the design process. It has been around for ages
            now, first gaining popularity in 1986 through the book
            „User-Centered System Design: New Perspectives on Human-Computer
            Interaction“ by Donald A. Norman and Stephen W. Draper.
          </Text>
          <Text>
            The DIN EN ISO 9241-210, where this approach is defined, is now
            using the term <strong>human-centered design (HCD)</strong> to
            acknowledge, that there are several more stakeholders who are
            affected by a product or service than just their users.
          </Text>
          <Text>
            With that very same attitude, several questions can be posed: Is it
            enough to focus the design around human stakeholders? Are we the
            only ones affected by our products? What about long-term effects –
            are we considering them as well? Or effects that are more indirect
            and might be hidden under the surface of short-term user needs?
          </Text>
          <Text>
            In contrast to human-centered design, no ISO standard defines{' '}
            <strong>life-centered design</strong> as a term and practice. The
            notion of “life-centered design” is still in the formation and I
            don’t feel like that there are a common understanding and consense
            for what it means (yet) or if that is the term to be used for what
            we want to express. On top of that, there aren’t a lot of best
            practices for a life-centered approach. Nevertheless, the questions
            posed above seek to be answered. And life-centered design is (at
            least for me) a term that fits well enough to drive the conversation
            around these questions further.
          </Text>
          <Text>
            That is why I want to create Life Centered Design.Net. It is
            supposed to be a home for information, resources, and conversations
            to evolve beyond human-centered and user experience design.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
