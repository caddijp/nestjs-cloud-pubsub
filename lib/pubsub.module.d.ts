import { ClientConfig } from '@google-cloud/pubsub';
import { DynamicModule } from '@nestjs/common';
import { PubsubAsyncOptions } from './pubsub.interface';
export declare class PubsubModule {
    static forRoot(options: ClientConfig): DynamicModule;
    static forRootAsync(options: PubsubAsyncOptions): DynamicModule;
}
