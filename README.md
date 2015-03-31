# Bikes

This is an app that will let you find the nearest Boris Bike dock from a start location to a destination location. This is a London-centric app as that's where the Boris Bikes live!

A few good example locations if you want to try it out are:
- The British Museum
- Poplar
- Tower Hill
- Canary Wharf
- The London Eye

## Running the project

The project has two parts to it: the client and the server. The server is a node application that servers up a custom rest api. 

###Starting:

Before running the app you need to have [node](https://nodejs.org/) and [npm](https://www.npmjs.com/).
You will also need [bower](http://bower.io/).

Here are some instructions for running the app locally:

* Server:
```
  cd /server
  npm install
```
* Web app page 
```
  cd app/
  bower install
```
Then to get it running
```
  cd server
  node app.js
```
Now you should be up and running locally. You can hit it on port 3000.

If you want to run tests for the server you will need [mocha](http://mochajs.org/) and [nock](https://github.com/pgte/nock).

If you want to run the tests for the front end you will need [karam](http://karma-runner.github.io/0.12/index.html) and [jasmine](http://jasmine.github.io/).
