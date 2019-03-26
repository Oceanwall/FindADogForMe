FROM node

RUN apt-get update

RUN npm update -g           && \
    npm --version           && \
    npm install -g mocha    && \
    npm install -g chai     && \
    npm install -g request  && \

RUN mocha --reporter spec --no-timeouts test/mocha_test_babel.js

CMD bash
