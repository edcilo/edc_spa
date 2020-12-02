FROM node:15

RUN npm install -g @vue/cli

RUN mkdir /code
WORKDIR /code

COPY . /code

RUN npm install

EXPOSE 8000 8080

CMD vue ui --headless --port 8000 --host 0.0.0.0
