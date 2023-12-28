FROM ghcr.io/sag-trial/qm-secrets:latest

# Setting the GPG_TTY environment variable to /dev/console
ENV GPG_TTY /dev/console

COPY entrypoint.sh ./entrypoint.sh

RUN ["chmod", "+x", "/entrypoint.sh"]
# RUN ["mkdir", "revealing-folder"]

ENTRYPOINT ["/entrypoint.sh"]

