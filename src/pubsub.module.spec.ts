import { ClientConfig } from '@google-cloud/pubsub';
import { Test } from '@nestjs/testing';
import { PubsubModule } from './pubsub.module';

describe('PubsubModule', () => {
  let module: PubsubModule;
  const options: ClientConfig = {
    projectId: 'test-project-id',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [PubsubModule],
    }).compile();

    module = moduleFixture.get(PubsubModule);
  });

  it('is defined', () => expect(module).toBeDefined());

  it('implements forRoot', () => {
    const res = PubsubModule.forRoot(options);

    expect(res.exports).toHaveLength(1);
    expect(res.imports).toBeUndefined();
    expect(res.module).toBeDefined();
    expect(res.providers).toHaveLength(1);
  });

  it('implements forRootAsync', () => {
    const res = PubsubModule.forRootAsync({});

    expect(res.exports).toMatchInlineSnapshot(`
      [
        {
          "inject": [
            "PUBSUB_MODULE",
          ],
          "provide": "PUBSUB_TOKEN",
          "useFactory": [Function],
        },
      ]
    `);
    expect(res.imports).toBeUndefined();
    expect(res.providers).toMatchInlineSnapshot(`
      [
        {
          "inject": [],
          "provide": "PUBSUB_MODULE",
          "useFactory": [Function],
        },
        {
          "inject": [
            [],
          ],
          "provide": undefined,
          "useClass": undefined,
        },
        {
          "inject": [
            "PUBSUB_MODULE",
          ],
          "provide": "PUBSUB_TOKEN",
          "useFactory": [Function],
        },
      ]
    `);
    expect(res.module).toBeDefined();
  });
});
