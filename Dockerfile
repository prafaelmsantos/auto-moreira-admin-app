# pull official base image
FROM node:20-alpine AS build

# set working directory
WORKDIR /
RUN npm i -g pnpm

# install app dependencies
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

# add app
COPY . .

# Build the React app for production
ENV NODE_OPTIONS="--max-old-space-size=6592"
RUN pnpm run build

# Use Nginx as the production server
FROM nginx:stable-alpine AS buid

# Copy the built React app to Nginx's web server directory
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]