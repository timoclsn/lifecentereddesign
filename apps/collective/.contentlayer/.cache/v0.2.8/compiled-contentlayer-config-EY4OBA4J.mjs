// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "pages/*.md",
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Page]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-EY4OBA4J.mjs.map
