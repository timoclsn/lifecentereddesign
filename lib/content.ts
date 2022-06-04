import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

const getAllRecordsFromTable = async (name: string) => {
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

let dataStore: any = {};
const getData = async () => {
  if (!Object.keys(dataStore).length) {
    dataStore = {
      books: await getAllRecordsFromTable('Books'),
      articles: await getAllRecordsFromTable('Articles'),
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

export const getBooks = async () => {
  const data = await getData();
  return data.books.map((book) => ({
    ...book,
    Authors: book.Authors && findReference(book.Authors, data.thoughtleaders),
    Category: book.Category && findReference(book.Category, data.categories),
  }));
};
