# Stoik Technical Test

# Setup
To run the project, follow these steps:

 1. Create a .env file at the root of the project, using the provided .env.template.

 2. Open your terminal and navigate to the root of the project.

 3. Run the command make. This will launch basic tests and start the project in development mode.

# Commands
 1. make re-dev: Stops and rebuilds the project.

 2. make stop: Stops all containers.

 3. make clean: Removes all Docker images and volumes. Note: Be careful as this action is irreversible.

# Endpoints
There are two endpoints available: one using the GET method and the other using POST.

# POST Endpoint
URL: http://localhost:3000/shorten/

Body:
json
{
    "long_url": "the_url_you_want_to_shorten"
}

Response:
json
{
    "shortUrl": "http://localhost:3000/g5b2oY"
}

The POST endpoint allows you to shorten a given URL. It will return a shortened URL in the response.

# GET Endpoint
If you copy and paste the shortened URL received from the POST endpoint, you will be redirected to the original URL.

# Adminer
To access to the database you can go to the following url: http://localhost:5430
And put the right data to connect to the database.

Please ensure you have the necessary environment variables configured and follow the provided commands to run, rebuild, stop, or clean the project.









