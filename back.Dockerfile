FROM node:20-alpine
RUN apk add --no-cache bash git

# copy project
COPY ./backend ./backend
# set work directory
WORKDIR /backend