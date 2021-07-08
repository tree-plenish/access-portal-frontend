# Full User Access Portal

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment
This project is deployed with AWS Elastic Beanstalk and AWS CodePipeline at the [link](http://accessportal-env.eba-mammm25g.us-east-2.elasticbeanstalk.com).

### Current Status
Basic login page and dashboard page have been created. Login page has login verification functionality in place (password must be confirmed based on the value of the username). 
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

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).