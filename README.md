# nestjs-pubsub

![Actions Status](https://github.com/caddijp/nestjs-pubsub/workflows/Node%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/caddijp/nestjs-pubsub/badge.svg?branch=chore/setup_actions)](https://coveralls.io/github/caddijp/nestjs-pubsub?branch=chore/setup_actions)

The [@google-cloud/pubsub](https://github.com/googleapis/nodejs-pubsub) NestJS module

# Install

```bash
npm install nestjs-pubsub @google-cloud/pubsub
```

## Usage

```typescript
@Module({
  imports: [SlackModule.forRoot({})],
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

[MIT](https://github.com/caddijp/nestjs-pubsub/blob/master/LICENSE) © CADDi Co.,Ltd
