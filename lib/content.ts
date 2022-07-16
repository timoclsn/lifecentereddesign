import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

const getAllRecordsFromTable = async <TRecord>(
  name: string
): Promise<TRecord[]> => {
  const allRecords = [];

  await base(name)
    .select({})
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        allRecords.push(record);
      });
      fetchNextPage();
    });

  const allRecordsMinified = allRecords.map((record) => ({
    id: record.id,
    createdTime: record._rawJson.createdTime,
    ...record.fields,
  }));

  return allRecordsMinified;
};

let dataStore;
const getData = async () => {
  if (!dataStore) {
    dataStore = {
      books: await getAllRecordsFromTable('Books'),
      articles: await getAllRecordsFromTable('Articles'),
      thoughtleaders: await getAllRecordsFromTable('Thoughtleaders'),
      categories: await getAllRecordsFromTable('Categories'),
      topics: await getAllRecordsFromTable('Topics'),
      podcastEpisodes: await getAllRecordsFromTable('Podcast Episodes'),
      podcasts: await getAllRecordsFromTable('Podcasts'),
      directories: await getAllRecordsFromTable('Directories'),
      videos: await getAllRecordsFromTable('Videos'),
      tools: await getAllRecordsFromTable('Tools'),
      communitiesAndOrganizations: await getAllRecordsFromTable(
        'Communities & Organizations'
      ),
      courses: await getAllRecordsFromTable('Courses'),
    };
  }
  return dataStore;
};

const findReference = (ids: string[], data: any) =>
  ids.map((id) => data.find((date) => date.id === id));

type ContenType =
  | 'book'
  | 'article'
  | 'thoughtleader'
  | 'category'
  | 'topic'
  | 'podcastEpisode'
  | 'podcast'
  | 'directory'
  | 'video'
  | 'tool'
  | 'communityOrOrganization'
  | 'course';

type Category = Array<{ Name: string }>;

export interface Book {
  type: ContenType;
  id: string;
  createdTime: string;
  Title: string;
  Authors?: Array<{ Name: string }>;
  Category?: Category;
  'Link Title': string;
  Link: string;
  'Publishing Date': string;
  Publisher: string;
  ISBN: string;
  Description: string;
  Image: string[];
  Rating: number;
  'Personal Note': string;
  Topics?: string[];
}

export const getBooks = async (): Promise<Book[]> => {
  const data = await getData();
  return data.books.map((book) => ({
    type: 'book',
    ...book,
    ...(book.Authors && {
      Authors: findReference(book.Authors, data.thoughtleaders),
    }),
    ...(book.Category && {
      Category: findReference(book.Category, data.categories),
    }),
    ...(book.Topics && {
      Topics: findReference(book.Topics, data.topics),
    }),
  }));
};

export interface Article {
  type: ContenType;
  id: string;
  createdTime: string;
  Title: string;
  'Author(s)'?: Array<{ Name: string }>;
  Category?: Category;
  'Link Title': string;
  Link: string;
  Date: string;
  Duration: number;
  Topics?: string[];
  Image: string[];
  Description: string;
  Rating: number;
  'Personal Note': string;
}

export const getArticles = async (): Promise<Article[]> => {
  const data = await getData();
  return data.articles.map((article) => ({
    type: 'article',
    ...article,
    ...(article['Author(s)'] && {
      'Author(s)': findReference(article['Author(s)'], data.thoughtleaders),
    }),
    ...(article.Category && {
      Category: findReference(article.Category, data.categories),
    }),
    ...(article.Topics && {
      Topics: findReference(article.Topics, data.topics),
    }),
  }));
};

export interface Thoughtleader {
  type: ContenType;
  id: string;
  createdTime: string;
  Name: string;
  'Job/Description': string;
  Category?: Category;
  'Link Title': string;
  Link: string;
  Books: string[];
  'Article(s)': string[];
  'Podcast Episode(s)': string[];
  'Video(s)': string[];
  Podcasts: string[];
}

export const getThoughtleaders = async (): Promise<Thoughtleader[]> => {
  const data = await getData();
  return data.thoughtleaders.map((thoughtleader) => ({
    type: 'thoughtleader',
    ...thoughtleader,
    ...(thoughtleader.Category && {
      Category: findReference(thoughtleader.Category, data.categories),
    }),
    ...(thoughtleader.Books && {
      Books: findReference(thoughtleader.Books, data.books),
    }),
    ...(thoughtleader['Article(s)'] && {
      'Article(s)': findReference(thoughtleader['Article(s)'], data.articles),
    }),
    ...(thoughtleader['Podcast Episode(s)'] && {
      'Podcast Episode(s)': findReference(
        thoughtleader['Podcast Episode(s)'],
        data.podcastEpisodes
      ),
    }),
    ...(thoughtleader['Video(s)'] && {
      'Video(s)': findReference(thoughtleader['Video(s)'], data.videos),
    }),
    ...(thoughtleader.Podcasts && {
      Podcasts: findReference(thoughtleader.Podcasts, data.podcasts),
    }),
  }));
};

