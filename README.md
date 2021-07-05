## :house: SSSB Scrape - Frontend

This is the frontend service for [SSSB Scrape Backend](https://github.com/tasola/sssb-scrape-be)

SSSB Scrape is a project which aims to aid students in Stockholm to find their dream student apartment. The demand on student housing in Stockholm has been incredibly high for a long time. To be able to get a decent residence the student has to be ever-present on the Stockholm Student Residents (SSSB) site, in order to make sure that they don't miss any new release.
The goal of this project is to help students carry this burden by automating the process. The SSSB Scrape-servers are checking the SSSB site for new housings 24/7, and if an apartment of the user's preference would appear it notifies the user through an email.

This repository serves as the user client in the SSSB Scrape application. It lets users authenticate to handle their custom subscriptions; add/edit/remove housing preferences such as area, apartment type and minimum floor.

The app is live [here](https://sssb-scrape.firebaseapp.com/)


### :rocket: Get started
To get the app up and running, simply `npm install` and then `npm run start`, and the app should be up and spinning on [http://localhost:3000](http://localhost:3000). However, a few environment keys are needed in order to setup the connection to Firebase etc.


### :hammer_and_wrench: Built with
* [React](https://reactjs.org/) - View library for the user interface 
* [Redux](https://redux.js.org/) - State management for the application
* [Firebase](https://firebase.google.com/) - Serverless solution for user management + authentication logic. Deployment.
* [Contentful](https://www.contentful.com/) - Headless CMS for admins to easily add/edit/remove possible areas for users to choose
* [Material UI](https://material-ui.com/) - Component library
