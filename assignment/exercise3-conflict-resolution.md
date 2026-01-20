\# Exercise 3: Conflict Resolution



\## 1. Create two branches from main

```bash

git checkout main

git checkout -b branchA

git checkout main

git checkout -b branchB





2\. Modify the same line in a file in both branches

In branchA:

git checkout branchA

nano file.txt   # change line 1

git commit -am "Change from branchA"



In branchB:

git checkout branchB

nano file.txt   # change same line differently

git commit -am "Change from branchB"







3\. Merge one branch into main

git checkout main

git merge branchA







4\. Attempt to merge the second branch

git merge branchB







5\. Resolve the conflict manually



Git will show:



<<<<<<< HEAD

Code from branchA

=======

Code from branchB

>>>>>>> branchB






























