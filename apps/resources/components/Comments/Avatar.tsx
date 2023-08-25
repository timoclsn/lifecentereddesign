import Image from 'next/image';

interface Props {
  url: string;
  username: string;
}

export const Avatar = ({ url, username }: Props) => {
  return (
    <div className="relative h-6 w-6">
      <div className="bg-stone absolute left-0 top-0 h-full w-full animate-pulse rounded-full" />
      <Image
        src={url}
        alt={`Avatar image of ${username}`}
        width={24}
        height={24}
        className="relative block h-full w-full rounded-full"
      />
    </div>
  );
};
