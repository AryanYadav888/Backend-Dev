\# Exercise 2: Branching and Merging



\## 1. Create a new branch called "feature"

```bash

git checkout -b feature





2\. Add new files in the feature branch

touch feature.txt

git add feature.txt

git commit -m "Add feature file"





3\. Switch back to main branch

git checkout main





4\. Merge feature branch into main

git merge feature





5\. Delete the feature branch

git branch -d feature




