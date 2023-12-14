FROM alpine

RUN sh -c "echo 'https://gitsecret.jfrog.io/artifactory/git-secret-apk/latest-stable/main'" >> /etc/apk/repositories && \
    wget -O /etc/apk/keys/git-secret-apk.rsa.pub 'https://gitsecret.jfrog.io/artifactory/api/security/keypair/public/repositories/git-secret-apk' && \
    apk add --update --no-cache \
        bash \
        git-secret \
        gnupg

COPY entrypoint.sh /entrypoint.sh


RUN ["chmod", "+x", "entrypoint.sh"]
RUN ["mkdir", "tmp"]

COPY . /tmp
# CMD ["git","secret","init"]

ENTRYPOINT ["/entrypoint.sh"]

