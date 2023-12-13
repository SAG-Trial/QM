#!/bin/sh -l

sh -c "echo 'https://gitsecret.jfrog.io/artifactory/git-secret-apk/latest-stable/main'" >> /etc/apk/repositories 
wget -O /etc/apk/keys/git-secret-apk.rsa.pub 'https://gitsecret.jfrog.io/artifactory/api/security/keypair/public/repositories/git-secret-apk' 
apk add --update --no-cache \
    bash \
    git-secret \
    gnupg



mkdir tmp
cd tmp
git clone https://github.com/SAG-Trial/QM.git .
ls -la

git config --global user.email "sups@softwareag.com"
git config --global user.name "Supreeth S"

gpg --import supreeth_public.asc


git init
git secret init

git rm --cached secrets/secrets.txt
git rm --cached -r secrets


git secret tell sups@softwareag.com

git secret add secrets/secrets.txt
git secret hide

git rm --cached secrets/secrets.txt
git rm --cached -r secrets

git add .
git rm --cached secrets/secrets.txt
git commit -m "Encrypted from GitHub Docker Actions"
git push