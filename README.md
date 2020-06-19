I built a simple Q and A submission app in React following Bruno Krebs' tutorial here:
https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/

In his tutorial, he used a mock database (a simple array in JS) in order to keep the 
tutorial more concise. All get/post requests were array push/index operations. 
I decided to extend the app and connected it to a MySQL database, and wrote in
mySQL database operations for the get/post requests. 

To run the simple website on localhost:3000: 

1. Download the git repository.
2. Initialize a server (using WAMP, MAMP, etc.)
3. Create a database in mySQL by running the script in the database/ directory
in mySQL Workbench or mySQL console.
4. Open a terminal window, cd into the backend/ directory, and run "npm install" (no quotes)
to install the required dependencies for the backend.
5. Cd into the frontend/ directory, and run "npm install" (no quotes) to install the 
required dependencies for the frontend.
6. Cd into the backend/ directory, and run "node src" (without quotes) to run the backend server.
7. Open another terminal window, cd into the frontend/ directory, and run "npm start"
(without quotes) to run the React app (may need to install dependencies, which
are specified in frontend/package.json).
8. Navigate to localhost:3000 and enjoy!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
