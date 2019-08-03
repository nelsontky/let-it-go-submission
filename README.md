# Let It Go Submission Portal




## Purpose
This submission portal allows users to submit their reviews to our database for the admins' approval. At the same time, admins are able to log in directly to approve/reject these submissions.


## Demo
https://nelsontky.github.io/let-it-go-submission/

## Screenshots
### Submission form

<img src = "https://imgur.com/Qw6KVIo.png" width = "500"/>
<img src = "https://imgur.com/LUhlmCd.png" width = "500"/>

### Admin panel

<img src = "https://imgur.com/RkJeUxQ.png" width = "500"/>
<img src = "https://imgur.com/BEKTDUS.png" width = "500"/>

## Features

* Material UI integrated.
* Simple process to fill up form.
    * Only a few vital checkboxes, a panorama image, and fields needs to be input before submission will be considered for approval.
    * [More information on creating a submission.](https://github.com/nelsontky/let-it-go-submission/blob/master/HELPME.md#creating-a-submission)
* Show all submissions submitted by logged in user, with ability to preview/edit/delete own previous submission.
    * [More information on managing submissions.](https://github.com/nelsontky/let-it-go-submission/blob/master/HELPME.md#manage-your-submissions)
* Admin panel for admins to approve/reject submission with remarks, along with ability to preview submissions.
    * As of now, only 2 admins exist: Me and my partner. :sunglasses:
    * [Video demo of admin portal.](https://youtu.be/YADOVkDN8HE?t=70)


## Bugs, problems encountered, and lessons learnt :(
After realising that it will be more cost-efficient and productive to let our users submit toilets across NUS for us, we hastened the process for our development of a submission portal. Here are some issues that we faced along the way. Hopping onto the crowd sourcing train yippie!

1. Merge Conflicts
    * We decided to work on the same file together, with no regard for any potential merge conflicts and thus given our relatively limited experience, this set us back unnecessarily as merge conflicts arose after we individually submitted new pull requests.
        * In commit [45531ed](https://github.com/nelsontky/let-it-go-submission/commit/45531ed365ce14bbadb3db346c05a180af9a79bb), merge conflicts were hastily settled by a single person before we called it a night and went to sleep.
        * On the next day, while doing some routine testing of the submissions portal, we found many application breaking bugs. Panic ensued and due to our own doubt of our coding abilities, we thought that the bugs were caused by old code written before the merge conflict.
        * It took use some scanning of the source code to realise that some parts of the code are almost duplicated, and it was then we realised that we did not properly resolve our merge conflicts.
        * Merge conflicts were then finally properly resolved in [cc2c676](https://github.com/nelsontky/let-it-go-submission/commit/cc2c67605ec48bbe295af00e5a68928e3bcd59ae).
    * Since this lesson, we made sure to break down our code to more components for individual contribution, with minimal concurrent editing to a singular main file. Most importantly, we learnt the consequences of improper communication in code collaboration.
        * Code merging is not a trivial process and it should be ideally conducted with much communication and care and it should involve all collaborators.

2. Organisation of Database
    * Our initial organisation of our Cloud Firestore proved to be unnecessarily messy and complicated. We decided that it is a crucial time right now to properly organise how our data should be collected and structured in the Firestore, before a potential public release and submissions start to pour in. By then, restructuring of our data model would have been increasingly cumbersome.

3. Code issues
    * A lesson learnt from creating the main applications was that issue/bug tracking was all over the place.
    * We started to track issues using Github's issue functionality. However, some old habits die hard and we did fix a bug or two here and there without opening issues.
    * With the [limited issues that we tracked officially](https://github.com/nelsontky/let-it-go-submission/issues?q=is%3Aissue+is%3Aclosed), we could see that Github's issues functionality was a better way to track progress and who knows, we could even have others who spot a bug or have any suggestions post issues in the future!