export interface PodcastEpisode {
  type: ContenType;
  id: string;
  createdTime: string;
  Title: string;
  Podcast: string;
  Category?: Category;
  Date: string;
  Duration: number;
  'Podcast = relevant': string[];
  Guest?: Array<{ Name: string }>;
  Link: string;
  Topics?: string[];
  Image: string[];
  Description: string;
  Rating: number;
  'Personal Note': string;
}

export const getPodcastEpisodes = async (): Promise<PodcastEpisode[]> => {
  const data = await getData();
  return data.podcastEpisodes.map((podcastEpisode) => ({
    type: 'podcastEpisode',
    ...podcastEpisode,
    ...(podcastEpisode.Category && {
      Category: findReference(podcastEpisode.Category, data.categories),
    }),
    ...(podcastEpisode['Podcast = relevant'] && {
      'Podcast = relevant': findReference(
        podcastEpisode['Podcast = relevant'],
        data.podcasts
      ),
    }),
    ...(podcastEpisode.Guest && {
      Guest: findReference(podcastEpisode.Guest, data.thoughtleaders),
    }),
    ...(podcastEpisode.Topics && {
      Topics: findReference(podcastEpisode.Topics, data.topics),
    }),
  }));
};

export interface Podcast {
  type: ContenType;
  id: string;
  createdTime: string;
  Name: string;
  'Host(s)': string[];
  'Link Title': string;
  Link: string;
  Category?: Category;
  'Host(s) = Thoughtleader(s)': string[];
  'Podcast Episodes': string[];
  Description: string;
  'Podcast Episodes 2': string[];
}

export const getPodcasts = async (): Promise<Podcast[]> => {
  const data = await getData();
  return data.podcasts.map((podcast) => ({
    type: 'podcast',
    ...podcast,
    ...(podcast.Category && {
      Category: findReference(podcast.Category, data.categories),
    }),
    ...(podcast['Host(s) = Thoughtleader(s)'] && {
      'Host(s) = Thoughtleader(s)': findReference(
        podcast['Host(s) = Thoughtleader(s)'],
        data.thoughtleaders
      ),
    }),
    ...(podcast['Podcast Episodes 2'] && {
      'Podcast Episodes 2': findReference(
        podcast['Podcast Episodes 2'],
        data.podcastEpisodes
      ),
    }),
  }));
};

export interface Directory {
  type: ContenType;
  id: string;
  createdTime: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category?: Category;
}

export const getDirectories = async (): Promise<Directory[]> => {
  const data = await getData();
  return data.directories.map((directory) => ({
    type: 'directory',
    ...directory,
    ...(directory.Category && {
      Category: findReference(directory.Category, data.categories),
    }),
  }));
};

export interface Video {
  type: ContenType;
  id: string;
  createdTime: string;
  Title: string;
  Thoughtleader?: Array<{ Name: string }>;
  Category?: Category;
  'Link Title': string;
  Link: string;
  Date: string;
  Duration: number;
  Image: string[];
  Description: string;
  Rating: number;
  'Personal Note': string;
}

export const getVideos = async (): Promise<Video[]> => {
  const data = await getData();
  return data.videos.map((video) => ({
    type: 'video',
    ...video,
    ...(video.Category && {
      Category: findReference(video.Category, data.categories),
    }),
    ...(video.Thoughtleader && {
      Thoughtleader: findReference(video.Thoughtleader, data.thoughtleaders),
    }),
  }));
};

export interface Tool {
  type: ContenType;
  id: string;
  createdTime: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category?: Category;
}

export const getTools = async (): Promise<Tool[]> => {
  const data = await getData();
  return data.tools.map((tool) => ({
    type: 'tool',
    ...tool,
    ...(tool.Category && {
      Category: findReference(tool.Category, data.categories),
    }),
  }));
};

export interface CommunityOrOrganization {
  type: ContenType;
  id: string;
  createdTime: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category?: Category;
}

export const getCommunitiesAndOrganizations = async (): Promise<
  CommunityOrOrganization[]
> => {
  const data = await getData();
  return data.communitiesAndOrganizations.map((communityOrOrganization) => ({
    type: 'communityOrOrganization',
    ...communityOrOrganization,
    ...(communityOrOrganization.Category && {
      Category: findReference(
        communityOrOrganization.Category,
        data.categories
      ),
    }),
  }));
};

export interface Course {
  type: ContenType;
  id: string;
  createdTime: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category?: Category;
}

export const getCourses = async (): Promise<Course[]> => {
  const data = await getData();
  return data.courses.map((course) => ({
    type: 'course',
    ...course,
    ...(course.Category && {
      Category: findReference(course.Category, data.categories),
    }),
  }));
};

export type Ressources = Array<
  | Book
  | Article
  | Thoughtleader
  | PodcastEpisode
  | Podcast
  | Directory
  | Video
  | Tool
  | CommunityOrOrganization
  | Course
>;
