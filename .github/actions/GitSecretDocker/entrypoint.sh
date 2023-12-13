#!/bin/sh -l


mkdir tmp
cd tmp
git clone https://github.com/SAG-Trial/QM.git .
ls -la

git init
git secret init