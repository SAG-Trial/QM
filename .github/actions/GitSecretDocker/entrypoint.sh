#!/bin/sh -l


mkdir tmp
cd tmp
git clone https://github.com/SAG-Trial/QM.git .
ls -la

git config --global user.email "sups@softwareag.com"
git config --global user.name "Supreeth S"

gpg --import /secrets/supreeth_public.key


git init
git secret init



git secret tell sups@softwareag.com

git secret add /secrets/secrets.txt
git secret hide

git add .
git commit -m "Encrypted from GitHub Docker Actions"
git push