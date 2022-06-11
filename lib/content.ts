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

interface Book {
  id: string;
  Title: string;
  Authors?: string[];
  Category?: string[];
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
    ...book,
    ...(book.Author && {
      Authors: findReference(book.Authors, data.thoughtleaders),
    }),
    ...(book.Category && {
      Categorys: findReference(book.Category, data.categories),
    }),
    ...(book.Topics && {
      Topics: findReference(book.Topics, data.topics),
    }),
  }));
};

interface Article {
  id: string;
  Title: string;
  'Author(s)'?: string[];
  Category?: string[];
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

interface Thoughtleaders {
  id: string;
  Name: string;
  'Job/Description': string;
  Category?: string[];
  'Link Title': string;
  Link: string;
  Books: string[];
  'Article(s)': string[];
  'Podcast Episode(s)': string[];
  'Video(s)': string[];
  Podcasts: string[];
}

export const getThoughtleaders = async (): Promise<Thoughtleaders[]> => {
  const data = await getData();
  return data.thoughtleaders.map((article) => ({
    ...article,
    ...(article.Category && {
      Category: findReference(article.Category, data.categories),
    }),
    ...(article.Books && {
      Books: findReference(article.Books, data.books),
    }),
    ...(article['Article(s)'] && {
      'Article(s)': findReference(article['Article(s)'], data.articles),
    }),
    ...(article['Podcast Episode(s)'] && {
      'Podcast Episode(s)': findReference(
        article['Podcast Episode(s)'],
        data.podcastEpisodes
      ),
    }),
    ...(article['Video(s)'] && {
      'Video(s)': findReference(article['Video(s)'], data.videos),
    }),
    ...(article.Podcasts && {
      Podcasts: findReference(article.Podcasts, data.podcasts),
    }),
  }));
};

interface PodcastEpisodes {
  id: string;
  Title: string;
  Podcast: string;
  Category: string[];
  Date: string;
  Duration: string;
  'Podcast = relevant': string[];
  Guest: string[];
  Link: string;
  Topics?: string[];
  Image: string[];
  Description: string;
  Rating: number;
  'Personal Note': string;
}

export const getPodcastEpisodes = async (): Promise<PodcastEpisodes[]> => {
  const data = await getData();
  return data.podcastEpisodes.map((podcastEpisode) => ({
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

interface Podcasts {
  id: string;
  Name: string;
  'Host(s)': string[];
  'Link Title': string;
  Link: string;
  Category: string[];
  'Host(s) = Thoughtleader(s)': string[];
  'Podcast Episodes': string[];
  Description: string;
  'Podcast Episodes 2': string[];
}

export const getPodcasts = async (): Promise<Podcasts[]> => {
  const data = await getData();
  return data.podcasts.map((podcast) => ({
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

interface Directories {
  id: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category: string[];
}

export const getDirectories = async (): Promise<Directories[]> => {
  const data = await getData();
  return data.directories.map((directory) => ({
    ...directory,
    ...(directory.Category && {
      Category: findReference(directory.Category, data.categories),
    }),
  }));
};

interface Videos {
  id: string;
  Title: string;
  Toughtleader: string[];
  Category: string[];
  'Link Title': string;
  Link: string;
  Date: string;
  Duration: number;
  Image: string[];
  Description: string;
  Rating: number;
  'Personal Note': string;
}

export const getVideos = async (): Promise<Videos[]> => {
  const data = await getData();
  return data.videos.map((video) => ({
    ...video,
    ...(video.Category && {
      Category: findReference(video.Category, data.categories),
    }),
    ...(video.Thoughtleader && {
      Thoughtleader: findReference(video.Thoughtleader, data.thoughtleaders),
    }),
  }));
};

interface Tools {
  id: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category: string[];
}

export const getTools = async (): Promise<Tools[]> => {
  const data = await getData();
  return data.tools.map((tool) => ({
    ...tool,
    ...(tool.Category && {
      Category: findReference(tool.Category, data.categories),
    }),
  }));
};

interface CommunitiesAndOrganizations {
  id: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category: string[];
}

export const getCommunitiesAndOrganizations = async (): Promise<
  CommunitiesAndOrganizations[]
> => {
  const data = await getData();
  return data.communitiesAndOrganizations.map((communityOrOrganization) => ({
    ...communityOrOrganization,
    ...(communityOrOrganization.Category && {
      Category: findReference(
        communityOrOrganization.Category,
        data.categories
      ),
    }),
  }));
};

interface Courses {
  id: string;
  Name: string;
  Description: string;
  'Link Title': string;
  Link: string;
  Category: string[];
}

export const getCourses = async (): Promise<Courses[]> => {
  const data = await getData();
  return data.courses.map((course) => ({
    ...course,
    ...(course.Category && {
      Category: findReference(course.Category, data.categories),
    }),
  }));
};
