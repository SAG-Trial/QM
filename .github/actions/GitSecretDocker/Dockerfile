FROM ubuntu

# RUN sh -c "echo 'https://gitsecret.jfrog.io/artifactory/git-secret-apk/latest-stable/main'" >> /etc/apk/repositories && \
#     wget -O /etc/apk/keys/git-secret-apk.rsa.pub 'https://gitsecret.jfrog.io/artifactory/api/security/keypair/public/repositories/git-secret-apk' && \
#     apk add --update --no-cache \
#         bash \
#         git-secret \
#         gnupg

RUN sh -c "echo 'deb https://gitsecret.jfrog.io/artifactory/git-secret-deb git-secret main' >> /etc/apt/sources.list" && \
    wget -qO - 'https://gitsecret.jfrog.io/artifactory/api/gpg/key/public' | apt-key add - && \
    apt-get update && apt-get install -y git-secret && apt-get install -y gnupg 



COPY entrypoint.sh /entrypoint.sh


RUN ["chmod", "+x", "entrypoint.sh"]
# RUN ["mkdir", "revealing-folder"]

# COPY ../../../ /revealing-folder
# CMD ["git","secret","init"]

ENTRYPOINT ["/entrypoint.sh"]

