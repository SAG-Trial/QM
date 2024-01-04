FROM node:slim

COPY . ./

RUN <<EOF
    echo "workflow=$GITHUB_WORKFLOW" >> $GITHUB_OUTPUT
EOF



