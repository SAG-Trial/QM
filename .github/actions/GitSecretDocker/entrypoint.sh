#!/bin/sh -l

mkdir tmp
cd tmp
git clone https://github.com/SAG-Trial/QM.git .
ls -la

git config --global user.email "sups@softwareag.com"
git config --global user.name "Supreeth S"

gpg --import public.asc

gpg --list-keys

gpg --list-secret-keys

gpg --import my-priv-gpg-key.asc

git remote add origin https://sups@softwareag.com:MiG29SR71@software@github.com/SAG-Trial/QM.git

git init
git secret init

git rm --cached -r secrets
# git rm --cached -r secrets

git secret tell sups@softwareag.com

git secret add secrets/secrets.txt
git secret hide

git secret reveal -p "are you not entertained ?"

# git rm --cached secrets/secrets.txt
# git rm --cached -r secrets

git add .
# git rm --cached secrets/secrets.txt
git commit -m "Encrypted from GitHub Docker Actions"

git status
# git push