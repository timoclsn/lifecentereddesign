import { UilLinkAlt } from '@iconscout/react-unicons';
import { Course } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from 'design-system';

interface Props {
  course: Course;
}

export const CourseCard = ({ course }: Props) => {
  return (
    <Card
      variant="evening"
      type="Course"
      title={course.fields.Name}
      category={course.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(course.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(course.fields.Link),
                url: course.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
