import { UilLinkAlt } from '@iconscout/react-unicons';
import { Course } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  course: Course;
}

export const CourseCard = ({ course }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
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
                type: 'FILTER',
                filterType: filteredType === 'course' ? 'all' : 'course',
              });
            }
          : undefined
      }
      title={course.name}
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
      showType
    />
  );
};
