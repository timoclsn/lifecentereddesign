import { ContentType } from './resources';

interface TrackingEvents {
  'Download Resources': {};
  'Resource Suggestion': {};
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
  'Newsletter Signup': {};
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
  'Toggle filter resources by likes': {};
  'Toggle filter resources by comments': {};
  'Show more resources': {
    count: number;
  };
  'Open CO2 Badge': {};
}

export const track = <TEventKey extends keyof TrackingEvents>(
  event: TEventKey,
  data: TrackingEvents[TEventKey],
) => {
  splitbee.track(event, data);
};
