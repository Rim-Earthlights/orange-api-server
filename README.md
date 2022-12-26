# orange-api-server

- [TypeScript] API Server for [ts-orangebot](https://gitlab.com/Rim_Earthlights/ts-orangebot) / [speak-voicevox](https://gitlab.com/Rim_Earthlights/speak-voicevox).
- API Reference: [OpenAPI](https://gitlab.com/Rim_Earthlights/orange-api-server/-/blob/main/openapi.yml)

# Get Ready

1. install node.js or nodenv (16.15.1)
2. run MySQL, create database and user, set privilege.
3. `cp src/config/config.ts.template src/config/config.ts`
4. `vim src/config/config.ts`, set config text.
5. `yarn install`
6. `yarn run dev` run with nodemon
7. `yarn run compile`
8. `yarn run dist` run compiled js (./dist)