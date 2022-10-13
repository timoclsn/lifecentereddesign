import { UilLinkAlt } from '@iconscout/react-unicons';
import { Course } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  course: Course;
}

export const CourseCard = ({ course }: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="evening"
      type="Course"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'course' });
      }}
      title={course.fields.name}
      category={course.fields.category?.at(0)?.fields.name}
      tags={[
        ...(course.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(course.fields.link),
                url: course.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
