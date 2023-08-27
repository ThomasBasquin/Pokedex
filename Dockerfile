# Stage 1 - the build process
FROM node:18-alpine as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build-deps /usr/src/app/package*.json ./
RUN npm install --production && npm cache clean --force

# Create a non-root user and switch to it
RUN adduser -D myuser
USER myuser

COPY --from=build-deps /usr/src/app/.next ./.next
COPY --from=build-deps /usr/src/app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
