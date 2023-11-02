# bikes-backend
I used HSL's open data about city bikes and their stations to create a backend for the [bikes-frontend](https://github.com/Iispar/solita-frontend).
The [data](https://www.hsl.fi/en/hsl/open-data) was in CSV files for each month. I did some small parsing of this data with pandas and Python and then deployed it to MongoDB, with two clusters one for stations and one for journeys. The backend is an API that makes the filtered calls to the backend and reformats the data to return for the original call.

This project only includes three months of journey data and that is because of MongoDB's limits on the size of the clusters and as the fourth month would have gone over the free storage.

# Prerequisites and Configurations
The connection to the database is in a .env file so if you want to run this on your own computer you either need to 
create your own MongoDB database or I can send you the .env file if you want. Other than that you just need to clone
the repository, install with ```npm install``` and ```npm start``` and it should work.
# How to run
If you have the prerequisites you are able to run the backend with npm install and then npm start. This should deploy the app to localhost:3000 (if it is free).
Please check the repository [solita-frontend](https://github.com/Iispar/solita-frontend) 
if you want to access the whole app.
# Tests
The backend has some rest API call tests and also jest tests. Rest calls can be done by using vs code and installing this 
[extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and then you can call the rest calls
by pressing the button on top of GET. 
Jest tests on the other hand can be run by downloading the project and using the npm test. This **needs** the connection to MongoDB to work!
# Technologies
I used JavaScript for the code. MongoDB for the database, MongoDB for the connection to the database. I also used express for the communication and node for the framework.
