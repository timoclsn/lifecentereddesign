import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Course } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  course: Course;
}

export const CourseCard = ({ course }: Props) => {
  return (
    <Card
      resourceId={course.id}
      resourceType={course.type}
      variant="evening"
      displayType="Course"
      title={course.name}
      metaInfos={[
        ...(course.topics.length
          ? [
              {
                text: course.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={course.category?.name}
      tags={[
        ...(course.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(course.link),
                url: course.link,
              },
            ]
          : []),
      ]}
      description={course.description}
      suggestion={course.suggestion}
      note={course.note}
      showType
    />
  );
};
