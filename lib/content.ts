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

interface BookRaw {
  id: string;
  Authors: string[];
  Category: string[];
}

interface ArticleRaw {
  id: string;
  'Author(s)': string[];
  Category: string[];
}

let dataStore;
const getData = async () => {
  if (!dataStore) {
    dataStore = {
      books: await getAllRecordsFromTable<BookRaw>('Books'),
      articles: await getAllRecordsFromTable<ArticleRaw>('Articles'),
      thoughtleaders: await getAllRecordsFromTable('Thoughtleaders'),
      categories: await getAllRecordsFromTable('Categories'),
      topics: await getAllRecordsFromTable('Topics'),
      podcastEpisodes: await getAllRecordsFromTable('Podcast Episodes'),
      podcasts: await getAllRecordsFromTable('Podcasts'),
      directories: await getAllRecordsFromTable('Directories'),
      organizations: await getAllRecordsFromTable('Organizations'),
      videos: await getAllRecordsFromTable('Videos'),
      tools: await getAllRecordsFromTable('Tools'),
      communitiesAssociationsOrganizations: await getAllRecordsFromTable(
        'Communities, Associations, Organizations'
      ),
      courses: await getAllRecordsFromTable('Courses'),
    };
  }
  return dataStore;
};

const findReference = (ids: string[], data: any) =>
  ids.map((id) => data.find((date) => date.id === id).Name);

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
