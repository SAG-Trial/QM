# Dockerfile

# Use a Node.js base image
FROM node:20

# Copy the environment file with secrets
COPY .env ./

# Copy the TypeScript files
COPY dist ./dist

# Set the entrypoint to execute the TypeScript file
CMD ["node", "dist/index.js"]
