import { UilLinkAlt } from '@iconscout/react-unicons';
import { ExampleOrCaseStudy } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  exampleOrCaseStudy: ExampleOrCaseStudy;
}

export const ExampleOrCaseStudyCard = ({ exampleOrCaseStudy }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      variant="lime"
      type="Example or Case Study"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType:
                  filteredType === 'exampleOrCaseStudy'
                    ? 'all'
                    : 'exampleOrCaseStudy',
              });
            }
          : undefined
      }
      title={exampleOrCaseStudy.fields.name}
      category={exampleOrCaseStudy.fields.category?.at(0)?.fields.name}
      tags={[
        ...(exampleOrCaseStudy.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(exampleOrCaseStudy.fields.link),
                url: exampleOrCaseStudy.fields.link,
              },
            ]
          : []),
      ]}
      description={exampleOrCaseStudy.fields.description}
      showType
    />
  );
};
