"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PubsubModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubsubModule = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const common_1 = require("@nestjs/common");
const pubsub_constants_1 = require("./pubsub.constants");
function getClient(options) {
    return new pubsub_1.PubSub(options);
}
function createProvider(options) {
    return {
        provide: pubsub_constants_1.PUBSUB_TOKEN,
        useValue: getClient(options),
    };
}
function createAsyncOptionsProvider({ inject, useFactory, useClass, useExisting, }) {
    if (useFactory) {
        return {
            provide: pubsub_constants_1.PUBSUB_MODULE,
            useFactory,
            inject,
        };
    }
    return {
        provide: pubsub_constants_1.PUBSUB_MODULE,
        inject: useExisting ? [useExisting] : useClass ? [useClass] : [],
        useFactory: (f) => f.createOptions(),
    };
}
function createAsyncProviders(options) {
    if (options.useExisting || options.useFactory) {
        return [createAsyncOptionsProvider(options)];
    }
    return [
        createAsyncOptionsProvider(options),
        {
            provide: options.useClass,
            useClass: options.useClass,
            inject: [options.inject ?? []],
        },
    ];
}
let PubsubModule = PubsubModule_1 = class PubsubModule {
    static forRoot(options) {
        const provider = createProvider(options);
        return {
            module: PubsubModule_1,
            exports: [provider],
            providers: [provider],
        };
    }
    static forRootAsync(options) {
        const provider = {
            inject: [pubsub_constants_1.PUBSUB_MODULE],
            provide: pubsub_constants_1.PUBSUB_TOKEN,
            useFactory: (options) => getClient(options),
        };
        return {
            exports: [provider],
            imports: options.imports,
            module: PubsubModule_1,
            providers: [...createAsyncProviders(options), provider],
        };
    }
};
PubsubModule = PubsubModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], PubsubModule);
exports.PubsubModule = PubsubModule;
