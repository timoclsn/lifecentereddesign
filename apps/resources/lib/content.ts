import Airtable, { FieldSet, Record } from 'airtable';
import { z } from 'zod';

Airtable.configure({
  apiKey: z.string().parse(process.env.AIRTABLE_API_KEY),
});

const base = Airtable.base(z.string().parse(process.env.AIRTABLE_BASE_ID));

const getAllRecordsFromTable = async (name: string) => {
  const allRecords: Array<Record<FieldSet>> = [];

  await base(name)
    .select({})
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        allRecords.push(record);
      });
      fetchNextPage();
    });

  return allRecords.map((record) => record._rawJson);
};

const isoDateTimeRegExp = new RegExp(
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
);
const dateTimeSchema = z.string().regex(isoDateTimeRegExp);

const isoDateRegExp = new RegExp(/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/);
const dateSchema = z.string().regex(isoDateRegExp);

const referenceSchema = z.array(z.string());

const baseSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
});

type BookSchema = z.infer<typeof bookSchema>;

const bookSchema = baseSchema.extend({
  fields: z.object({
    title: z.string(),
    authors: referenceSchema.optional(),
    category: referenceSchema.optional(),
    link: z.string().url().optional(),
    topics: referenceSchema.optional(),
    'publishing-date': dateSchema.optional(),
    publisher: z.string().optional(),
    isbn: z.string().optional(),
  }),
});

type ArticleSchema = z.infer<typeof articleSchema>;

const articleSchema = baseSchema.extend({
  fields: z.object({
    title: z.string(),
    'author-is-thoughtleader': referenceSchema.optional(),
    author: z.string().optional(),
    category: referenceSchema.optional(),
    link: z.string().url().optional(),
    topics: referenceSchema.optional(),
    date: dateSchema.optional(),
    'date-rough': z.string().optional(),
    duration: z.number().optional(),
  }),
});

type ThoughtleaderSchema = z.infer<typeof thoughtleaderSchema>;

const thoughtleaderSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    'job-description': z.string().optional(),
    category: referenceSchema.optional(),
    link: z.string().url().optional(),
  }),
});

type CategorySchema = z.infer<typeof categorySchema>;

const categorySchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
  }),
});

type TopicSchema = z.infer<typeof topicSchema>;

const topicSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
  }),
});

type PodcastepisodeSchema = z.infer<typeof podcastepisodeSchema>;

const podcastepisodeSchema = baseSchema.extend({
  fields: z.object({
    title: z.string(),
    'podcast-not-relevant': z.string().optional(),
    date: dateSchema.optional(),
    duration: z.number().optional(),
    category: referenceSchema.optional(),
    podcast: referenceSchema.optional(),
    guest: referenceSchema.optional(),
    link: z.string().url().optional(),
    topics: referenceSchema.optional(),
  }),
});

type PodcastSchema = z.infer<typeof podcastSchema>;

const podcastSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    host: z.string().optional(),
    thoughtleader: referenceSchema.optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

type DirectorySchema = z.infer<typeof directorySchema>;

const directorySchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

type VideoSchema = z.infer<typeof videoSchema>;

const videoSchema = baseSchema.extend({
  fields: z.object({
    title: z.string(),
    thoughtleader: referenceSchema.optional(),
    author: z.string().optional(),
    category: referenceSchema.optional(),
    link: z.string().url().optional(),
    date: dateSchema.optional(),
    duration: z.number().optional(),
    topics: referenceSchema.optional(),
  }),
});

type ToolSchema = z.infer<typeof toolSchema>;

const toolSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

type CommunityOrOrganizationSchema = z.infer<
  typeof communityOrOrganizationSchema
>;

const communityOrOrganizationSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

type CourseSchema = z.infer<typeof courseSchema>;

const courseSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
  }),
});

type ExampleOrCaseStudySchema = z.infer<typeof exampleOrCaseStudySchema>;

const exampleOrCaseStudySchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

type AgencySchema = z.infer<typeof agencySchema>;

const agencySchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

type SlideSchema = z.infer<typeof slideSchema>;

const slideSchema = baseSchema.extend({
  fields: z.object({
    title: z.string(),
    'author-is-thoughtleader': referenceSchema.optional(),
    author: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
    date: dateSchema.optional(),
    'date-rough': z.string().optional(),
  }),
});

type MagazineSchema = z.infer<typeof magazineSchema>;

const magazineSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

type NewsletterSchema = z.infer<typeof newsletterSchema>;

const newsletterSchema = baseSchema.extend({
  fields: z.object({
    name: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    thoughtleader: referenceSchema.optional(),
    frequency: z.string().optional(),
    link: z.string().url().optional(),
    category: referenceSchema.optional(),
    topics: referenceSchema.optional(),
  }),
});

