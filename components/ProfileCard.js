import Image from 'next/image';
import {
    IoIosGlobe,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoTwitter
} from 'react-icons/io';

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
        <div
            className={`${bgColor} rounded-3xl px-6 py-10 flex space-x-2 flex-1`}>
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
                <h3 className="mb-4 font-bold">{name}</h3>
                <p className="mb-6 text-dark">{description}</p>
                <ul className="flex space-x-6">
                    {website && (
                        <li>
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="sr-only">Website</span>
                                <IoIosGlobe size={20} />
                            </a>
                        </li>
                    )}
                    {linkedin && (
                        <li>
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="sr-only">LinkedIn</span>
                                <IoLogoLinkedin size={20} />
                            </a>
                        </li>
                    )}
                    {instagram && (
                        <li>
                            <a
                                href={instagram}
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="sr-only">Instagram</span>
                                <IoLogoInstagram size={20} />
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
                                <IoLogoTwitter size={20} />
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
