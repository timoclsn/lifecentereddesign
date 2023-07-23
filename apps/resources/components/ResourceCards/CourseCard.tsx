'use client';

import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Course } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../ResourcesTable';

interface Props {
  course: Course;
}

export const CourseCard = ({ course }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={course.id}
      resourceType={course.type}
      variant="evening"
      displayType="Course"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'course',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: course.category?.name,
              });
            }
          : undefined
      }
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
