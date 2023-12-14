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

cd /dest

echo "Initializing git and git-secret"
# git init
# git-secret init

echo "copying contents from github workspace to dest"
cp -a /github/workspace/. /dest/

echo "Listing contents of dest"
ls -la

# echo "cd to github home"
# cd /github/home


# git config --global user.email "sups@softwareag.com"
# git config --global user.name "Supreeth S"

# gpg --import supreeth_public.asc

echo "Tree of current folder"
tree -al

echo "Tree of .gitsecret"
tree -al .gitsecret

echo "Tree of secrets"
tree -al secrets



# echo "Listing git secrets "
# git secret list

# echo "Revealing secrets"
# git secret reveal