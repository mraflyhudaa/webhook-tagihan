FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile

COPY . .

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/package.json .

ENV TZ=Asia/Jakarta
RUN apk add --no-cache tzdata

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD [ "node", "src/index.js" ]