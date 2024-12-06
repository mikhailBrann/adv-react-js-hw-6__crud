FROM node:20-alpine
RUN apk add --no-cache bash git

# copy project
COPY ./app ./app
# set work directory
WORKDIR /app