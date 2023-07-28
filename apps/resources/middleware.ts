import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/resources',
    '/imprint',
    '/privacy',
    '/_hive/i',
    '/_hive/t',
    '/_hive/end',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
