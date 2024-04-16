const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const NODE_ENV = process.env.NODE_ENV;

export interface TrackingEvents {
  'Download Resources': null;
  'Resource Suggestion': null;
  'Copy Resource Link': {
    id: string;
    link: string;
  };
  'Open resource': {
    id: string;
  };
  'Share Resource Link': {
    id: string;
    link: string;
  };
  'Like resource': {
    id: string;
  };
  'Un-like resource': {
    id: string;
  };
  'Comment Added': {
    id: string;
  };
  'Uncaught error': {
    message: string;
  };
  'Newsletter Signup': null;
  'Filter resources by type': {
    id: number;
  };
  'Filter resources by category': {
    id: number;
  };
  'Filter resources by topic': {
    id: number;
  };
  'Sort resources': {
    by: string;
  };
  'Toggle filter resources by likes': null;
  'Toggle filter resources by comments': null;
  'Show more resources': {
    count: number;
  };
  'Open CO2 Badge': null;
  'Related resource clicked': null;
  'New resource clicked': null;
}

export const track = <TEventKey extends keyof TrackingEvents>(
  ...args: TrackingEvents[TEventKey] extends null
    ? [event: TEventKey]
    : [event: TEventKey, data: TrackingEvents[TEventKey]]
) => {
  const [event, data] = args;
  if (NEXT_PUBLIC_VERCEL_ENV === 'production') {
    splitbee.track(event, data);
  }
  if (NODE_ENV === 'development') {
    console.info('Tracking event:', {
      event,
      data,
    });
  }
};
