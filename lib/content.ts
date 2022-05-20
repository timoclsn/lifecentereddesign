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

export const getBooks = async () => {
  const books = await getAllRecordsFromTable('Books');
  const authors = await getAllRecordsFromTable('Thoughtleaders');
  const categories = await getAllRecordsFromTable('Categories');

  return books.map((book) => ({
    ...book,
    Authors: book.Authors.map(
      (authorId) => authors.find((author) => author.id === authorId).Name
    ),
    Category: book.Category.map(
      (categoryId) =>
        categories.find((category) => category.id === categoryId).Name
    ),
  }));
};
