# Pulled Aug 29, 2023
FROM node:18@sha256:11e9c297fc51f6f65f7d0c7c8a8581e5721f2f16de43ceff1a199fd3ef609f95 as build
WORKDIR /srv
COPY package-lock.json package.json ./
RUN npm install
COPY angular.json tsconfig.json ./
COPY projects ./projects
RUN node_modules/.bin/ng build

# Pulled Aug 29, 2023
FROM nginx@sha256:104c7c5c54f2685f0f46f3be607ce60da7085da3eaa5ad22d3d9f01594295e9c
COPY --from=build /srv/dist/ckangpt /usr/share/nginx/html
