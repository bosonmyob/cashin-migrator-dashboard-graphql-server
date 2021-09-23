# cashin-migrator-dashboard-graphql-server
a graphql server for cashin migrator dashboard

## Tech
- Serverless
- Apollo GraphQL server for lambda
- API Gateway

## Prerequisite

- node version `>=14.0.0`

## How To Run

- login to aws account
- check prerequisite
- run `npm install` to install all dependencies
- run `npm run start` to start the application with nodemon


## How To Deploy

- login to aws account
- run `npm run deploy:sit` to deploy the application to `sit` stack. (case sensitive)
- run `npm run deploy:prod` to deploy the application to `prod` stack. (case sensitive)
