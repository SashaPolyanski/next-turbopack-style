import { createRoute } from '@/shared/lib/routing/createRoute';

export const ROUTE_BUILDER = {
  BASE: '/',
  COURSE_PROGRAM: createRoute('/course/program/:unitId/:publicationId'),
  WATCH: createRoute('/watch/:videoId'),
  SHORTS: createRoute('/shorts/:id'),
  ABOUT: '/about',
  PAST_EVENTS: '/past-events',
  EVENTS_CALENDAR: '/events-calendar',
  COURSES: '/courses',
  RECRUITMENT_CERTIFICATION: '/recruitment-certification',
  MAGAZINE: '/magazine',
  EVENT: createRoute('/event/:id'),
  LESSON: createRoute('/lesson/:unitId/:publicationId'),
  GUIDE: createRoute('/guides/:unitId/:publicationId'),
  INSIGHT: createRoute('/insight/:unitId/:publicationId'),
  TEST: createRoute('/test'),
  INTENSIVE: createRoute('/intensive/:id'),
  LOGIN: '/login',
  RECRUITMENT_GUIDE: '/recruitment-guide',
  RECRUITMENT_MANAGER: '/recruitment-manager',
};
