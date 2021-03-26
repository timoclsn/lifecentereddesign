import Image from 'next/image';
import {
    IoIosGlobe,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoTwitter
} from 'react-icons/io';

import Card from '@/components/Card';
import Heading from '@/components/Heading';
import Stack from '@/components/Stack';
import Text from '@/components/Text';

export default function ProfileCard({
    name,
    image,
    description,
    website,
    linkedin,
    instagram,
    twitter,
    bgColor
}) {
    return (
        <Card bgColor={bgColor}>
            <Stack orientation="horizontal" space="small">
                <div className="flex-none">
                    <Image
                        className="rounded-full"
                        src={image}
                        alt="Picture of the author"
                        width={120}
                        height={120}
                    />
                </div>
                <div className="flex-1">
                    <Stack space="small">
                        <Stack space="xsmall">
                            <Heading as="h3" size="small">
                                {name}
                            </Heading>
                            <Text as="p">{description}</Text>
                        </Stack>
                        <Stack as="ul" orientation="horizontal" space="small">
                            {website && (
                                <li>
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <span className="sr-only">Website</span>
                                        <IoIosGlobe size={24} />
                                    </a>
                                </li>
                            )}
                            {linkedin && (
                                <li>
                                    <a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <span className="sr-only">
                                            LinkedIn
                                        </span>
                                        <IoLogoLinkedin size={24} />
                                    </a>
                                </li>
                            )}
                            {instagram && (
                                <li>
                                    <a
                                        href={instagram}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <span className="sr-only">
                                            Instagram
                                        </span>
                                        <IoLogoInstagram size={24} />
                                    </a>
                                </li>
                            )}
                            {twitter && (
                                <li>
                                    <a
                                        href={twitter}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <span className="sr-only">Twitter</span>
                                        <IoLogoTwitter size={24} />
                                    </a>
                                </li>
                            )}
                        </Stack>
                    </Stack>
                </div>
            </Stack>
        </Card>
    );
}
