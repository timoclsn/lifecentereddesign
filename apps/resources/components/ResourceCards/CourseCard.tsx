import { Link, Tag } from 'lucide-react';
import { Course } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

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
                text: topicsList(course.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={course.category?.name}
      tags={[
        ...(course.link
          ? [
              {
                icon: Link,
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
