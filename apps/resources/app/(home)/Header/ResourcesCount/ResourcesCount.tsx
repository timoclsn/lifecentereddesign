import { query } from 'api/query';
import { Await } from 'components/Await/Await';
import { cx } from 'cva';
import { ResourcesCountClient } from './ResourcesCountClient';
import { countStyles } from './utils';

export const ResourcesCount = () => {
  const promise = query.resources.getResourcesCount();
  return (
    <Await promise={promise} loading={<Loading />} error={null}>
      {(count) => {
        return <ResourcesCountClient>{count}</ResourcesCountClient>;
      }}
    </Await>
  );
};

const Loading = () => {
  return <span className={cx(countStyles, 'animate-pulse')}>000</span>;
};
