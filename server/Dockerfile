# Install dependencies only when needed
# Stage 0
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
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