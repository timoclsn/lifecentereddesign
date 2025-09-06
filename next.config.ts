import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  outputFileTracingExcludes: {
    '*': ['.pnpm-store/**/*'],
  },
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 2678400,
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/ods/script',
        destination: 'https://assets.onedollarstats.com/stonks.js',
      },
      {
        source: '/ods/events',
        destination: 'https://collector.onedollarstats.com/events',
      },
    ];
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;

const redirects = [
  {
    source: '/resources/thoughtleader-1',
    destination: '/resources/john-thackara',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-2',
    destination: '/resources/cennydd-bowles',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-3',
    destination: '/resources/simon-sinek',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-4',
    destination: '/resources/scott-riley',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-5',
    destination: '/resources/gerry-mcgovern',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-6',
    destination: '/resources/tom-greenwood',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-7',
    destination: '/resources/sarah-spiekermann',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-8',
    destination: '/resources/mike-monteiro',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-9',
    destination: '/resources/tim-frick',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-10',
    destination: '/resources/nathan-shedroff',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-11',
    destination: '/resources/senongo-akpem',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-12',
    destination: '/resources/trine-falbe',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-13',
    destination: '/resources/martin-michael-frederiksen',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-14',
    destination: '/resources/kim-andersen',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-15',
    destination: '/resources/eric-a-meyer',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-16',
    destination: '/resources/sara-wachter-boettcher',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-17',
    destination: '/resources/victor-papanek',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-18',
    destination: '/resources/jason-hickel',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-19',
    destination: '/resources/jonathan-chapman',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-21',
    destination: '/resources/hemant-taneja',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-24',
    destination: '/resources/leyla-acaroglu',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-26',
    destination: '/resources/jane-fulton-suri',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-29',
    destination: '/resources/joe-toscano',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-34',
    destination: '/resources/bruce-mau',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-36',
    destination: '/resources/solitaire-townsend',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-37',
    destination: '/resources/martin-tomitsch',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-38',
    destination: '/resources/madeleine-van-venetie',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-39',
    destination: '/resources/melinda-gaughwin',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-40',
    destination: '/resources/helena-wataya',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-41',
    destination: '/resources/johnathyn-owens',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-42',
    destination: '/resources/damien-lutz',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-43',
    destination: '/resources/jeroen-spoelstra',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-44',
    destination: '/resources/katharina-clasen',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-45',
    destination: '/resources/john-tillman-lyle',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-46',
    destination: '/resources/brent-toderian',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-48',
    destination: '/resources/janine-benyus',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-49',
    destination: '/resources/jamie-miller',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-50',
    destination: '/resources/wiebke-liu',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-51',
    destination: '/resources/chris-castro',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-52',
    destination: '/resources/saskia-van-den-muijsenberg',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-53',
    destination: '/resources/thomas-m-rau',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-54',
    destination: '/resources/estela-duhart-benavides',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-55',
    destination: '/resources/giselle-carr',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-56',
    destination: '/resources/monika-sznel',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-57',
    destination: '/resources/stiven-kerestegian',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-58',
    destination: '/resources/kai-brach',
    permanent: true,
  },
  {
    source: '/resources/article-1',
    destination: '/resources/free-tools-for-sustainable-and-circular-design',
    permanent: true,
  },
  {
    source: '/resources/article-2',
    destination:
      '/resources/tools-for-systems-thinkers-the-6-fundamental-concepts-of-systems-thinking',
    permanent: true,
  },
  {
    source: '/resources/article-3',
    destination: '/resources/inclusive-design',
    permanent: true,
  },
  {
    source: '/resources/article-4',
    destination:
      '/resources/for-the-sake-of-the-planet-we-need-to-rethink-human-centred-design',
    permanent: true,
  },
  {
    source: '/resources/article-5',
    destination:
      '/resources/designing-for-change-through-life-centered-approach',
    permanent: true,
  },
  {
    source: '/resources/article-6',
    destination: '/resources/10-principles-of-life-centered-design',
    permanent: true,
  },
  {
    source: '/resources/article-7',
    destination:
      '/resources/10-design-practices-combine-in-life-centred-design',
    permanent: true,
  },
  {
    source: '/resources/article-8',
    destination:
      '/resources/life-centered-design-wie-design-mit-der-trendwende-vom-profit-zum-purpose-die-welt-retten-will',
    permanent: true,
  },
  {
    source: '/resources/article-9',
    destination: '/resources/a-holistic-design-toolkit-for-life-centred-design',
    permanent: true,
  },
  {
    source: '/resources/article-10',
    destination: '/resources/from-human-centered-to-life-centered-design',
    permanent: true,
  },
  {
    source: '/resources/article-11',
    destination:
      '/resources/moving-from-human-centered-design-towards-life-centered-design',
    permanent: true,
  },
  {
    source: '/resources/article-12',
    destination: '/resources/sustainable-innovation-with-life-centred-design',
    permanent: true,
  },
  {
    source: '/resources/article-13',
    destination:
      '/resources/life-centered-design-social-design-through-biomimicry',
    permanent: true,
  },
  {
    source: '/resources/article-14',
    destination: '/resources/how-to-create-a-non-human-persona',
    permanent: true,
  },
  {
    source: '/resources/article-15',
    destination:
      '/resources/your-next-persona-will-be-non-human-tools-for-environment-centered-designers',
    permanent: true,
  },
  {
    source: '/resources/newsletter-1',
    destination: '/resources/dense-discovery',
    permanent: true,
  },
  {
    source: '/resources/newsletter-2',
    destination: '/resources/tech-for-good-compass',
    permanent: true,
  },
  {
    source: '/resources/magazine-1',
    destination: '/resources/branch',
    permanent: true,
  },
  {
    source: '/resources/magazine-2',
    destination: '/resources/tech-for-good-magazine-2',
    permanent: true,
  },
  {
    source: '/resources/slide-1',
    destination: '/resources/life-centered-design',
    permanent: true,
  },
  {
    source: '/resources/example-1',
    destination: '/resources/bullitt-center',
    permanent: true,
  },
  {
    source: '/resources/example-2',
    destination: '/resources/rewe-green-farming-supermarkt-umgedacht',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-20',
    destination: '/resources/ron-wakkary',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-22',
    destination: '/resources/kevin-maney',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-23',
    destination: '/resources/kenneth-chenault',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-25',
    destination: '/resources/liza-kindred',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-27',
    destination: '/resources/carey-jenkins',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-28',
    destination: '/resources/tim-jackson',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-30',
    destination: '/resources/david-wortmann',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-31',
    destination: '/resources/anthony-dunne',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-32',
    destination: '/resources/fiona-raby',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-33',
    destination: '/resources/simon-mundy',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-35',
    destination: '/resources/alita-joyce',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-47',
    destination: '/resources/sierra-robinson',
    permanent: true,
  },
  {
    source: '/resources/book-1',
    destination:
      '/resources/how-to-thrive-in-the-next-economy-designing-tomorrows-world-today',
    permanent: true,
  },
  {
    source: '/resources/book-2',
    destination:
      '/resources/mindful-design-how-and-why-to-make-design-decisions-for-the-good-of-those-using-your-product',
    permanent: true,
  },
  {
    source: '/resources/book-3',
    destination: '/resources/future-ethics',
    permanent: true,
  },
  {
    source: '/resources/book-4',
    destination:
      '/resources/the-infinite-game-how-great-businesses-achieve-long-lasting-success',
    permanent: true,
  },
  {
    source: '/resources/book-5',
    destination:
      '/resources/world-wide-waste-how-digital-is-killing-our-planet-and-what-we-can-do-about-it-',
    permanent: true,
  },
  {
    source: '/resources/book-6',
    destination: '/resources/sustainable-web-design-book-6',
    permanent: true,
  },
  {
    source: '/resources/book-7',
    destination:
      '/resources/digitale-ethik-ein-wertesystem-fuer-das-21-jahrhundert',
    permanent: true,
  },
  {
    source: '/resources/book-8',
    destination:
      '/resources/ruined-by-design-how-designers-destroyed-the-world-and-what-we-can-do-to-fix-it',
    permanent: true,
  },
  {
    source: '/resources/book-9',
    destination:
      '/resources/designing-for-sustainability-a-guide-to-building-greener-digital-products-and-services',
    permanent: true,
  },
  {
    source: '/resources/book-10',
    destination: '/resources/design-is-the-solution',
    permanent: true,
  },
  {
    source: '/resources/book-11',
    destination: '/resources/cross-cultural-design',
    permanent: true,
  },
  {
    source: '/resources/book-12',
    destination: '/resources/the-ethical-design-handbook',
    permanent: true,
  },
  {
    source: '/resources/book-13',
    destination: '/resources/design-for-real-life',
    permanent: true,
  },
  {
    source: '/resources/book-14',
    destination:
      '/resources/design-for-the-real-world-human-ecology-and-social-change',
    permanent: true,
  },
  {
    source: '/resources/book-15',
    destination: '/resources/less-is-more-how-degrowth-will-save-the-world',
    permanent: true,
  },
  {
    source: '/resources/book-16',
    destination: '/resources/meaningful-stuff-design-that-lasts',
    permanent: true,
  },
  {
    source: '/resources/book-17',
    destination:
      '/resources/things-we-could-design-for-more-than-human-centered-worlds-',
    permanent: true,
  },
  {
    source: '/resources/book-18',
    destination:
      '/resources/intended-consequences-how-to-build-market-leading-companies-with-responsible-innovation',
    permanent: true,
  },
  {
    source: '/resources/book-19',
    destination: '/resources/post-growth-life-after-capitalism',
    permanent: true,
  },
  {
    source: '/resources/book-20',
    destination:
      '/resources/prosperity-without-growth-foundations-for-the-economy-of-tomorrow',
    permanent: true,
  },
  {
    source: '/resources/book-21',
    destination: '/resources/automating-humanity',
    permanent: true,
  },
  {
    source: '/resources/book-22',
    destination:
      '/resources/speculative-everything-design-fiction-and-social-dreaming',
    permanent: true,
  },
  {
    source: '/resources/book-23',
    destination:
      '/resources/race-for-tomorrow-survival-innovation-and-profit-on-the-front-lines-of-the-climate-crisis',
    permanent: true,
  },
  {
    source: '/resources/book-24',
    destination: '/resources/mc24',
    permanent: true,
  },
  {
    source: '/resources/book-25',
    destination: '/resources/good-by-design-ideas-for-a-better-world',
    permanent: true,
  },
  {
    source: '/resources/book-26',
    destination: '/resources/regenerative-design-for-sustainable-development',
    permanent: true,
  },
  {
    source: '/resources/book-27',
    destination:
      '/resources/design-think-make-break-repeat-a-handbook-of-methods',
    permanent: true,
  },
  {
    source: '/resources/book-28',
    destination: '/resources/the-life-centred-design-guide',
    permanent: true,
  },
  {
    source: '/resources/agency-1',
    destination: '/resources/stardust-life-centered-design',
    permanent: true,
  },
  {
    source: '/resources/agency-2',
    destination: '/resources/cannondesign',
    permanent: true,
  },
  {
    source: '/resources/agency-3',
    destination: '/resources/futerra',
    permanent: true,
  },
  {
    source: '/resources/agency-4',
    destination: '/resources/erm',
    permanent: true,
  },
  {
    source: '/resources/agency-5',
    destination: '/resources/good',
    permanent: true,
  },
  {
    source: '/resources/agency-6',
    destination: '/resources/studio-republic',
    permanent: true,
  },
  {
    source: '/resources/agency-7',
    destination: '/resources/mightybytes',
    permanent: true,
  },
  {
    source: '/resources/agency-8',
    destination: '/resources/wholegrain-digital',
    permanent: true,
  },
  {
    source: '/resources/agency-9',
    destination: '/resources/advocate',
    permanent: true,
  },
  {
    source: '/resources/agency-10',
    destination: '/resources/longevity',
    permanent: true,
  },
  {
    source: '/resources/agency-11',
    destination: '/resources/likolab',
    permanent: true,
  },
  {
    source: '/resources/agency-12',
    destination: '/resources/unbeaten-studio',
    permanent: true,
  },
  {
    source: '/resources/community-1',
    destination: '/resources/tech-for-good-meetup',
    permanent: true,
  },
  {
    source: '/resources/community-2',
    destination: '/resources/climate-designers',
    permanent: true,
  },
  {
    source: '/resources/community-3',
    destination: '/resources/b-lab-europe',
    permanent: true,
  },
  {
    source: '/resources/community-4',
    destination:
      '/resources/send-social-entrepreneurship-netzwerk-deutschland-e-v',
    permanent: true,
  },
  {
    source: '/resources/community-5',
    destination: '/resources/ashoka',
    permanent: true,
  },
  {
    source: '/resources/community-6',
    destination: '/resources/project-drawdow',
    permanent: true,
  },
  {
    source: '/resources/community-7',
    destination: '/resources/cusp',
    permanent: true,
  },
  {
    source: '/resources/community-8',
    destination: '/resources/dcarb',
    permanent: true,
  },
  {
    source: '/resources/community-9',
    destination: '/resources/beacon',
    permanent: true,
  },
  {
    source: '/resources/community-10',
    destination: '/resources/hertie-school',
    permanent: true,
  },
  {
    source: '/resources/community-11',
    destination: '/resources/the-sustainable-ux-playbook',
    permanent: true,
  },
  {
    source: '/resources/community-12',
    destination: '/resources/biomimicry-institute',
    permanent: true,
  },
  {
    source: '/resources/community-13',
    destination: '/resources/climate-draft',
    permanent: true,
  },
  {
    source: '/resources/community-14',
    destination: '/resources/sux',
    permanent: true,
  },
  {
    source: '/resources/community-15',
    destination: '/resources/ecological-design-collective',
    permanent: true,
  },
  {
    source: '/resources/community-16',
    destination: '/resources/ecological-design-collective-community',
    permanent: true,
  },
  {
    source: '/resources/community-17',
    destination: '/resources/ideas-for-us-ideas',
    permanent: true,
  },
  {
    source: '/resources/community-18',
    destination: '/resources/aimhi-earth',
    permanent: true,
  },
  {
    source: '/resources/community-19',
    destination: '/resources/life-centered-design-collective',
    permanent: true,
  },
  {
    source: '/resources/community-20',
    destination: '/resources/tech-for-good-community-20',
    permanent: true,
  },
  {
    source: '/resources/course-1',
    destination: '/resources/climate-solutions-101',
    permanent: true,
  },
  {
    source: '/resources/course-2',
    destination: '/resources/foundations-of-humane-technology',
    permanent: true,
  },
  {
    source: '/resources/directory-1',
    destination: '/resources/diversify-tech',
    permanent: true,
  },
  {
    source: '/resources/directory-2',
    destination: '/resources/humane-by-design',
    permanent: true,
  },
  {
    source: '/resources/directory-3',
    destination: '/resources/climatebase',
    permanent: true,
  },
  {
    source: '/resources/directory-4',
    destination: '/resources/goodjobs',
    permanent: true,
  },
  {
    source: '/resources/directory-5',
    destination: '/resources/ethicalnet',
    permanent: true,
  },
  {
    source: '/resources/directory-6',
    destination: '/resources/ethical-design-guide',
    permanent: true,
  },
  {
    source: '/resources/directory-7',
    destination: '/resources/ethical-design-network',
    permanent: true,
  },
  {
    source: '/resources/directory-8',
    destination: '/resources/accessible-social',
    permanent: true,
  },
  {
    source: '/resources/directory-9',
    destination: '/resources/civic-tech-field-guide',
    permanent: true,
  },
  {
    source: '/resources/directory-10',
    destination: '/resources/life-centered-designnet',
    permanent: true,
  },
  {
    source: '/resources/podcast-1',
    destination: '/resources/world-wide-waste-with-gerry-mcgovern-podcast-1',
    permanent: true,
  },
  {
    source: '/resources/podcast-2',
    destination: '/resources/deep-dive-cleantech',
    permanent: true,
  },
  {
    source: '/resources/podcast-3',
    destination: '/resources/future-economies',
    permanent: true,
  },
  {
    source: '/resources/podcast-5',
    destination:
      '/resources/learning-from-nature-the-biomimicry-podcast-with-lily-urmann',
    permanent: true,
  },
  {
    source: '/resources/podcast-6',
    destination: '/resources/tech-for-good-podcast-6',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-19',
    destination: '/resources/mindful-technology-with-liza-kindred',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-20',
    destination: '/resources/the-future-is-life-centered-jane-fulton-suri-ideo',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-21',
    destination: '/resources/ethical-design-in-an-age-of-uncertainty',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-22',
    destination:
      '/resources/world-wide-waste-with-gerry-mcgovern-podcastepisode-22',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-23',
    destination: '/resources/ethics-is-product-management',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-24',
    destination: '/resources/measuring-the-carbon-footprint-of-our-web-designs',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-25',
    destination: '/resources/is-there-life-after-the-growth-imperative',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-26',
    destination: '/resources/digital-das-klima-schuetzen',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-27',
    destination:
      '/resources/bruce-mau-24-principles-for-designing-massive-change',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-28',
    destination: '/resources/life-centered-design-with-giselle-carr',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-29',
    destination:
      '/resources/from-human-centred-design-to-life-centred-design-with-dr-martin-tomitsch',
    permanent: true,
  },
  {
    source: '/resources/video-1',
    destination: '/resources/an-economic-reality-check',
    permanent: true,
  },
  {
    source: '/resources/video-2',
    destination: '/resources/fjord-trends-2020-life-centered-design',
    permanent: true,
  },
  {
    source: '/resources/video-3',
    destination:
      '/resources/are-ad-agencies-pr-firms-and-lobbyists-destroying-the-climate',
    permanent: true,
  },
  {
    source: '/resources/video-4',
    destination: '/resources/brent-toderian-on-sustainable-mobility',
    permanent: true,
  },
  {
    source: '/resources/video-5',
    destination: '/resources/life-centered-design-by-bruce-mau-bodw-2021',
    permanent: true,
  },
  {
    source: '/resources/video-6',
    destination: '/resources/what-is-regenerative-design',
    permanent: true,
  },
  {
    source: '/resources/video-7',
    destination: '/resources/the-case-for-regenerative-design',
    permanent: true,
  },
  {
    source: '/resources/video-8',
    destination:
      '/resources/beyond-sustainability-a-call-for-regeneration-sierra-robinson-tedxyouthseattle',
    permanent: true,
  },
  {
    source: '/resources/video-9',
    destination:
      '/resources/triple-bottom-line-3-pillars-sustainability-in-business',
    permanent: true,
  },
  {
    source: '/resources/video-10',
    destination:
      '/resources/biomimicry-definition-examples-explained-with-drawings',
    permanent: true,
  },
  {
    source: '/resources/video-11',
    destination:
      '/resources/circular-economy-definition-examples-sustainability-environment',
    permanent: true,
  },
  {
    source: '/resources/video-12',
    destination: '/resources/what-is-permaculture-and-why-should-i-care',
    permanent: true,
  },
  {
    source: '/resources/video-13',
    destination: '/resources/systems-thinking-video-13',
    permanent: true,
  },
  {
    source: '/resources/video-14',
    destination: '/resources/what-is-systems-thinking',
    permanent: true,
  },
  {
    source: '/resources/video-15',
    destination: '/resources/systems-thinking-video-15',
    permanent: true,
  },
  {
    source: '/resources/video-16',
    destination: '/resources/biomimicry',
    permanent: true,
  },
  {
    source: '/resources/video-17',
    destination: '/resources/biomimicry-jamie-miller-at-tedxembryriddle',
    permanent: true,
  },
  {
    source: '/resources/video-18',
    destination:
      '/resources/applying-the-principles-of-biomimicry-to-business-wiebke-liu-at-tedxolympicblvdwomen',
    permanent: true,
  },
  {
    source: '/resources/video-19',
    destination: '/resources/ideas-for-biomimicry-chris-castro-at-tedxorlando',
    permanent: true,
  },
  {
    source: '/resources/video-20',
    destination: '/resources/circular-economy-thomas-rau-at-tedxzwolle',
    permanent: true,
  },
  {
    source: '/resources/video-21',
    destination:
      '/resources/creating-a-bio-industrial-revolution-janine-benyus',
    permanent: true,
  },
  {
    source: '/resources/tool-1',
    destination: '/resources/website-carbon-calculator',
    permanent: true,
  },
  {
    source: '/resources/tool-2',
    destination: '/resources/ecograder',
    permanent: true,
  },
  {
    source: '/resources/tool-3',
    destination: '/resources/actionable-futures-toolkit',
    permanent: true,
  },
  {
    source: '/resources/tool-4',
    destination: '/resources/sustaio-score',
    permanent: true,
  },
  {
    source: '/resources/tool-5',
    destination: '/resources/ideo-designkit',
    permanent: true,
  },
  {
    source: '/resources/tool-6',
    destination: '/resources/workforclimate',
    permanent: true,
  },
  {
    source: '/resources/tool-7',
    destination: '/resources/ziele-fuer-nachhaltige-entwicklung',
    permanent: true,
  },
  {
    source: '/resources/tool-8',
    destination: '/resources/sustainable-web-design-tool-8',
    permanent: true,
  },
  {
    source: '/resources/tool-9',
    destination: '/resources/sustainable-web-manifesto',
    permanent: true,
  },
  {
    source: '/resources/tool-10',
    destination: '/resources/probable-futures',
    permanent: true,
  },
  {
    source: '/resources/tool-11',
    destination: '/resources/ecoping',
    permanent: true,
  },
  {
    source: '/resources/tool-12',
    destination: '/resources/solution-explorer',
    permanent: true,
  },
  {
    source: '/resources/tool-13',
    destination: '/resources/drawdown-framework-for-climate-solutions',
    permanent: true,
  },
  {
    source: '/resources/tool-14',
    destination: '/resources/electricity-map',
    permanent: true,
  },
  {
    source: '/resources/tool-15',
    destination: '/resources/nature-cards',
    permanent: true,
  },
  {
    source: '/resources/tool-16',
    destination: '/resources/human-library',
    permanent: true,
  },
  {
    source: '/resources/tool-17',
    destination:
      '/resources/knowledge-base-for-the-sustainable-development-goals',
    permanent: true,
  },
  {
    source: '/resources/tool-18',
    destination: '/resources/future-scouting-tools',
    permanent: true,
  },
  {
    source: '/resources/tool-19',
    destination: '/resources/future-snapshot-framework',
    permanent: true,
  },
  {
    source: '/resources/tool-20',
    destination: '/resources/life-centred-purpose',
    permanent: true,
  },
  {
    source: '/resources/tool-21',
    destination: '/resources/non-human-personas',
    permanent: true,
  },
  {
    source: '/resources/tool-22',
    destination: '/resources/impact-ripple-canvas',
    permanent: true,
  },
  {
    source: '/resources/community-21',
    destination: '/resources/design-declares',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-59',
    destination: '/resources/andy-thornton',
    permanent: true,
  },
  {
    source: '/resources/article-16',
    destination: '/resources/demystifying-collaboration-pt-3-speed',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-60',
    destination: '/resources/sandra-pallier',
    permanent: true,
  },
  {
    source: '/resources/slide-2',
    destination: '/resources/how-to-design-a-green-digital-product',
    permanent: true,
  },
  {
    source: '/resources/slide-3',
    destination: '/resources/microsoft-green-design-principles',
    permanent: true,
  },
  {
    source: '/resources/newsletter-3',
    destination: '/resources/curiously-green',
    permanent: true,
  },
  {
    source: '/resources/agency-13',
    destination: '/resources/tpximpact',
    permanent: true,
  },
  {
    source: '/resources/community-22',
    destination: '/resources/climateactiontech',
    permanent: true,
  },
  {
    source: '/resources/tool-23',
    destination: '/resources/the-circular-design-guide',
    permanent: true,
  },
  {
    source: '/resources/tool-24',
    destination: '/resources/backspace',
    permanent: true,
  },
  {
    source: '/resources/community-23',
    destination: '/resources/creativesforfuture-deutschland',
    permanent: true,
  },
  {
    source: '/resources/tool-25',
    destination: '/resources/ecodesignkit',
    permanent: true,
  },
  {
    source: '/resources/paper-1',
    destination:
      '/resources/promoting-sustainable-wellbeing-integrating-positive-psychology-and-environmental-sustainability-in-education',
    permanent: true,
  },
  {
    source: '/resources/paper-2',
    destination:
      '/resources/a-life-centred-design-approach-to-innovation-space-vulture-a-conceptual-circular-system-to-create-value-from-space-debris',
    permanent: true,
  },
  {
    source: '/resources/paper-3',
    destination:
      '/resources/non-human-personas-including-nature-in-the-participatory-design-of-smart-cities',
    permanent: true,
  },
  {
    source: '/resources/paper-4',
    destination:
      '/resources/from-human-centred-to-life-centred-design-considering-environmental-and-ethical-concerns-in-the-design-of-interactive-products',
    permanent: true,
  },
  {
    source: '/resources/article-17',
    destination: '/resources/the-case-for-using-non-human-personas-in-design',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-61',
    destination: '/resources/david-berigny',
    permanent: true,
  },
  {
    source: '/resources/article-18',
    destination: '/resources/exploring-a-life-affirming-future-an-introduction',
    permanent: true,
  },
  {
    source: '/resources/article-19',
    destination: '/resources/how-sustainability-efforts-fall-apart',
    permanent: true,
  },
  {
    source: '/resources/course-3',
    destination: '/resources/life-centered-design-school',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-62',
    destination: '/resources/paola-miani',
    permanent: true,
  },
  {
    source: '/resources/article-20',
    destination:
      '/resources/environmental-sustainability-for-digital-services-how-to-minimise-waste-and-emissions-while-influencing-sustainable-behaviours',
    permanent: true,
  },
  {
    source: '/resources/book-29',
    destination: '/resources/closing-the-loop-systems-thinking-for-designers',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-63',
    destination: '/resources/sheryl-cababa',
    permanent: true,
  },
  {
    source: '/resources/book-30',
    destination:
      '/resources/living-democracy-an-ecological-manifesto-for-the-end-of-the-world-as-we-know-it',
    permanent: true,
  },
  {
    source: '/resources/article-21',
    destination: '/resources/mertons-unintended-consequences-theory',
    permanent: true,
  },
  {
    source: '/resources/podcast-7',
    destination: '/resources/green-the-web-podcast-7',
    permanent: true,
  },
  {
    source: '/resources/community-24',
    destination: '/resources/creatives-for-climate',
    permanent: true,
  },
  {
    source: '/resources/tool-26',
    destination: '/resources/neurodiversity-design-system',
    permanent: true,
  },
  {
    source: '/resources/video-22',
    destination: '/resources/how-to-design-a-green-website',
    permanent: true,
  },
  {
    source: '/resources/tool-27',
    destination: '/resources/4-returns-landscape-business-model-canvas',
    permanent: true,
  },
  {
    source: '/resources/tool-28',
    destination: '/resources/triple-layered-business-model-canvas',
    permanent: true,
  },
  {
    source: '/resources/tool-29',
    destination: '/resources/adaptive-strategy-for-circular-design',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-64',
    destination: '/resources/thorsten-jonas',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-30',
    destination: '/resources/sustainable-design-in-ux-with-thorsten-jonas',
    permanent: true,
  },
  {
    source: '/resources/tool-30',
    destination: '/resources/ibm-design-for-sustainability',
    permanent: true,
  },
  {
    source: '/resources/article-22',
    destination:
      '/resources/7-opportunities-for-a-shift-towards-life-centered-design',
    permanent: true,
  },
  {
    source: '/resources/socialMediaProfile-1',
    destination: '/resources/local-futures',
    permanent: true,
  },
  {
    source: '/resources/tool-31',
    destination: '/resources/ux-of-ai',
    permanent: true,
  },
  {
    source: '/resources/tool-32',
    destination: '/resources/unhurried-design',
    permanent: true,
  },
  {
    source: '/resources/report-1',
    destination: '/resources/wellbeing-adjusted-life-years',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-31',
    destination: '/resources/systems-thinking-with-sheryl-cababa',
    permanent: true,
  },
  {
    source: '/resources/tool-33',
    destination: '/resources/circular-design-toolkit',
    permanent: true,
  },
  {
    source: '/resources/podcast-8',
    destination: '/resources/how-to-save-a-planet',
    permanent: true,
  },
  {
    source: '/resources/podcast-9',
    destination: '/resources/my-climate-journey-podcast',
    permanent: true,
  },
  {
    source: '/resources/podcast-10',
    destination: '/resources/the-energy-gang',
    permanent: true,
  },
  {
    source: '/resources/podcast-11',
    destination: '/resources/the-big-switch',
    permanent: true,
  },
  {
    source: '/resources/community-25',
    destination: '/resources/doughnut-economics-action-lab-deal',
    permanent: true,
  },
  {
    source: '/resources/podcast-12',
    destination: '/resources/upstream-podcast',
    permanent: true,
  },
  {
    source: '/resources/book-31',
    destination:
      '/resources/design-for-a-better-world-meaningful-sustainable-humanity-centered',
    permanent: true,
  },
  {
    source: '/resources/podcast-13',
    destination: '/resources/your-undivided-attention',
    permanent: true,
  },
  {
    source: '/resources/agency-14',
    destination: '/resources/biomimicry-38',
    permanent: true,
  },
  {
    source: '/resources/tool-34',
    destination: '/resources/biomimicry-designlens',
    permanent: true,
  },
  {
    source: '/resources/video-23',
    destination:
      '/resources/from-human-centered-to-life-centered-design-six-reasons-and-opportunities-for-change-in-design',
    permanent: true,
  },
  {
    source: '/resources/tool-35',
    destination: '/resources/humane-design-guide',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-65',
    destination: '/resources/dr-joana-casaca-lemos',
    permanent: true,
  },
  {
    source: '/resources/directory-11',
    destination: '/resources/illuminem',
    permanent: true,
  },
  {
    source: '/resources/tool-36',
    destination: '/resources/biomimicry-design-jam',
    permanent: true,
  },
  {
    source: '/resources/tool-37',
    destination: '/resources/iso-26000-guide',
    permanent: true,
  },
  {
    source: '/resources/tool-38',
    destination: '/resources/data-sources-for-calculating-digital-emissions',
    permanent: true,
  },
  {
    source: '/resources/podcast-14',
    destination: '/resources/sux-podcast',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-66',
    destination: '/resources/bavo-lodewyckx',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-67',
    destination: '/resources/sandy-daehnert',
    permanent: true,
  },
  {
    source: '/resources/tool-39',
    destination: '/resources/sustainability-strategy-canvas',
    permanent: true,
  },
  {
    source: '/resources/tool-40',
    destination: '/resources/sustainability-kit-for-digital-designers',
    permanent: true,
  },
  {
    source: '/resources/tool-41',
    destination: '/resources/problem-framing-canvas',
    permanent: true,
  },
  {
    source: '/resources/article-24',
    destination: '/resources/web-almanac-chapter-20-sustainability',
    permanent: true,
  },
  {
    source: '/resources/tool-42',
    destination: '/resources/holistic-futures-wheel',
    permanent: true,
  },
  {
    source: '/resources/podcastEpisode-32',
    destination:
      '/resources/justyna-turek-a-fresh-perspectivethe-role-of-human-centered-design-in-sustainability',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-68',
    destination: '/resources/justyna-turek',
    permanent: true,
  },
  {
    source: '/resources/article-25',
    destination:
      '/resources/sustainable-ux-is-more-than-reducing-your-websites-footprint',
    permanent: true,
  },
  {
    source: '/resources/community-26',
    destination: '/resources/80000-hours',
    permanent: true,
  },
  {
    source: '/resources/tool-43',
    destination: '/resources/sux-the-sustainable-ux-design-toolkit',
    permanent: true,
  },
  {
    source: '/resources/tool-44',
    destination: '/resources/sustainability-infused-user-journey-mapping',
    permanent: true,
  },
  {
    source: '/resources/article-26',
    destination:
      '/resources/environment-centered-user-journey-maps-incl-example-and-template',
    permanent: true,
  },
  {
    source: '/resources/agency-15',
    destination: '/resources/next-agents',
    permanent: true,
  },
  {
    source: '/resources/video-24',
    destination: '/resources/sustainable-ux-our-responsibility-as-ux-designers',
    permanent: true,
  },
  {
    source: '/resources/book-32',
    destination:
      '/resources/designing-tomorrow-strategic-design-tactics-to-change-your-practice-organisation-and-planetary-impact',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-69',
    destination: '/resources/steve-baty',
    permanent: true,
  },
  {
    source: '/resources/article-27',
    destination:
      '/resources/what-are-green-skills-15-green-skills-clearly-explained',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-70',
    destination: '/resources/matthew-shribman',
    permanent: true,
  },
  {
    source: '/resources/tool-45',
    destination: '/resources/accessibility-posters',
    permanent: true,
  },
  {
    source: '/resources/tool-46',
    destination: '/resources/actant-mapping-canvas',
    permanent: true,
  },
  {
    source: '/resources/tool-47',
    destination: '/resources/upright-platform',
    permanent: true,
  },
  {
    source: '/resources/report-2',
    destination: '/resources/net-impact-report-2021',
    permanent: true,
  },
  {
    source: '/resources/agency-16',
    destination: '/resources/except-integrated-sustainability-bv',
    permanent: true,
  },
  {
    source: '/resources/tool-48',
    destination: '/resources/symbiosis-in-development-sid',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-71',
    destination: '/resources/manuel-lima',
    permanent: true,
  },
  {
    source: '/resources/book-33',
    destination: '/resources/the-new-designer-rejecting-myths-embracing-change',
    permanent: true,
  },
  {
    source: '/resources/tool-49',
    destination: '/resources/post-growth-guide',
    permanent: true,
  },
  {
    source: '/resources/tool-50',
    destination: '/resources/systemic-design-toolkit',
    permanent: true,
  },
  {
    source: '/resources/tool-51',
    destination: '/resources/sustainable-business-model-canvas',
    permanent: true,
  },
  {
    source: '/resources/book-34',
    destination: '/resources/the-non-human-persona-guide',
    permanent: true,
  },
  {
    source: '/resources/agency-17',
    destination: '/resources/lucidminds',
    permanent: true,
  },
  {
    source: '/resources/agency-18',
    destination: '/resources/for-planet-strategy-lab',
    permanent: true,
  },
  {
    source: '/resources/tool-52',
    destination: '/resources/web-sustainability-guidelines-wsg-10',
    permanent: true,
  },
  {
    source: '/resources/community-27',
    destination: '/resources/leaders-for-climate-action',
    permanent: true,
  },
  {
    source: '/resources/community-28',
    destination: '/resources/design-in-focus',
    permanent: true,
  },
  {
    source: '/resources/community-29',
    destination: '/resources/design-for-good',
    permanent: true,
  },
  {
    source: '/resources/example-3',
    destination: '/resources/project-holi',
    permanent: true,
  },
  {
    source: '/resources/agency-19',
    destination: '/resources/big',
    permanent: true,
  },
  {
    source: '/resources/community-30',
    destination: '/resources/all-tech-is-human',
    permanent: true,
  },
  {
    source: '/resources/tool-53',
    destination: '/resources/system-mapping-toolkit',
    permanent: true,
  },
  {
    source: '/resources/course-5',
    destination: '/resources/green-uxui-design-course',
    permanent: true,
  },
  {
    source: '/resources/course-6',
    destination: '/resources/becoming-a-climate-designer',
    permanent: true,
  },
  {
    source: '/resources/course-7',
    destination: '/resources/systems-thinking-course-7',
    permanent: true,
  },
  {
    source: '/resources/agency-20',
    destination: '/resources/green-window-agency',
    permanent: true,
  },
  {
    source: '/resources/tool-54',
    destination: '/resources/plan-a',
    permanent: true,
  },
  {
    source: '/resources/video-25',
    destination:
      '/resources/were-the-worlds-first-company-to-put-nature-on-the-board-heres-why',
    permanent: true,
  },
  {
    source: '/resources/example-4',
    destination: '/resources/a-vote-for-nature',
    permanent: true,
  },
  {
    source: '/resources/tool-55',
    destination: '/resources/problem-tree',
    permanent: true,
  },
  {
    source: '/resources/tool-56',
    destination: '/resources/oecd-better-life-index',
    permanent: true,
  },
  {
    source: '/resources/tool-57',
    destination: '/resources/theory-u',
    permanent: true,
  },
  {
    source: '/resources/tool-58',
    destination: '/resources/image-carbon',
    permanent: true,
  },
  {
    source: '/resources/podcast-15',
    destination: '/resources/green-io',
    permanent: true,
  },
  {
    source: '/resources/newsletter-4',
    destination: '/resources/green-the-web-newsletter-4',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-72',
    destination: '/resources/julia-steinberger',
    permanent: true,
  },
  {
    source: '/resources/directory-12',
    destination: '/resources/sustainable-ethical-methods-library',
    permanent: true,
  },
  {
    source: '/resources/article-28',
    destination:
      '/resources/digital-sustainability-how-to-go-green-with-digital-products',
    permanent: true,
  },
  {
    source: '/resources/article-29',
    destination: '/resources/10-ways-to-make-your-website-more-sustainable',
    permanent: true,
  },
  {
    source: '/resources/article-30',
    destination:
      '/resources/why-does-the-circular-economy-need-systems-thinking',
    permanent: true,
  },
  {
    source: '/resources/article-31',
    destination: '/resources/how-do-esg-and-sustainability-fit-together',
    permanent: true,
  },
  {
    source: '/resources/example-5',
    destination:
      '/resources/circular-transformation-meet-16-circular-startups-making-it-happen',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-73',
    destination: '/resources/prof-dr-maja-goepel',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-74',
    destination: '/resources/b-lorraine-smith',
    permanent: true,
  },
  {
    source: '/resources/agency-21',
    destination: '/resources/think-like-a-tree',
    permanent: true,
  },
  {
    source: '/resources/directory-13',
    destination: '/resources/sustainable-web-practices-wiki',
    permanent: true,
  },
  {
    source: '/resources/tool-59',
    destination: '/resources/behavioral-impact-canvas',
    permanent: true,
  },
  {
    source: '/resources/report-3',
    destination: '/resources/wellbeing-in-germany',
    permanent: true,
  },
  {
    source: '/resources/course-8',
    destination: '/resources/the-non-human-persona-online-course',
    permanent: true,
  },
  {
    source: '/resources/book-35',
    destination:
      '/resources/rethinking-our-world-an-invitation-to-rescue-our-future',
    permanent: true,
  },
  {
    source: '/resources/book-36',
    destination:
      '/resources/doughnut-economics-seven-ways-to-think-like-a-21st-century-economist',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-75',
    destination: '/resources/kate-raworth',
    permanent: true,
  },
  {
    source: '/resources/tool-60',
    destination: '/resources/klimatest-fuer-websites',
    permanent: true,
  },
  {
    source: '/resources/article-32',
    destination: '/resources/introduction-to-web-sustainability',
    permanent: true,
  },
  {
    source: '/resources/thoughtleader-76',
    destination: '/resources/paddy-le-flufy',
    permanent: true,
  },
  {
    source: '/resources/book-37',
    destination:
      '/resources/building-tomorrow-averting-environmental-crisis-with-a-new-economic-system',
    permanent: true,
  },
  {
    source: '/resources/directory-14',
    destination: '/resources/sux-network-resource-collection-event-calendar',
    permanent: true,
  },
  {
    source: '/resources/course-9',
    destination: '/resources/non-human-persona-course',
    permanent: true,
  },
  {
    source: '/resources/tool-61',
    destination: '/resources/climate-product-management-playbook',
    permanent: true,
  },
  {
    source: '/resources/directory-15',
    destination: '/resources/lowwwcarbon',
    permanent: true,
  },
  {
    source: '/resources/tool-62',
    destination: '/resources/circular-experience-library',
    permanent: true,
  },
  {
    source: '/resources/tool-63',
    destination: '/resources/conscious-attention-economy-principles',
    permanent: true,
  },
  {
    source: '/resources/directory-16',
    destination: '/resources/commons-social-change-library',
    permanent: true,
  },
  {
    source: '/resources/tool-64',
    destination: '/resources/digital-carbon-rating-system',
    permanent: true,
  },
  {
    source: '/resources/article-33',
    destination: '/resources/will-ai-be-good-for-the-environment',
    permanent: true,
  },
  {
    source: '/resources/course-10',
    destination: '/resources/circular-economy-courses',
    permanent: true,
  },
  {
    source: '/resources/article-34',
    destination: '/resources/system-thinking-for-innovation',
    permanent: true,
  },
];
