# solita-backend
This is the backend for the pre-requisite project for solitas job listing. 
In this project we had an csv file with trips done on citybikes. I transformed this into and mongoDB database and
created and backend with API calls to the database. This API can be used for the frontend which is the other part
of this project.
HOX! for the person reviewing this. I only used one of the csv files for bike data (2021-05), because 
I ran into storage problems with mongoDB as the free version wasn't large enough. I hope this doesn't matter
that much and I believe my skills can be seen still. I also filtered the data beforehand with pandas and wasn't sure
if this was something you would have liked to see, but I can tell you more if needed.
# Prerequisites and Configurations
The connection to the database is in an .env file so if you want to run this on your own computer you either need to 
create your own mongoDB database or I can send you the .env file if wanted. Other then that you just need to clone
the repository, install with npm install and npm start and it should work.
# How to run
This is only the backend so you can't run the whole project from here. Please check repository [solita-frontend](https://github.com/Iispar/solita-frontend) 
if you
want to access the whole app.
# Tests
The backend has some rest api call tests and also jest tests. Rest calls can be done by using vscode and installing this 
[extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and then you can call the rest calls
by pressing the button on top of GET. 
Jest tests on the other hand can be ran by downloading the project and using npm test. This needs the connection to mongoDB to work!
# Technologies
I used JavaScript for the code. MongoDB for the database, mongoose for the connection to the database. I also used express.
