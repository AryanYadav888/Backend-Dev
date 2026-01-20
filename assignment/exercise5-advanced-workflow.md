\# Exercise 5: Advanced Workflow



\## 1. Initialize a repository with multiple files

```bash

mkdir project

cd project

git init

touch file1.txt file2.txt file3.txt





2.Create a .gitignore file

touch .gitignore

echo node\_modules/ >> .gitignore

echo .env >> .gitignore





3\. Use git stash to save work in progress

nano file1.txt   # make some changes

git stash

git stash list

git stash apply





4\. Create and tag a release

git commit -am "Prepare for release"

git tag v1.0





5\. Push everything to GitHub including tags

git push origin main

git push origin --tags
