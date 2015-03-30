# Bikes

This is an app that will let you find the nearest boris bike dock to a start location and a destination location. This is a london centric app as thats where the boris bikes live!


## Running the project

The project has to parts to it, the client and the server. The server is an node application that servers up a custom rest endpoint. 

###Starting:

Before running the app you need to have [node](https://nodejs.org/) and [npm](https://www.npmjs.com/).
You will also need [bower](http://bower.io/)

* Server:

  cd /server
  npm install

* Web page 

  cd app/
  bower install

then to get it running

  cd server
  node app.js

should be up and running locally.

If you want to run tests for the server you will need mocha and nock

If you want to run the tests for the front end you will need karam and jasmine 
