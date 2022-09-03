import Image from 'next/future/image';
import {
  IoIosGlobe,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from 'react-icons/io';

interface Props {
  name: string;
  image: string;
  job: { role: string; url: string; name: string };
  website?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  bgColor?:
    | 'bg-oak'
    | 'bg-lime'
    | 'bg-sky'
    | 'bg-evening'
    | 'bg-sand'
    | 'bg-morning'
    | 'bg-forest'
    | 'bg-stone';
}

export function ProfileCard({
  name,
  image,
  job,
  website,
  linkedin,
  instagram,
  twitter,
  bgColor,
}: Props) {
  return (
    <div
      className={`${bgColor} flex flex-1 items-start space-x-2 rounded-3xl px-6 py-10`}
    >
      <Image
        src={image}
        alt={`Portrait image of ${name}`}
        width={120}
        height={120}
        className="rounded-full border-4 border-solid border-white leading-none"
      />
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
              <a href={website} target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Website of {name}</span>
                <IoIosGlobe size={24} />
              </a>
            </li>
          )}
          {linkedin && (
            <li>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn of {name}</span>
                <IoLogoLinkedin size={24} />
              </a>
            </li>
          )}
          {instagram && (
            <li>
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Instagram of {name}</span>
                <IoLogoInstagram size={24} />
              </a>
            </li>
          )}
          {twitter && (
            <li>
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Twitter of {name}</span>
                <IoLogoTwitter size={24} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
