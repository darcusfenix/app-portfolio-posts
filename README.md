 docker build -t pets-app/micro-service-users:v0.0.1 .


docker run -it --name micro-service-users \
-p 3000:3000 -d \
pets-app/micro-service-users:v0.0.1