let dataStore: {
  books: Array<BookSchema>;
  articles: Array<ArticleSchema>;
  thoughtleaders: Array<ThoughtleaderSchema>;
  categories: Array<CategorySchema>;
  topics: Array<TopicSchema>;
  podcastEpisodes: Array<PodcastepisodeSchema>;
  podcasts: Array<PodcastSchema>;
  directories: Array<DirectorySchema>;
  videos: Array<VideoSchema>;
  tools: Array<ToolSchema>;
  communitiesAndOrganizations: Array<CommunityOrOrganizationSchema>;
  courses: Array<CourseSchema>;
  examplesAndCaseStudies: Array<ExampleOrCaseStudySchema>;
  agencies: Array<AgencySchema>;
  slides: Array<SlideSchema>;
  magazines: Array<MagazineSchema>;
  newsletters: Array<NewsletterSchema>;
};

const getData = async () => {
  if (!dataStore) {
    const [
      books,
      articles,
      thoughtleaders,
      categories,
      topics,
      podcastEpisodes,
      podcasts,
      directories,
      videos,
      tools,
      communitiesAndOrganizations,
      courses,
      examplesAndCaseStudies,
      agencies,
      slides,
      magazines,
      newsletters,
    ] = await Promise.all([
      getAllRecordsFromTable('books'),
      getAllRecordsFromTable('articles'),
      getAllRecordsFromTable('thoughtleaders'),
      getAllRecordsFromTable('categories'),
      getAllRecordsFromTable('topics'),
      getAllRecordsFromTable('podcast-episodes'),
      getAllRecordsFromTable('podcasts'),
      getAllRecordsFromTable('directories'),
      getAllRecordsFromTable('videos'),
      getAllRecordsFromTable('tools'),
      getAllRecordsFromTable('communities-and-organizations'),
      getAllRecordsFromTable('courses'),
      getAllRecordsFromTable('examples-and-case-studies'),
      getAllRecordsFromTable('agencies'),
      getAllRecordsFromTable('slides'),
      getAllRecordsFromTable('magazines'),
      getAllRecordsFromTable('newsletters'),
    ]);

    const parsedBooks = z.array(bookSchema).parse(books);
    const parsedArticles = z.array(articleSchema).parse(articles);
    const parsedThoughtleaders = z
      .array(thoughtleaderSchema)
      .parse(thoughtleaders);
    const parsedCategories = z.array(categorySchema).parse(categories);
    const parsedTopics = z.array(topicSchema).parse(topics);
    const parsedPodcastEpisodes = z
      .array(podcastepisodeSchema)
      .parse(podcastEpisodes);
    const parsedPodcasts = z.array(podcastSchema).parse(podcasts);
    const parsedDirectories = z.array(directorySchema).parse(directories);
    const parsedVideos = z.array(videoSchema).parse(videos);
    const parsedTools = z.array(toolSchema).parse(tools);
    const parsedCommunitiesAndOrganizations = z
      .array(communityOrOrganizationSchema)
      .parse(communitiesAndOrganizations);
    const parsedCourses = z.array(courseSchema).parse(courses);
    const parsedExamplesAndCaseStudies = z
      .array(exampleOrCaseStudySchema)
      .parse(examplesAndCaseStudies);
    const parsedAgencies = z.array(agencySchema).parse(agencies);
    const parsedSlides = z.array(slideSchema).parse(slides);
    const parsedMagazines = z.array(magazineSchema).parse(magazines);
    const parsedNewsletters = z.array(newsletterSchema).parse(newsletters);

    dataStore = {
      books: parsedBooks,
      articles: parsedArticles,
      thoughtleaders: parsedThoughtleaders,
      categories: parsedCategories,
      topics: parsedTopics,
      podcastEpisodes: parsedPodcastEpisodes,
      podcasts: parsedPodcasts,
      directories: parsedDirectories,
      videos: parsedVideos,
      tools: parsedTools,
      communitiesAndOrganizations: parsedCommunitiesAndOrganizations,
      courses: parsedCourses,
      examplesAndCaseStudies: parsedExamplesAndCaseStudies,
      agencies: parsedAgencies,
      slides: parsedSlides,
      magazines: parsedMagazines,
      newsletters: parsedNewsletters,
    };
  }

  return dataStore;
};

const findReference = (
  ids: Array<string>,
  data: Array<{
    id: string;
    [key: string]: any;
  }>
) => ids.map((id) => data.find((date) => date.id === id));

