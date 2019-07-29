# Let It Go Submission Portal




## Purpose
This submission portal allows users to submit their reviews to our database for the admins' approval. At the same time, admins are able to log in directly to approve/reject these submissions.


## Demo
([Submit your review here](https://github.com/nelsontky/let-it-go-submission/blob/master/README.md))

## Screenshots
### User-facing end

<img src = "https://imgur.com/Qw6KVIo.png" width = "500"/>
<img src = "https://imgur.com/LUhlmCd.png" width = "500"/>

### Admin-facing end

<img src = "https://imgur.com/RkJeUxQ.png" width = "500"/>
<img src = "https://imgur.com/BEKTDUS.png" width = "500"/>

## Features

* Material UI integrated
* Simple process to fill up form
* Ability to upload panorama pictures of toilet
* Show all submissions submitted by logged in user, with abilityto preview/edit/delete own previous submission
* Admin panel for admins to approve/reject submission with remarks, along with ability to preview submissions


## Bugs, problems encountered, and lessons learnt :(
After realising that it will be more cost-efficient and productive to let our users submit toilets across NUS for us, we hastened the process for our development of a submission portal. Here are some issues that we faced along the way.

1. Merge Conflicts
* We decided to work on the same file together, with no regard for any potential merge conflicts, given our relatively limited experience. This set us back unnecessarily as merge conflicts arose after we individually submitted new pull requests. 
  - Since this lesson, we made sure to break down our code to more components for individual contribution, with minimal concurrent editing to a singular main file. Most importantly, we learnt the consequences of improper communication in code collaboration

2. Organisation of Database 
* Our initial organisation of our Cloud Firestore proved to be unnecessarily messy and complicated. We decided that it is a crucial time right now to properly organise how our data should be collected and structured in the Firestore, before a potential public release and submissions start to pour in. By then, restructuring of our data model will have been increasingly cumbersome. 
  - [Our current Firestore data model is as shown here](https://github.com/nelsontky/let-it-go/blob/master/README.md)




