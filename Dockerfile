#pull image form docker hub registry
FROM node:18.15.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build:dev
FROM nginx:1.13.9-alpine                                  
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY  --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
