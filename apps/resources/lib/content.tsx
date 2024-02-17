import { readFile } from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import { z } from 'zod';
import path from 'path';
import Link from 'next/link';
import { HTMLProps } from 'react';

const frontmatteSchemas = {
  page: z.object({
    title: z.string(),
  }),
};

type ContentType = keyof typeof frontmatteSchemas;

interface Options {
  type: ContentType;
  name: string;
}

export const getContent = async (options: Options) => {
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
      a: ({ children, href }: HTMLProps<HTMLAnchorElement>) => {
        if (!href) return null;
        return <Link href={href}>{children}</Link>;
      },
    },
    options: { parseFrontmatter: true },
  });

  const parsedFrontmatter = frontmatteSchemas[type].parse(frontmatter);

  return { ...parsedFrontmatter, body: content };
};
