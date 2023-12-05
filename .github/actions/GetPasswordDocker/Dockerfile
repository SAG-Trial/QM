# Dockerfile

# Use a Node.js base image
FROM node:20

# Copy the environment file with secrets
COPY .env ./

# Copy the TypeScript files
COPY dist/index.js ./index.js

RUN ["chmod", "+x", "index.js"]
RUN ["chmod", "+x", ".env"]

RUN ls -a

# Set the entrypoint to execute the TypeScript file
CMD ["node", "/index.js"]
