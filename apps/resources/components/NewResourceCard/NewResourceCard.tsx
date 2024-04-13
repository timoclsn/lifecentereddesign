import { NewResource } from 'data/resources/query';
import { Card } from 'design-system';

interface Props {
  resource: NewResource;
}

export const NewResourceCard = ({ resource }: Props) => {
  return (
    <Card>
      <div>{resource.name}</div>
    </Card>
  );
};
