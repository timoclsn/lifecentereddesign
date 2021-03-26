import Link from 'next/link';

import ContentBlock from '@/components/ContentBlock';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function Footer() {
    return (
        <footer className="w-full mt-auto bg-oak">
            <ContentBlock paddingX="medium" paddingY="medium">
                <Stack
                    orientation="horizontal"
                    size="medium"
                    align="center"
                    justify="between">
                    <Stack as="ul" orientation="horizontal" size="small">
                        <Text as="li">
                            <a href="#about">About</a>
                        </Text>
                        <Text as="li">
                            <a href="#newsletter">Newsletter</a>
                        </Text>
                        <Text as="li">
                            <a href="https://katharinaclasen.de">
                                Katharina Clasen
                            </a>
                        </Text>
                        <Text as="li">
                            <a href="https://timoclasen.de">Timo Clasen</a>
                        </Text>
                    </Stack>
                    <Stack as="ul" orientation="horizontal" size="small">
                        <Text as="li" weight="strong">
                            <Link href="/imprint">
                                <a>Imprint</a>
                            </Link>
                        </Text>
                        <Text as="li" weight="strong">
                            <Link href="/privacy">
                                <a>Privacy</a>
                            </Link>
                        </Text>
                    </Stack>
                </Stack>
            </ContentBlock>
        </footer>
    );
}
