FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .

# Set timezone
ENV TZ=Asia/Jakarta
RUN apk add --no-cache tzdata

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD [ "node", "index.js" ]