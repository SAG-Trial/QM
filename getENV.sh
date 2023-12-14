#!/bin/bash

# Specify the path to the .env file
ENV_FILE="secrets/.env"

# Check if the .env file exists
if [ -f "$ENV_FILE" ]; then
	# Load the environment variables from .env
	source "$ENV_FILE"

	# Export WEATHER_API to a variable called test
	export WEATHER_API_SECRET="$WEATHER_API"

	# Write the environment variable to the GitHub workspace
	echo "WEATHER_API_SECRET=$WEATHER_API_SECRET" >> $GITHUB_OUTPUT
else
	echo "Error: The .env file ($ENV_FILE) does not exist."
fi
