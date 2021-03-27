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
    job,
    website,
    linkedin,
    instagram,
    twitter,
    bgColor
}) {
    return (
        <div
            className={`${bgColor} rounded-3xl px-6 py-10 flex space-x-2 flex-1`}>
            <div className="image-border">
                <Image
                    src={image}
                    alt="Picture of the author"
                    width={120}
                    height={120}
                />
            </div>
            <div className="flex-1">
                <h3 className="mb-4 font-bold">{name}</h3>
                <p className="mb-6 text-dark">
                    {job.role} @{' '}
                    <a href={job.url} className="underline">
                        {job.name}
                    </a>
                </p>
                <ul className="flex space-x-4">
                    {website && (
                        <li>
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="sr-only">
                                    Website von {name}
                                </span>
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
                                    LinkedIn von {name}
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
                                    Instagram von {name}
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
                                <span className="sr-only">
                                    Twitter von {name}
                                </span>
                                <IoLogoTwitter size={24} />
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
