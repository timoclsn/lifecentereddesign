import { Resource } from 'data/resources/query';
import { Card } from 'design-system';

interface Props {
  resource: Resource;
}

export const ResourceCard = ({ resource }: Props) => {
  return (
    <Card>
      <div>{resource.name}</div>
    </Card>
  );
};
