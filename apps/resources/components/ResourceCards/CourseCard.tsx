import { UilLinkAlt } from '@iconscout/react-unicons';
import { Course } from '../../lib/content';
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
      variant="evening"
      type="Course"
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
      description={course.fields.description}
      showType
    />
  );
};
