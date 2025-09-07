# Adopt Me
A CRUD app that uses a form to manage a database of pets up for adoption. React, SCSS, and dynamoDB 

[Live website ](https://pet-adoption-project-five.vercel.app/)

## Features 
- Users can add a pet 
- Users can update pet information
- Users can delete a pet 

## Project Steps
- Created a project with ```npm create vite@latest , npm install, npm run dev```
- Installed dependencies ```npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb, npm install @mui/material @emotion/react @emotion/styled, npm install sass --save-dev```
- Made ```.env.local``` file and added the security credentials (Access key ID & Secret access key).
- Built a helper module (```dynamo.js```) in Utils folder to hold the AWS code
- Made a component folder and created file ```Main.jsx``` and added function containing useState, useEffect, CRUD, and sections for the UI.
- Styled with SCSS and Material UI
- installed testing dependencies ```npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom``` and ```npm install aws-sdk-client-mock```
- added a test script in ```package.json```
- created testing file ```dynamo.vitest.test.js``` in Utils folder and added tests for createItem, listAllItems and deleteItem
- ran the test with npm tests
- Ran npm run build

## Technologies Used 
- React
- DynamoDB
- SCSS
- Material UI