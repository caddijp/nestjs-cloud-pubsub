import { Inject } from '@nestjs/common';
import { PUBSUB_TOKEN } from './pubsub.constants';

export function InjectPubsub() {
  return Inject(PUBSUB_TOKEN);
}
