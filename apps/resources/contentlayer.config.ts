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

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Page],
});
