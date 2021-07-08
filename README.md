# User Access Portal Frontend

## Deployment
This project is deployed with Heroku at this [link](https://access-portal-frontend.herokuapp.com/).

### Current Status
The frontend is simply the React app, which makes requests to a RESTful API created with Flask located at [link](https://access-portal-backend.herokuapp.com/).
Login verification is in place (connected to password table from database).

![Image of Login](/public/login.PNG)
The webpage following the login page is conditionally rendered based on variable called themonth (the current month).
The assumption is that all schools are at the same stage on a given date.

Stage 3:
![Image of Dashboard](/public/dashboard.PNG)

Stage 1:
![Image of StageOne](/public/stageone.PNG)

Stage 2:
![Image of StageTwo](/public/StageTwo.PNG)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).