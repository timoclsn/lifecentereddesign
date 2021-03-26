import Link from 'next/link';

import Button from '@/components/Button';
import CO2Badge from '@/components/CO2Badge';
import ContentBlock from '@/components/ContentBlock';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function Navigation({ co2Consumption }) {
    return (
        <ContentBlock as="header" size="full">
            <ContentBlock paddingX="medium">
                <Stack space="small">
                    <div className="mx-auto">
                        <CO2Badge co2Consumption={co2Consumption} />
                    </div>
                    <div className="w-full">
                        <Stack
                            as="nav"
                            orientation="horizontal"
                            justify="between"
                            align="center">
                            <Stack
                                as="ul"
                                orientation="horizontal"
                                space="small">
                                <Text as="li" weight="strong">
                                    <Link href="/">
                                        <a>Life Centered Design.Net</a>
                                    </Link>
                                </Text>
                                <Text as="li">About</Text>
                                <Text as="li">Newsletter</Text>
                            </Stack>
                            <Button secondary bgColor="bg-morning">
                                Accessibility settings
                            </Button>
                        </Stack>
                    </div>
                </Stack>
            </ContentBlock>
        </ContentBlock>
    );
}
