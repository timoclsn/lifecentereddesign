import { readFile, readdir } from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import path from 'path';
import { cache } from 'react';
import { z } from 'zod';

const CONTENT_PATH = ['content'] as const;
const FILE_EXTENSIONS = ['.md', '.mdx'] as const;

const frontmatterSchemas = {
  page: z.object({
    title: z.string(),
  }),
};

type ContentType = keyof typeof frontmatterSchemas;

/**
 * Retrieves content of a specific type and name.
 * @param type The type of content.
 * @param name The name of the content.
 * @returns An object containing the name, parsed frontmatter, content, and raw file data.
 * @throws Error if no content file is found for the specified type and name.
 */

const getContent = async <Type extends ContentType>(
  type: Type,
  name: string,
) => {
  const dirName = name;

  // Get file name for content file
  const dirPath = path.join(process.cwd(), ...CONTENT_PATH, type, dirName);
  const fileNames = await readdir(dirPath);
  const fileName = fileNames.find((name) =>
    FILE_EXTENSIONS.some((extention) => path.extname(name) === extention),
  );
  if (!fileName) {
    throw new Error(`No content file found for ${type}/${dirName}`);
  }

  // Read file and compile MDX
  const filePath = path.join(
    process.cwd(),
    ...CONTENT_PATH,
    type,
    dirName,
    fileName,
  );
  const file = await readFile(filePath, 'utf8');
  const { content, frontmatter } = await compileMDX({
    source: file,
    components: {
      a: ({ children, href }) => {
        return <Link href={href ?? ''}>{children}</Link>;
      },
    },
    options: { parseFrontmatter: true },
  });

  // Parse frontmatter
  const parsedFrontmatter = frontmatterSchemas[type].parse(
    frontmatter,
  ) as z.output<(typeof frontmatterSchemas)[Type]>;

  return {
    name: dirName,
    data: parsedFrontmatter,
    content,
    raw: file,
  };
};

/**
 * Retrieves all content of a specific type.
 *
 * @param type The type of content to retrieve.
 * @returns A promise that resolves to an array of content items.
 */

const getAllContent = async <Type extends ContentType>(type: Type) => {
  // Get content names
  const dirPath = path.join(process.cwd(), ...CONTENT_PATH, type);
  const dirNames = await readdir(dirPath);

  return await Promise.all(
    dirNames.map(async (name) => {
      return await getContent(type, name);
    }),
  );
};

const getContentCached = cache(getContent);
const getAllContentCached = cache(getAllContent);

export { getAllContentCached as getAllContent, getContentCached as getContent };
