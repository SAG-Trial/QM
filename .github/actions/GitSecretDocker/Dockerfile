FROM alpine:latest
# FROM ubuntu:latest

# RUN apt-get update && apt-get install -y gnupg && apt-get install -y wget 

RUN sh -c "echo 'https://gitsecret.jfrog.io/artifactory/git-secret-apk/latest-stable/main'" >> /etc/apk/repositories && \
    wget -O /etc/apk/keys/git-secret-apk.rsa.pub 'https://gitsecret.jfrog.io/artifactory/api/security/keypair/public/repositories/git-secret-apk' && \
    apk add --update --no-cache \
        bash \
        git-secret \
        gnupg \
        tree

COPY entrypoint.sh /entrypoint.sh

# Setting the GPG_TTY environment variable to /dev/console
ENV GPG_TTY /dev/console


RUN ["chmod", "+x", "entrypoint.sh"]
# RUN ["mkdir", "revealing-folder"]

# COPY ../../../ /revealing-folder
# CMD ["git","secret","init"]

ENTRYPOINT ["/entrypoint.sh"]

