import React from 'react';
import { GetStaticProps } from 'next';

import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { Page } from '../components/Page';
import { Stack } from '../components/Stack';
import { getCO2Consumtion } from '../lib/co2';
import { Box } from '../components/Box';
import { List } from '../components/List';

export default function Privacy(props) {
  return (
    <Page co2Consumption={props.co2Consumption} title="Privacy" slug="privacy">
      <Container width="640px">
        <Stack space="96px">
          <Heading>Privacy</Heading>
          <Stack space="24px">
            <Heading as="h3" size="16px">
              Introduction
            </Heading>
            <Text>
              In the following privacy policy you will find information on the
              kind of personal data we process as well as in what extent and for
              what purposes.
            </Text>
            <Heading as="h3" size="16px">
              Responsible party
            </Heading>
            <Text>
              Katharina Clasen
              <br />
              Richard-Hirschmann-Str. 14/2
              <br />
              73728 Esslingen
              <br />
              Germany
              <br />
            </Text>
            <Text>
              +49176 44484593
              <br />
              katharina@katharinaclasen.de
            </Text>
          </Stack>

          <Stack space="32px">
            <Heading as="h2" size="32px">
              Data protection
            </Heading>
            <Stack space="24px">
              <Text>
                We take the protection of your personal data very seriously. We
                treat your personal data as confidential and in accordance with
                the statutory data protection regulations and this privacy
                policy.
              </Text>
              <Text>
                Personal data is any data with which you could be personally
                identified.
              </Text>
              <Text>
                Please note that data transmitted via the internet (e.g. via
                email communication) may be subject to security breaches.
                Complete protection of your data from third-party access is not
                possible.
              </Text>
              <Heading as="h3" size="16px">
                Copyright
              </Heading>
              <Text>
                This site uses SSL encryption for security reasons and for the
                protection of the transmission of confidential content, such as
                the inquiries you send to us as the site operator. You can
                recognize an encrypted connection in your browser&apos;s address
                line when it changes from &quot;http://&quot; to
                &quot;https://&quot; and the lock icon is displayed in your
                browser&apos;s address bar. If SSL encryption is activated, the
                data you transfer to us cannot be read by third parties.
              </Text>
            </Stack>
          </Stack>

          <Stack space="32px">
            <Heading as="h2" size="32px">
              Data collection
            </Heading>
            <Stack space="24px">
              <Heading as="h3" size="16px">
                Server log files
              </Heading>
              <Text>
                The website provider automatically collects and stores
                information that your browser automatically transmits to us in
                &quot;server log files&quot;. These are:
              </Text>
              <Text>These are:</Text>
              <List>
                <li>Browser type and browser version</li>
                <li>Operating system used</li>
                <li>Referrer URL</li>
                <li>Host name of the accessing computer</li>
                <li>Time of the server request</li>
                <li>IP address</li>
              </List>
              <Text>
                These data will not be combined with data from other sources.
              </Text>
              <Text>
                The basis for data processing is Art. 6 (1) (f) DSGVO, which
                allows the processing of data to fulfill a contract or for
                measures preliminary to a contract.
              </Text>
              <Heading as="h3" size="16px">
                Newsletter
              </Heading>
              <Text>
                We offer to subscribe to updates and information through our
                newsletter. We will only send you these updates and information
                through our newsletter with your <strong>consent</strong> (Art.
                6 (1) (a) DSGVO) or based on
                <strong>legal permission</strong>. In case that the content of
                the newsletter is described further with the signup form, this
                description is the basis of the consent given when signing up
                through that form.
              </Text>
              <Text>
                The subscription to our newsletter is handled through{' '}
                <strong>double opt-in</strong>. That means that you will get a
                confirmation email, that will ask you to actively confirm your
                subscription. This procedure is necessary so that no one can
                subscribe with an email address that doesn’t belong to them.
              </Text>
              <Text>
                The signups are being <strong>logged</strong> to be able to
                prove that the subscription process followed legal requirements.
                For that purpose, the IP address, as well as the date and time
                of the registration, are being stored. On top of that, the
                changes you make to your data that are stored with the
                newsletter provider are also being logged.
              </Text>
              <Text>
                We can <strong>store</strong> the registered email addresses
                after unsubscribing{' '}
                <strong>for up to three years before deleting</strong>
                them on the grounds of our legitimate interest to be able to
                prove consent given at an earlier time. The processing of these
                data is limited to the purpose of defense against claims. It is
                always possible to file an individual request for deletion if
                the former consent is being confirmed while doing so.
              </Text>
              <Text>
                <strong>Legal grounds</strong>: We send out our newsletter based
                on the grounds of consent (Art. 6 (1) (a) DSGVO) given by the
                subscriber. The logging of the subscription happens on the
                grounds of our legitimate interest to be able to prove that the
                subscription process followed legal requirements. The
                commissioning of a newsletter provider is based on the grounds
                of our legitimate interest in an efficient and safe newsletter
                system.
              </Text>
              <Text>
                The <strong>content</strong> of our newsletter is information,
                updates, and news about us.
              </Text>
              <Text>
                The newsletters contain a so-called “web-beacon”, which is a{' '}
                <strong>tracking</strong> pixel, a miniature graphic embedded in
                the email. Through this tracking pixel, several data can be
                collected: Technical information like information about the
                browser and system as well as your IP-address. It also tracks
                if, when, and where the newsletter was opened and which links
                were clicked. This information is being linked to your
                subscriber profile and is stored until their deletion. Such
                personal data collected in the tracking pixels contained in the
                newsletters are stored and analyzed to optimize the shipping of
                the newsletter, as well as to adapt the content of future
                newsletters and our services to the interests of the target
                audience. The tracking and storage of the information collected
                through the tracking pixels are based on the grounds of the
                consent given by the subscriber. It is not possible to only
                revoke your consent to the tracking. In this case, you need to
                opt-out of receiving the newsletter entirely so that the stored
                profile information will be deleted.
              </Text>
              <Text>
                You can <strong>opt-out</strong> of receiving our newsletter at
                any time and thereby revoke your consent to receive further
                newsletters. For that purpose, you can use the unsubscribe link
                we provide you with at the end of every newsletter.
              </Text>
              <Text>
                As a newsletter provider, we use the marketing platform „
                <strong>Mailchimp</strong>“ – Rocket Science Group, LLC, 675
                Ponce De Leon Ave NE #5000, Atlanta, GA 30308, USA (
                <Box as="a" cursor="pointer" href="https://mailchimp.com">
                  https://mailchimp.com
                </Box>
                ). You can find their privacy policy here:
                <Box
                  as="a"
                  cursor="pointer"
                  href="https://mailchimp.com/legal/privacy/"
                >
                  https://mailchimp.com/legal/privacy/
                </Box>
                . If you provide data (e.g. your email address) to subscribe to
                our newsletter, it will be stored on Mailchimp servers in the
                USA. MailChimp is certified under the EU-US Privacy Shield.
              </Text>
              <Heading as="h3" size="16px">
                Analytics
              </Heading>
              <Text>
                To best protect your privacy we set up our analytics tools to
                only store anonymized data. The tools we use are:
              </Text>
              <List>
                <li>
                  Splitbee Analytics to track page visits (e.g.: How many
                  visitors were there? What devices were used? Where did the
                  visitors come from? Which pages did they visit?). If you want
                  to see what data is visualized there you can have a look at
                  our public analytics dashboard.
                </li>
              </List>
            </Stack>
          </Stack>

          <Stack space="32px">
            <Heading as="h2" size="32px">
              Rights of the individual
            </Heading>
            <Stack space="24px">
              <Heading as="h3" size="16px">
                Revocation of your consent to the processing of your data
              </Heading>
              <Text>
                Many data processing operations are only possible with your
                express consent. You may revoke your consent at any time with
                future effect. An informal email making this request is
                sufficient. The data processed before we receive your request
                may still be legally processed.
              </Text>
              <Heading as="h3" size="16px">
                Right to file complaints with regulatory authorities
              </Heading>
              <Text>
                If there has been a breach of data protection legislation, the
                person affected may file a complaint with the competent
                regulatory authorities. The competent regulatory authority for
                matters related to data protection legislation is the data
                protection officer of the German state in which our company is
                headquartered. A list of data protection officers and their
                contact details can be found at the following{' '}
                <Box
                  as="a"
                  cursor="pointer"
                  href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                >
                  link
                </Box>
                .
              </Text>
              <Heading as="h3" size="16px">
                Right to data portability
              </Heading>
              <Text>
                You have the right to have data which we process based on your
                consent or in fulfillment of a contract automatically delivered
                to yourself or to a third party in a standard, machine-readable
                format. If you require the direct transfer of data to another
                responsible party, this will only be done to the extent
                technically feasible.
              </Text>
              <Heading as="h3" size="16px">
                Information, blocking, deletion
              </Heading>
              <Text>
                As permitted by law, you have the right to be provided at any
                time with information free of charge about any of your personal
                data that is stored as well as its origin, the recipient and the
                purpose for which it has been processed. You also have the right
                to have this data corrected, blocked or deleted. You can contact
                us at any time using the address given in our legal notice if
                you have further questions on the topic of personal data.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion(
    'https://lifecentereddesign.net'
  );

  return {
    props: { co2Consumption },
  };
};
