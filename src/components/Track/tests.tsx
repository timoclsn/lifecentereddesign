import { Track } from './Track';

const Test1 = <Track event="Recommended resource clicked">Test</Track>;

const Test2 = (
  <Track
    event="Recommended resource clicked"
    // @ts-expect-error
    data={{
      test: 'test',
    }}
  >
    Test
  </Track>
);

const Test3 = (
  <Track
    event="Filter resources by category"
    data={{
      id: 1,
    }}
  >
    Test
  </Track>
);

// @ts-expect-error
const Test4 = <Track event="Filter resources by category">Test</Track>;
