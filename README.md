# nestjs-cloud-pubsub

![Actions Status](https://github.com/caddijp/nestjs-cloud-pubsub/workflows/Node%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/caddijp/nestjs-cloud-pubsub/badge.svg?branch=main)](https://coveralls.io/github/caddijp/nestjs-cloud-pubsub?branch=main)

The [@google-cloud/pubsub](https://github.com/googleapis/nodejs-pubsub) NestJS module

# Install

```bash
npm install nestjs-cloud-pubsub @google-cloud/pubsub
```

## Usage

```typescript
@Module({
  imports: [PubsubModule.forRoot({})],
})
export class AppModule {}
```

Inject Pubsub instance

```typescript
@Injectable()
export class AppService {
  constructor(
    @InjectPubsub()
    private readonly pubsub: Pubsub
  ) {}
}
```

## Contributing

PRs accepted.

## License

[MIT](https://github.com/caddijp/nestjs-cloud-pubsub/blob/master/LICENSE) © CADDi Co.,Ltd
