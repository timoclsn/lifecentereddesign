import { ImageResponse } from 'next/server';
import { ContentType } from '../../lib/resources';
import { formatType, getHostname } from '../../lib/utils';

export const runtime = 'edge';

const sourceSerif4Promise = fetch(
  new URL('./source-serif-4-latin-700-normal.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const dmSansPromise = fetch(
  new URL('./dm-sans-latin-700-normal.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const GET = async (request: Request) => {
  const sourceSerif4 = await sourceSerif4Promise;
  const dmSans = await dmSansPromise;

  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || '';
  const type = (searchParams.get('type') || '') as ContentType;
  const formattedType = formatType(type);
  const category = searchParams.get('category') || '';
  const link = searchParams.get('link') || '';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          width: '100%',
          height: '100%',
          background: '#f8f6f1',
        }}
      >
        <div
          style={{
            padding: '64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            borderRadius: '64px',
            backgroundColor: getBackgroundColorForType(type),
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* Type */}
            <div
              style={{
                fontFamily: 'Sans',
                fontWeight: '700',
                fontSize: '28px',
                padding: '12px 24px',
                display: 'flex',
                borderRadius: '99999px',
                border: '4px solid rgba(16, 27, 44, 0.12)',
                color: '#101b2c',
              }}
            >
              {formattedType}
            </div>
            <div
              style={{
                fontFamily: 'Sans',
                fontWeight: '700',
                fontSize: '28px',
                padding: '12px 24px',
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#101b2c',
                borderRadius: '99999px',
                background: 'rgba(16, 27, 44, 0.12)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              LifeCenteredDesign.Net
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              lineHeight: '64px',
              fontFamily: 'Serif',
              fontWeight: '700',
              padding: '32px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontFamily: 'Sans',
                fontWeight: '700',
                fontSize: '28px',
                padding: '12px 24px',
                color: '#101b2c',
                borderRadius: '99999px',
                background: 'rgba(255, 255, 255, 0.56)',
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontFamily: 'Sans',
                fontWeight: '700',
                fontSize: '28px',
                padding: '12px 24px',
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#101b2c',
                borderRadius: '99999px',
                background: 'rgba(16, 27, 44, 0.12)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {getHostname(link)}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Sans',
          data: dmSans,
          style: 'normal',
        },
        {
          name: 'Serif',
          data: sourceSerif4,
          style: 'normal',
        },
      ],
    }
  );
};

const getBackgroundColorForType = (type: ContentType) => {
  switch (type) {
    case 'agency':
      return '#f1e6f5';
    case 'article':
      return '#e4f2e6';
    case 'book':
      return '#efe9e2';
    case 'community':
      return '#f1e6f5';
    case 'course':
      return '#f4e6e4';
    case 'directory':
      return '#efe9e2';
    case 'example':
      return '#f0f2d1';
    case 'magazine':
      return '#e7ecf7';
    case 'newsletter':
      return '#e7ecf7';
    case 'paper':
      return '#e4f2e6';
    case 'podcast':
      return '#e7ecf7';
    case 'podcastEpisode':
      return '#f3e6d1';
    case 'report':
      return '#efe9e2';
    case 'slide':
      return '#f4e6e4';
    case 'socialMediaProfile':
      return '#f0f2d1';
    case 'thoughtleader':
      return '#f4e6e4';
    case 'tool':
      return '#eaeaea';
    case 'video':
      return '#f0f2d1';
    default:
      return '#f0f2d1';
  }
};
