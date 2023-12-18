FROM alpine:latest

RUN sh -c "echo 'https://gitsecret.jfrog.io/artifactory/git-secret-apk/latest-stable/main'" >> /etc/apk/repositories && \
    wget -O /etc/apk/keys/git-secret-apk.rsa.pub 'https://gitsecret.jfrog.io/artifactory/api/security/keypair/public/repositories/git-secret-apk' && \
    apk add --update --no-cache \
        bash \
        git-secret \
        gnupg \
        tree

# Setting the GPG_TTY environment variable to /dev/console
ENV GPG_TTY /dev/console

COPY entrypoint.sh public.gpg secret.gpg ./

RUN ["chmod", "+x", "/entrypoint.sh"]
# RUN ["mkdir", "revealing-folder"]

ENTRYPOINT ["/entrypoint.sh"]

