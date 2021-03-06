FROM node:14-slim as base
COPY yarn.lock yarn.lock
COPY package.json package.json
ARG G_SEARCH_CONTENT
ENV G_SEARCH_CONTENT=${G_SEARCH_CONTENT}
ARG REACT_APP_BACKEND_ENDPOINT
ENV REACT_APP_BACKEND_ENDPOINT=${REACT_APP_BACKEND_ENDPOINT}
ARG REACT_APP_GA_KEY
ENV REACT_APP_GA_KEY=${REACT_APP_GA_KEY}
RUN yarn install

FROM base as dev
ADD . .
CMD ["yarn", "start"]
EXPOSE 5000

FROM base as uat
ADD . .
RUN yarn build

FROM nginx:alpine as nginx
COPY --from=uat dist/ /var/www
COPY --from=uat public/ /var/www/public
COPY /server/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
