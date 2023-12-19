import { ContentType } from 'data/resources/query';

export interface TrackingEvents {
  'Download Resources': null;
  'Resource Suggestion': null;
  'Copy Resource Link': {
    link: string;
  };
  'Open resource': {
    name: string;
    type: ContentType;
  };
  'Share Resource Link': {
    link: string;
  };
  'Like resource': {
    name: string;
    type: ContentType;
  };
  'Un-like resource': {
    name: string;
    type: ContentType;
  };
  'Comment Added': {
    id: number;
    type: ContentType;
  };
  'Uncaught error': {
    message: string;
  };
  'Newsletter Signup': null;
  'Filter resources by type': {
    type: string;
  };
  'Filter resources by category': {
    category: string;
  };
  'Filter resources by topic': {
    topic: string;
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
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    splitbee.track(event, data);
  }
  if (process.env.NODE_ENV === 'development') {
    console.info('Tracking event:', {
      event,
      data,
    });
  }
};
