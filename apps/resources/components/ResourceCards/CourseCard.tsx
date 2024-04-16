import { Course } from 'lib/resources';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { topicsList } from '../utils';

interface Props {
  course: Course;
  showPreview?: boolean;
}

export const CourseCard = ({ course, showPreview }: Props) => {
  return (
    <ResourceCard
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
      showPreview={showPreview}
    />
  );
};
