# bikes
Starting it up:

The project contains two aspects:

Server:

This contains a rest api needed by the web page. To start this up:
cd /server
npm install

Web page 

cd app/
bower install

then to get it running

cd server
node app.js

should be up and running locally.

If you want to run tests for the server you will need mocha and nock

If you want to run the tests for the front end you will need karam and jasmine 
