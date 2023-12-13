#!/bin/sh -l


mkdir tmp
cd tmp
git clone https://github.com/SAG-Trial/QM.git .
ls -la

git config --global user.email "sups@softwareag.com"
git config --global user.name "Supreeth S"

gpg --import supreeth_public.asc


git init
git secret init



git secret tell sups@softwareag.com

git secret add secrets/secrets.txt
git secret hide

git rm --cached secrets/secrets.txt

git add .
git rm --cached secrets/secrets.txt
git commit -m "Encrypted from GitHub Docker Actions"
git push