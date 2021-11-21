# Install dependencies only when needed
# Stage 0
FROM node:16-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
#############################################


# Rebuild the source code only when needed
# Stage 1
FROM node:16-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build 
#############################################


# Production image, copy all the files and run
# Stage 3
FROM node:16-alpine AS runner
WORKDIR /app


RUN addgroup -g 1001 -S nodejs
RUN adduser -S server -u 1001

COPY --from=builder --chown=server:nodejs /app/ ./

USER server
EXPOSE 4001
ENV PORT 4001
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "dev"]
#############################################