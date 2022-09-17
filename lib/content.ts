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

const imageSchema = z.array(
  z.object({
    width: z.number(),
    height: z.number(),
    url: z.string().url(),
  })
);

const bookSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Title: z.string(),
    Authors: referenceSchema.optional(),
    Category: referenceSchema.optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Topics: referenceSchema.optional(),
    'Publishing Date': dateSchema.optional(),
    Publisher: z.string().optional(),
    ISBN: z.string().optional(),
    Description: z.string().optional(),
    Image: imageSchema.optional(),
    Rating: z.number().optional(),
    'Personal Note': z.string().optional(),
  }),
});

type BookSchema = z.infer<typeof bookSchema>;

const articleSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Title: z.string(),
    'Author(s)': referenceSchema.optional(),
    Category: referenceSchema.optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Topics: referenceSchema.optional(),
    Date: dateSchema.optional(),
    Duration: z.number().optional(),
    Image: imageSchema.optional(),
    Description: z.string().optional(),
    Rating: z.number().optional(),
    'Personal Note': z.string().optional(),
  }),
});

type ArticleSchema = z.infer<typeof articleSchema>;

const thoughtleaderSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    'Job/Description': z.string().optional(),
    Category: referenceSchema.optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Books: referenceSchema.optional(),
    'Article(s)': referenceSchema.optional(),
    'Podcast Episode(s)': referenceSchema.optional(),
    'Video(s)': referenceSchema.optional(),
    Podcasts: referenceSchema.optional(),
  }),
});

type ThoughtleaderSchema = z.infer<typeof thoughtleaderSchema>;

const categorySchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    Description: z.string().optional(),
    Books: referenceSchema.optional(),
    Thoughtleaders: referenceSchema.optional(),
    Articles: referenceSchema.optional(),
    'Podcast Episodes': referenceSchema.optional(),
    Podcasts: referenceSchema.optional(),
    Studies: z.string().optional(),
    Directories: referenceSchema.optional(),
    Organizations: z.string().optional(),
    Videos: referenceSchema.optional(),
    'Directories copy': referenceSchema.optional(),
    'Tools copy': referenceSchema.optional(),
    'Communities, Associations, Organizations copy': referenceSchema.optional(),
  }),
});

type CategorySchema = z.infer<typeof categorySchema>;

const topicSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    Books: referenceSchema.optional(),
    Articles: referenceSchema.optional(),
    'Articles, Podcastepisodes & Videos copy': referenceSchema.optional(),
    'Podcast Episodes copy': z.string().optional(),
  }),
});

type TopicSchema = z.infer<typeof topicSchema>;

const podcastepisodeSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Title: z.string(),
    Podcast: z.string().optional(),
    Date: dateSchema.optional(),
    Duration: z.number().optional(),
    Category: referenceSchema.optional(),
    'Podcast = relevant': referenceSchema.optional(),
    Guest: referenceSchema.optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Topics: referenceSchema.optional(),
    Image: imageSchema.optional(),
    Description: z.string().optional(),
    Rating: z.number().optional(),
    'Personal Note': z.string().optional(),
  }),
});

type PodcastepisodeSchema = z.infer<typeof podcastepisodeSchema>;

const podcastSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    'Host(s)': z.array(z.string()).optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Category: referenceSchema.optional(),
    'Host(s) = Thoughtleader(s)': referenceSchema.optional(),
    'Podcast Episodes': z.string().optional(),
    Description: z.string().optional(),
    'Podcast Episodes 2': referenceSchema.optional(),
  }),
});

type PodcastSchema = z.infer<typeof podcastSchema>;

const directorySchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    Description: z.string().optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Category: referenceSchema.optional(),
  }),
});

type DirectorySchema = z.infer<typeof directorySchema>;

const videoSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Title: z.string(),
    Thoughtleader: referenceSchema.optional(),
    Category: referenceSchema.optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Date: dateSchema.optional(),
    Duration: z.number().optional(),
    Image: imageSchema.optional(),
    Description: z.string().optional(),
    Rating: z.number().optional(),
    'Personal Note': z.string().optional(),
  }),
});

type VideoSchema = z.infer<typeof videoSchema>;

const toolSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    Description: z.string().optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Category: referenceSchema.optional(),
  }),
});

type ToolSchema = z.infer<typeof toolSchema>;

const communityOrOrganizationSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    Description: z.string().optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Category: referenceSchema.optional(),
  }),
});

type CommunityOrOrganizationSchema = z.infer<
  typeof communityOrOrganizationSchema
>;

const courseSchema = z.object({
  id: z.string(),
  createdTime: dateTimeSchema,
  fields: z.object({
    Name: z.string(),
    Description: z.string().optional(),
    'Link Title': z.string().optional(),
    Link: z.string().url().optional(),
    Category: referenceSchema.optional(),
  }),
});

type CourseSchema = z.infer<typeof courseSchema>;

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
};

