# Stage 1 - the build process
FROM node:18-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=build-deps /usr/src/app/package.json ./package.json
COPY --from=build-deps /usr/src/app/package-lock.json ./package-lock.json
RUN npm install --production
COPY --from=build-deps /usr/src/app/.next ./.next
COPY --from=build-deps /usr/src/app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
