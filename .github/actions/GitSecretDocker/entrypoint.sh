#!/bin/sh -l

# echo "cd to home directory"
# cd ~
# ls -la

# echo "Change Directory to revealing-folder"
# mkdir revealing-folder
# cd revealing-folder

# echo "Contents in revealing-folder folder"
# ls -la



# echo "cd to github workspace"
# cd /github/workspace/

echo "Making dest directory"
mkdir /dest

echo "Listing contents of /github/workspace"
ls -la /github/workspace/

cd /dest

echo "Initializing git and git-secret"
git init
git-secret init

echo "copying contents from github workspace to dest"
cp -a /github/workspace/. /dest/

echo "Removing .git"
rm -r .git

echo "Listing contents of dest"
ls -la

echo "Importing gpg public key"
gpg --import secret.gpg

echo "Importing gpg private key"
gpg --import --batch --yes --pinentry-mode loopback secret.gpg


echo "Listing gpg secret keys"
gpg --list-secret-keys


# echo "Tree of current folder"
# tree -al

# echo "Tree of /github/workspace/.git"
# tree -al /github/workspace/.git

# echo "Tree of .gitsecret"
# tree -al .gitsecret

# echo "Tree of secrets"
# tree -al secrets


# Removing dubious ownership
git config --global --add safe.directory /dest


# Reinitalizing git to add remote origin
git init

# Adding remote origin
git remote add origin https://github.com/SAG-Trial/QM.git


# Listing git secrets
echo "Listing git secrets "
git secret list

# Revealing secrets
echo "Revealing secrets"
git secret reveal -p "helloworld"

# echo "Tree of secrets folder"
# tree -al secrets

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
    exit 1
fi