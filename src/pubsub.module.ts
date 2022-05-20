import { ClientConfig, PubSub } from '@google-cloud/pubsub';
import {
  ClassProvider,
  DynamicModule,
  Global,
  Module,
  Provider,
} from '@nestjs/common';
import { PUBSUB_MODULE, PUBSUB_TOKEN } from './pubsub.constants';
import { PubsubAsyncOptions, PubsubOptionsFactory } from './pubsub.interface';

function getClient(options: ClientConfig) {
  return new PubSub(options);
}

function createProvider(options: ClientConfig): Provider<PubSub> {
  return {
    provide: PUBSUB_TOKEN,
    useValue: getClient(options),
  };
}

function createAsyncOptionsProvider({
  inject,
  useFactory,
  useClass,
  useExisting,
}: PubsubAsyncOptions): Provider {
  if (useFactory) {
    return {
      provide: PUBSUB_MODULE,
      useFactory,
      inject,
    };
  }

  return {
    provide: PUBSUB_MODULE,
    inject: useExisting ? [useExisting] : useClass ? [useClass] : [],
    useFactory: (f: PubsubOptionsFactory) => f.createOptions(),
  };
}

function createAsyncProviders(options: PubsubAsyncOptions): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider(options)];
  }
  return [
    createAsyncOptionsProvider(options),
    {
      provide: options.useClass,
      useClass: options.useClass,
      inject: [options.inject ?? []],
    } as ClassProvider,
  ];
}

@Global()
@Module({})
export class PubsubModule {
  static forRoot(options: ClientConfig): DynamicModule {
    const provider = createProvider(options);
    return {
      module: PubsubModule,
      exports: [provider],
      providers: [provider],
    };
  }

  static forRootAsync(options: PubsubAsyncOptions): DynamicModule {
    const provider: Provider<PubSub> = {
      inject: [PUBSUB_MODULE],
      provide: PUBSUB_TOKEN,
      useFactory: (options: ClientConfig) => getClient(options),
    };

    return {
      exports: [provider],
      imports: options.imports,
      module: PubsubModule,
      providers: [...createAsyncProviders(options), provider],
    };
  }
}
