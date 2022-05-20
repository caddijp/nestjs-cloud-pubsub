import { ClientConfig } from '@google-cloud/pubsub';
import { ModuleMetadata, Type } from '@nestjs/common';

export interface PubsubOptionsFactory {
  createOptions(): Promise<ClientConfig> | ClientConfig;
}

export interface PubsubAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PubsubOptionsFactory>;
  useExisting?: Type<PubsubOptionsFactory>;
  useFactory?: (...arg: any[]) => Promise<ClientConfig> | ClientConfig;
}
