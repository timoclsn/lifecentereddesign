import { UilLinkAlt } from '@iconscout/react-unicons';
import { Course } from '../lib/content';
import { Card } from './Card';

interface Props {
  course: Course;
}

export const CourseCard = ({ course }: Props) => {
  return (
    <Card
      variant="course"
      title={course.Name}
      category={course.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: course['Link Title'],
          url: course.Link,
        },
      ]}
      showType
    />
  );
};
