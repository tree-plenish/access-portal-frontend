# User Access Portal Frontend

Allows student leaders to log in, view, and download school-specific data (sponsorships, tree requests, volunteers).

### Current User Interface

![Image of Login](/public/login.png)
The webpage following the login page is conditionally rendered based on the flags in the 'scheduler' table in the database for that particular school. This means multiple schools may be in different stages at any given time.

Stage 1:
![Image of StageOne](/public/stage1-Jul-2022.PNG)

Stage 2:
![Image of StageTwo](/public/stage2-Jul-2022.PNG)

Stage 3:
![Image of Dashboard](/public/dashboard-Jul-2022.PNG)

# Documentation

## Deployment
This project is deployed with Heroku at this [link](https://access-portal-frontend.herokuapp.com/).

There are 2 separate repositories: this one and the other on Heroku.
* Follow normal procedure for pushing to Tree-Plenish repo.
* To push to Heroku repo, use `git push heroku master`

## Front End / Back End Connection
The frontend is a React app, which makes requests to an API created with Flask located at [link](http://portalbackend-env.eba-gwppy2gw.us-east-2.elasticbeanstalk.com/).

access-portal-frontend/static.json
* includes API_URL variable which represents the entire URL of access-portal-backend
* when you type `/api`, it will act as the entire base URL of access-portal-backend

Inside Heroku environment for access-portal-frontend:
* Settings -> Config Vars -> API_URL
* This will be the full URL of access-portal-backend.

## Google Analytics
The `index.html` file in the `build` folder contains the Google Analytics site tag within the `<head></head>` tags.

## React Components
All located in the `src` folder.
### App.js, index.js, index.css
Do not delete! create-react-app boilerplate code needed for app to function properly.
### Announcements.js
Displays text announcements (will be the same text for every school that logs in).
### Chart.js
Displays total requests received, progress to tree goal, tree requests by species (bar and pie charts).    
Inputs: goalPercent, specNames, specValues   
Sample call from a different component:   
`<Chart treeGoalPercent = {goalPercent}, specNames = {speciesNames} specValues = {speciesVals} />`    
Inside Chart.js, access the prop values with the notation   
`props.treeGoalPercent`
### Dashboard.js
Displays volunteers, tree requests, sponsors (Stage 3 of event process).
### ExportDataButton.js
Contains functionality for Download as Excel Sheet Button so users can download volunteer information as a .csv file.
### ExportTreeRequestsButton.js
Contains functionality for Download as Excel Sheet Button so users can download tree request information as a .csv file.
### Landing.js
Displays Login component upon initial website load.
### Leaderboard.js
Displays the top 5 schools with the most tree orders within a 2 week time period as well as the current school's tree orders.
### Login.js
Serves a login page; users must supply correct username (event.id) and password to proceed to next page.
### Skeleton.js
Displays the appropriate stage according to the school's flags in the scheduler table.
### StageOne.js
Displays sponsors and 2022 impact picture.
### StageTwo.js
Displays tree requests and sponsors.
### ToDo.js
Displays To-Do List; different bullet points will appear depending on the school's flags in the scheduler table.
Inputs: flags
Sample call from a different component:   
`<ToDo flags={flagList} />`     
Inside ToDo.js, access the prop value with the notation:    
`props.flags`

## Excel Sheet - Common Issues
If Download as Excel Sheet Button outputs.csv file with strange symbols, check logic in ExportDataButton.js for volunteer data issues or ExportTreeRequestsButton.js for tree request data issues. (Most likely an issue with column order).

## Styling
Nearly all styling is contained inside `App.css`.
In order to apply styling from `App.css`, use:   
Code inside `App.css`:
```
.myCSSClass {
    text-align: center;
}
```
Code inside React component:
```
<div className = "myCSSClass">
    Sample Text
</div>
```