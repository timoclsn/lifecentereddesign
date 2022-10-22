import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/*.md',
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
  },
}));

const Member = defineDocumentType(() => ({
  name: 'Member',
  filePathPattern: 'members/*.md',
  contentType: 'markdown',
  fields: {
    name: {
      type: 'string',
      required: true,
    },
    linkedin: {
      type: 'string',
      required: false,
    },
    instagram: {
      type: 'string',
      required: false,
    },
  },
}));

const Principle = defineDocumentType(() => ({
  name: 'Principle',
  filePathPattern: 'principles/*.md',
  contentType: 'markdown',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Page, Member, Principle],
});
