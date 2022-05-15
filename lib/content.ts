import Airtable from 'airtable';

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

export const getAllRecordsFromTable = async (name: string) => {
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
