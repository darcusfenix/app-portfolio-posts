FROM node:latest
MAINTAINER Juan Crisóstomo

RUN mkdir -p /root/.ssh
ADD private_key /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "IdentityFile /root/.ssh/id_rsa" >> /root/.ssh/ssh_config
ENV GIT_SSH="/opt/app/ssh-bitbucket.sh"

RUN mkdir -p /opt/app
COPY . /opt/app
RUN cd /opt/app && npm install && rm ./private_key && ls -lha
WORKDIR /opt/app
CMD ["npm", "run", "build"]
