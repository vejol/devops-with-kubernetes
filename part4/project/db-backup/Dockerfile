FROM google/cloud-sdk:511.0.0-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache \
    postgresql-client \
    && rm -rf /var/cache/apk/*

COPY ./backup.sh .
RUN chmod +x ./backup.sh

CMD ["./backup.sh"]