const contentType = {
  book: 'book',
  article: 'article',
  thoughtleader: 'thoughtleader',
  category: 'category',
  topic: 'topic',
  podcastEpisode: 'podcastEpisode',
  podcast: 'podcast',
  directory: 'directory',
  video: 'video',
  tool: 'tool',
  communityOrOrganization: 'communityOrOrganization',
  course: 'course',
  exampleOrCaseStudy: 'exampleOrCaseStudy',
  agency: 'agency',
  slide: 'slide',
  magazine: 'magazine',
  newsletter: 'newsletter',
} as const;

export type ContentType = keyof typeof contentType;

const getBooks = async () => {
  const data = await getData();
  return data.books.map((book) => ({
    type: contentType.book,
    ...book,
    fields: {
      ...book.fields,
      authors: book.fields.authors
        ? findReference(book.fields.authors, data.thoughtleaders)
        : null,
      category: book.fields.category
        ? findReference(book.fields.category, data.categories)
        : null,
      topics: book.fields.topics
        ? findReference(book.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Book = Awaited<ReturnType<typeof getBooks>>[number];

const getArticles = async () => {
  const data = await getData();
  return data.articles.map((article) => ({
    type: contentType.article,
    ...article,
    fields: {
      ...article.fields,
      'author-is-thoughtleader': article.fields['author-is-thoughtleader']
        ? findReference(
            article.fields['author-is-thoughtleader'],
            data.thoughtleaders
          )
        : null,
      category: article.fields.category
        ? findReference(article.fields.category, data.categories)
        : null,
      topics: article.fields.topics
        ? findReference(article.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Article = Awaited<ReturnType<typeof getArticles>>[number];

const getThoughtleaders = async () => {
  const data = await getData();
  return data.thoughtleaders.map((thoughtleader) => ({
    type: contentType.thoughtleader,
    ...thoughtleader,
    fields: {
      ...thoughtleader.fields,
      category: thoughtleader.fields.category
        ? findReference(thoughtleader.fields.category, data.categories)
        : null,
    },
  }));
};

export type Thoughtleader = Awaited<
  ReturnType<typeof getThoughtleaders>
>[number];

const getPodcastEpisodes = async () => {
  const data = await getData();
  return data.podcastEpisodes.map((podcastEpisode) => ({
    type: contentType.podcastEpisode,
    ...podcastEpisode,
    fields: {
      ...podcastEpisode.fields,
      category: podcastEpisode.fields.category
        ? findReference(podcastEpisode.fields.category, data.categories)
        : null,
      podcast: podcastEpisode.fields.podcast
        ? findReference(podcastEpisode.fields.podcast, data.podcasts)
        : null,
      guest: podcastEpisode.fields.guest
        ? findReference(podcastEpisode.fields.guest, data.thoughtleaders)
        : null,
      topics: podcastEpisode.fields.topics
        ? findReference(podcastEpisode.fields.topics, data.topics)
        : null,
    },
  }));
};

export type PodcastEpisode = Awaited<
  ReturnType<typeof getPodcastEpisodes>
>[number];

const getPodcasts = async () => {
  const data = await getData();
  return data.podcasts.map((podcast) => ({
    type: contentType.podcast,
    ...podcast,
    fields: {
      ...podcast.fields,
      category: podcast.fields.category
        ? findReference(podcast.fields.category, data.categories)
        : null,
      thoughtleader: podcast.fields.thoughtleader
        ? findReference(podcast.fields.thoughtleader, data.thoughtleaders)
        : null,
      topics: podcast.fields.topics
        ? findReference(podcast.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Podcast = Awaited<ReturnType<typeof getPodcasts>>[number];

const getDirectories = async () => {
  const data = await getData();
  return data.directories.map((directory) => ({
    type: contentType.directory,
    ...directory,
    fields: {
      ...directory.fields,
      category: directory.fields.category
        ? findReference(directory.fields.category, data.categories)
        : null,
      topics: directory.fields.topics
        ? findReference(directory.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Directory = Awaited<ReturnType<typeof getDirectories>>[number];

const getVideos = async () => {
  const data = await getData();
  return data.videos.map((video) => ({
    type: contentType.video,
    ...video,
    fields: {
      ...video.fields,
      category: video.fields.category
        ? findReference(video.fields.category, data.categories)
        : null,
      thoughtleader: video.fields.thoughtleader
        ? findReference(video.fields.thoughtleader, data.thoughtleaders)
        : null,
      topics: video.fields.topics
        ? findReference(video.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Video = Awaited<ReturnType<typeof getVideos>>[number];

const getTools = async () => {
  const data = await getData();
  return data.tools.map((tool) => ({
    type: contentType.tool,
    ...tool,
    fields: {
      ...tool.fields,
      category: tool.fields.category
        ? findReference(tool.fields.category, data.categories)
        : null,
      topics: tool.fields.topics
        ? findReference(tool.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Tool = Awaited<ReturnType<typeof getTools>>[number];

const getCommunitiesAndOrganizations = async () => {
  const data = await getData();
  return data.communitiesAndOrganizations.map((communityOrOrganization) => ({
    type: contentType.communityOrOrganization,
    ...communityOrOrganization,
    fields: {
      ...communityOrOrganization.fields,
      category: communityOrOrganization.fields.category
        ? findReference(
            communityOrOrganization.fields.category,
            data.categories
          )
        : null,
      topics: communityOrOrganization.fields.topics
        ? findReference(communityOrOrganization.fields.topics, data.topics)
        : null,
    },
  }));
};

export type CommunityOrOrganization = Awaited<
  ReturnType<typeof getCommunitiesAndOrganizations>
>[number];

const getCourses = async () => {
  const data = await getData();
  return data.courses.map((course) => ({
    type: contentType.course,
    ...course,
    fields: {
      ...course.fields,
      category: course.fields.category
        ? findReference(course.fields.category, data.categories)
        : null,
    },
  }));
};

export type Course = Awaited<ReturnType<typeof getCourses>>[number];

const getExamplesAndCaseStudies = async () => {
  const data = await getData();
  return data.examplesAndCaseStudies.map((exampleOrCaseStudy) => ({
    type: contentType.exampleOrCaseStudy,
    ...exampleOrCaseStudy,
    fields: {
      ...exampleOrCaseStudy.fields,
      category: exampleOrCaseStudy.fields.category
        ? findReference(exampleOrCaseStudy.fields.category, data.categories)
        : null,
      topics: exampleOrCaseStudy.fields.topics
        ? findReference(exampleOrCaseStudy.fields.topics, data.topics)
        : null,
    },
  }));
};

export type ExampleOrCaseStudy = Awaited<
  ReturnType<typeof getExamplesAndCaseStudies>
>[number];

const getAgencies = async () => {
  const data = await getData();
  return data.agencies.map((agency) => ({
    type: contentType.agency,
    ...agency,
    fields: {
      ...agency.fields,
      category: agency.fields.category
        ? findReference(agency.fields.category, data.categories)
        : null,
      topics: agency.fields.topics
        ? findReference(agency.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Agency = Awaited<ReturnType<typeof getAgencies>>[number];

const getSlides = async () => {
  const data = await getData();
  return data.slides.map((slide) => ({
    type: contentType.slide,
    ...slide,
    fields: {
      ...slide.fields,
      'author-is-thoughtleader': slide.fields['author-is-thoughtleader']
        ? findReference(
            slide.fields['author-is-thoughtleader'],
            data.thoughtleaders
          )
        : null,
      category: slide.fields.category
        ? findReference(slide.fields.category, data.categories)
        : null,
      topics: slide.fields.topics
        ? findReference(slide.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Slide = Awaited<ReturnType<typeof getSlides>>[number];

const getMagazines = async () => {
  const data = await getData();
  return data.magazines.map((magazine) => ({
    type: contentType.magazine,
    ...magazine,
    fields: {
      ...magazine.fields,
      category: magazine.fields.category
        ? findReference(magazine.fields.category, data.categories)
        : null,
      topics: magazine.fields.topics
        ? findReference(magazine.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Magazine = Awaited<ReturnType<typeof getMagazines>>[number];

const getNewsletters = async () => {
  const data = await getData();
  return data.newsletters.map((newsletter) => ({
    type: contentType.newsletter,
    ...newsletter,
    fields: {
      ...newsletter.fields,
      category: newsletter.fields.category
        ? findReference(newsletter.fields.category, data.categories)
        : null,
      topics: newsletter.fields.topics
        ? findReference(newsletter.fields.topics, data.topics)
        : null,
    },
  }));
};

export type Newsletter = Awaited<ReturnType<typeof getNewsletters>>[number];

export const getAllResources = async () => {
  return [
    ...(await getBooks()),
    ...(await getThoughtleaders()),
    ...(await getArticles()),
    ...(await getCourses()),
    ...(await getPodcastEpisodes()),
    ...(await getPodcasts()),
    ...(await getVideos()),
    ...(await getTools()),
    ...(await getDirectories()),
    ...(await getCommunitiesAndOrganizations()),
    ...(await getExamplesAndCaseStudies()),
    ...(await getAgencies()),
    ...(await getSlides()),
    ...(await getMagazines()),
    ...(await getNewsletters()),
  ].sort((a, b) => {
    const itemA = 'title' in a.fields ? a.fields.title : a.fields.name;
    const itemB = 'title' in b.fields ? b.fields.title : b.fields.name;
    return itemA.localeCompare(itemB);
  });
};

export type Resources = Awaited<ReturnType<typeof getAllResources>>;
