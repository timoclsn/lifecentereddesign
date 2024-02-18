import { readFile, readdir } from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import path from 'path';
import { z } from 'zod';

const frontmatteSchemas = {
  page: z.object({
    title: z.string(),
  }),
};

type ContentType = keyof typeof frontmatteSchemas;

export const getContent = async <Type extends ContentType>(options: {
  type: Type;
  name: string;
}) => {
  const { type, name } = options;

  const filePath = path.join(
    process.cwd(),
    'public',
    'content',
    type,
    `${name}.md`,
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

  const parsedFrontmatter = frontmatteSchemas[type].parse(
    frontmatter,
  ) as z.output<(typeof frontmatteSchemas)[Type]>;

  return {
    name,
    data: parsedFrontmatter,
    content,
    raw: file,
  };
};

export const getAllContent = async <Type extends ContentType>(type: Type) => {
  const dirPath = path.join(process.cwd(), 'public', 'content', type);
  const fileNames = await readdir(dirPath);

  return await Promise.all(
    fileNames.map(async (fileName) => {
      const name = fileName.replace(/\.md$/, '');
      return await getContent({ type, name });
    }),
  );
};
