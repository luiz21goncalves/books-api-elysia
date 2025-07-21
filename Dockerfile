FROM oven/bun:1.2.19-alpine AS base
WORKDIR /usr/src/app

FROM base AS build
# Cache packages installation
COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./src ./src

ENV NODE_ENV=production

RUN bun run build

FROM base

COPY --from=build /usr/src/app/server server

ENV NODE_ENV=production

CMD ["./server"]
