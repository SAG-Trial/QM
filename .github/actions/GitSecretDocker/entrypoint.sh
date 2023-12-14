#!/bin/sh -l

# echo "cd to home directory"
# cd ~
# ls -la

echo "Change Directory to revealing-folder"
mkdir tmp
cd tmp

# cd /github/workspace/

# echo "cd to github home"
# cd /github/home


# git config --global user.email "sups@softwareag.com"
# git config --global user.name "Supreeth S"

# gpg --import supreeth_public.asc


git init
git secret init

# git rm --cached secrets/secrets.txt
# git rm --cached -r secrets


# git secret tell sups@softwareag.com

# git secret add secrets/secrets.txt
git secret reveal

# git rm --cached secrets/secrets.txt
# git rm --cached -r secrets

# git add .
# git rm --cached secrets/secrets.txt
# git commit -m "Encrypted from GitHub Docker Actions"
# git push