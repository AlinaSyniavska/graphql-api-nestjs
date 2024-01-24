# Stage 1: Build frontend
FROM node:18-alpine3.17 as build-stage
WORKDIR /app
COPY package*.json .
RUN npm ci --force
COPY . .