const getData = async () => {
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
    communitiesAndOrganizations,
    courses,
  ] = await Promise.all([
    getAllRecordsFromTable('Books'),
    getAllRecordsFromTable('Articles'),
    getAllRecordsFromTable('Thoughtleaders'),
    getAllRecordsFromTable('Categories'),
    getAllRecordsFromTable('Topics'),
    getAllRecordsFromTable('Podcast Episodes'),
    getAllRecordsFromTable('Podcasts'),
    getAllRecordsFromTable('Directories'),
    getAllRecordsFromTable('Videos'),
    getAllRecordsFromTable('Communities & Organizations'),
    getAllRecordsFromTable('Courses'),
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
  const tools = await getAllRecordsFromTable('Tools');
  const parsedTools = z.array(toolSchema).parse(tools);
  const parsedCommunitiesAndOrganizations = z
    .array(communityOrOrganizationSchema)
    .parse(communitiesAndOrganizations);
  const parsedCourses = z.array(courseSchema).parse(courses);

  if (!dataStore) {
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
    };
  }
  return dataStore;
};

const findReference = <
  TObj extends {
    id: string;
    [key: string]: any;
  }
>(
  ids: Array<string>,
  data: Array<TObj>
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
} as const;

export type ContentType = keyof typeof contentType;

const getBooks = async () => {
  const data = await getData();
  return data.books.map((book) => ({
    type: contentType.book,
    ...book,
    fields: {
      ...book.fields,
      Authors: book.fields.Authors
        ? findReference(book.fields.Authors, data.thoughtleaders)
        : null,
      Category: book.fields.Category
        ? findReference(book.fields.Category, data.categories)
        : null,
      Topics: book.fields.Topics
        ? findReference(book.fields.Topics, data.topics)
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
      'Author(s)': article.fields['Author(s)']
        ? findReference(article.fields['Author(s)'], data.thoughtleaders)
        : null,
      Category: article.fields.Category
        ? findReference(article.fields.Category, data.categories)
        : null,
      Topics: article.fields.Topics
        ? findReference(article.fields.Topics, data.topics)
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
      Category: thoughtleader.fields.Category
        ? findReference(thoughtleader.fields.Category, data.categories)
        : null,
      Books: thoughtleader.fields.Books
        ? findReference(thoughtleader.fields.Books, data.books)
        : null,
      'Article(s)': thoughtleader.fields['Article(s)']
        ? findReference(thoughtleader.fields['Article(s)'], data.articles)
        : null,
      'Podcast Episode(s)': thoughtleader.fields['Podcast Episode(s)']
        ? findReference(
            thoughtleader.fields['Podcast Episode(s)'],
            data.podcastEpisodes
          )
        : null,
      'Video(s)': thoughtleader.fields['Video(s)']
        ? findReference(thoughtleader.fields['Video(s)'], data.videos)
        : null,
      Podcasts: thoughtleader.fields.Podcasts
        ? findReference(thoughtleader.fields.Podcasts, data.podcasts)
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
      Category: podcastEpisode.fields.Category
        ? findReference(podcastEpisode.fields.Category, data.categories)
        : null,
      'Podcast = relevant': podcastEpisode.fields['Podcast = relevant']
        ? findReference(
            podcastEpisode.fields['Podcast = relevant'],
            data.podcasts
          )
        : null,
      Guest: podcastEpisode.fields.Guest
        ? findReference(podcastEpisode.fields.Guest, data.thoughtleaders)
        : null,
      Topics: podcastEpisode.fields.Topics
        ? findReference(podcastEpisode.fields.Topics, data.topics)
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
      Category: podcast.fields.Category
        ? findReference(podcast.fields.Category, data.categories)
        : null,
      'Host(s) = Thoughtleader(s)': podcast.fields['Host(s) = Thoughtleader(s)']
        ? findReference(
            podcast.fields['Host(s) = Thoughtleader(s)'],
            data.thoughtleaders
          )
        : null,
      'Podcast Episodes 2': podcast.fields['Podcast Episodes 2']
        ? findReference(
            podcast.fields['Podcast Episodes 2'],
            data.podcastEpisodes
          )
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
      Category: directory.fields.Category
        ? findReference(directory.fields.Category, data.categories)
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
      Category: video.fields.Category
        ? findReference(video.fields.Category, data.categories)
        : null,
      Thoughtleader: video.fields.Thoughtleader
        ? findReference(video.fields.Thoughtleader, data.thoughtleaders)
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
      Category: tool.fields.Category
        ? findReference(tool.fields.Category, data.categories)
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
      Category: communityOrOrganization.fields.Category
        ? findReference(
            communityOrOrganization.fields.Category,
            data.categories
          )
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
      Category: course.fields.Category
        ? findReference(course.fields.Category, data.categories)
        : null,
    },
  }));
};

export type Course = Awaited<ReturnType<typeof getCourses>>[number];

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
  ].sort((a, b) => {
    const itemA = 'Title' in a.fields ? a.fields.Title : a.fields.Name;
    const itemB = 'Title' in b.fields ? b.fields.Title : b.fields.Name;
    return itemA.localeCompare(itemB);
  });
};

export type Resources = Awaited<ReturnType<typeof getAllResources>>;
