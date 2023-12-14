#!/bin/sh -l

# echo "cd to home directory"
# cd ~
# ls -la

# echo "Change Directory to revealing-folder"
# mkdir revealing-folder
# cd revealing-folder

# echo "Contents in revealing-folder folder"
# ls -la



echo "cd to github workspace"
cd /github/workspace/


echo "copying contents from github workspace to dest"
cp -a /github/workspace/. /dest/


cd /dest

echo "Listing contents of dest"
ls -la

# echo "cd to github home"
# cd /github/home


# git config --global user.email "sups@softwareag.com"
# git config --global user.name "Supreeth S"

# gpg --import supreeth_public.asc


git init

echo "Git Secret Version"
git-secret --version

git-secret init

# git rm --cached secrets/secrets.txt
# git rm --cached -r secrets


# git secret tell sups@softwareag.com

# git secret add secrets/secrets.txt
# git secret reveal

# git rm --cached secrets/secrets.txt
# git rm --cached -r secrets

# git add .
# git rm --cached secrets/secrets.txt
# git commit -m "Encrypted from GitHub Docker Actions"
# git push