# Solidarify

## Description

A social network for local organizations to promote collaboration.
Users may search for organizations or events they are familiar with, and discover others they may be interested in based on previous collaboration between those organizations.

## Motivation

For decades, the decline of local civic organizations has been a cause for concern among a wide spectrum of people. Technology often facilitates habits that lead to this decline in collaboration with our neighbors. To counter this trend, Solidarify leverages the strengths of digital communication to facilitate use of the human strength of working together and standing together -- in solidarity.

## Usage

Organizations may request access, which the Admin is able to grant via email.

Once granted access, the organizations then create a profile, and can begin to add events.

These events can include collaborators from among the organizations that have created profiles on the site. Once listed as potential collaborators, the organizations chosen are sent an email to confirm or reject being listed as collaborators on the event.

These events and organizations are searchable via a force-directed graph, where connection strength is proportionate to the amount of collaboration that has occurred between each of the organizations.

This intuitive display allows for a fun and convenient experience in getting to know the community better, allowing users to become more engaged.

## History

* Primary project code was completed during a two week period in early May 2017.
* Hosting via heroku and mLabs was completed in an hour's time after a group project had finished, at the end of May.
* Integration of d3 force-directed graph is set to be completed in June.

## Process

Working on the project was a great experience, and I was able to learn a lot from it. Despite initial difficulties, getting the chance to practice the skills I had developed was very satisfying.

The project began with a simple Node file structure I made as a sort of outline. From there, I brought in Angular and Passport for functionality, and developed the CRUD routes.

While attempting to bring in a Node module for use in sending verification emails, (which ended up being a dead end,) I took some time to break from that task to work on making the code itself consistent and easy to read. Code formatting and organization is important to me, as small of a concern as that may be at times.

After more time trying to use the Node module for sending verification codes, I was able to find a better way thanks to the instructors. Some time was also spent learning the setup for a d3 force-directed graph of the kind used by this project.

Final work before presentation of the product was on styling and layout, as well as to correct some changes that had been made which prevented the CRUD routes from working properly.

Deployment on Heroku was a known process at time of completion, but was not implemented due to time constraints.

Integration of d3 is a subsequent development as a matter of personal interest to improve the project.

## Technologies

- [**AngularJS**](https://angularjs.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Bootstrap](http://getbootstrap.com/)
- [**d3**](https://d3js.org/)
- [**Express**](https://expressjs.com/)
- [**MongoDB**](https://www.mongodb.com/)
- [**Node.js**](https://nodejs.org/en/)
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
- [Passport](http://passportjs.org/)

## Acknowledgments

* The instructors and staff at [Prime Digital Academy](https://primeacademy.io/)
