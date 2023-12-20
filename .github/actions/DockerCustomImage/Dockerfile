FROM ubuntu:latest

RUN apt-get update 
RUN apt install docker.io -y
RUN docker --version
RUN docker login ghcr.io --username prhsag --password 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

RUN docker pull ghcr.io/sag-trial/qm-secrets:latest 

RUN docker tag ghcr.io/sag-trial/qm-secrets:latest qm-secrets:latest

FROM qm-secrets:latest

# Setting the GPG_TTY environment variable to /dev/console
ENV GPG_TTY /dev/console

COPY entrypoint.sh ./entrypoint.sh

RUN ["chmod", "+x", "/entrypoint.sh"]
# RUN ["mkdir", "revealing-folder"]

ENTRYPOINT ["/entrypoint.sh"]

