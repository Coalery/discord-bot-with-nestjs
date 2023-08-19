## discord-bot-with-nestjs

NestJS로 디스코드 봇을 만듭니다. 컨트롤러를 통해 명령어를 처리합니다.

### Inspiration

본 레포지토리는 NestJS Korea의 NestJS 밋업, ["야너두 NestJS!"](https://nestjs-korea.notion.site/3rd-NestJS-wrap-up-1bd4e5cf44f94797a0645316ac431f3b)의 세 번째 발표인 [`Lets NestJS Anything`](https://youtu.be/IsX1vgWYVpE?t=4183)에서 영감을 받았습니다.

발표에서는 슬랙 봇을 NestJS의 어댑터로써 사용하는 모습을 보여주는 장면이 있었습니다. 이 부분을 보면서, 디스코드 봇도 만들어 볼 수 있지 않을까? 하는 생각이 들어 시작하게 되었습니다.

### 한계

의존성 처리 전에 어댑터가 생성되어야 하는데, 결국 모든 처리가 어댑터에서 이루어지기 때문에 nestjs의 DI Container를 사용할 수 없습니다.

또한 `DiscordBotAdapter#get` 메서드에서 받는 `handler` 파라미터가 컨트롤러의 메서드를 가리키는 것이 아니라, 컨트롤러의 메서드를 host filter, guard, interceptor 등 많은 과정을 적용한 메서드입니다. 따라서 컨트롤러의 메서드에 붙어 있는 메타데이터를 가져올 수 없다는 한계점이 존재합니다.

다만, 실제로 명령어 처리를 시작하는 것은 `INestApplication#listen` 메서드를 호출한 뒤라는 사실을 활용하면 조금 tricky 하더라도 메타데이터 정보를 어댑터 안으로 가져올 수 있습니다.

### Run

```shell
npm install
npm run start
```

### Environments

|        Name         | Description                                        | Required? |
| :-----------------: | :------------------------------------------------- | :-------: |
|   `DISCORD_TOKEN`   | 디스코드 봇의 토큰                                 |     Y     |
| `DISCORD_CLIENT_ID` | 디스코드 개발자 포탈에서 등록한 봇의 클라이언트 ID |     Y     |
| `DISCORD_GUILD_ID`  | Slash command를 등록할 디스코드 서버의 ID          |     N     |

> `.env.example` 파일을 참고해주세요.
