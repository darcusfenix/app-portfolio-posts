FROM node:latest
MAINTAINER Juan Crisóstomo

RUN mkdir -p /opt/app
COPY . /opt/app
RUN cd /opt/app && npm install && ls -lha
WORKDIR /opt/app
WORKDIR /opt/app

CMD ["npm", "run", "build"]
