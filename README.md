# User Access Portal Frontend

## Deployment
This project is deployed with Heroku at this [link](https://access-portal-frontend.herokuapp.com/).

### Current Status
The frontend is a React app, which makes requests to an API created with Flask located at [link](http://portalbackend-env.eba-gwppy2gw.us-east-2.elasticbeanstalk.com/).
Login verification is in place (connected to password table from database).

![Image of Login](/public/login.png)
The webpage following the login page is conditionally rendered based on the flags in the 'scheduler' table in the database for that particular school. This means multiple schools may be in different stages at any given time.

Stage 1:
![Image of StageOne](/public/stage1-Jul-2022.png)

Stage 2:
![Image of StageTwo](/public/stage2-Jul-2022.png)

Stage 3:
![Image of Dashboard](/public/dashboard-Jul-2022.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.