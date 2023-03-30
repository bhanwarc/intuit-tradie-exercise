# Intuit-Tradie

# Frameworks used

`ReactTs: ^17.0.2`
`Yarn: 1.22.10`
`Serverless: >= 3.7` - used for deployment

#### Setup AWS

Install AWS cli, and configure:

```
brew install awscli
aws configure
```

`aws configure` - Enter `AWS Access Key ID` and `AWS Secret Access Key`

# Setup Project Locally

1. Install serverless `npm install -g serverless`
2. Clone repo
3. `cd to/project/root/directory`
4. Setup environment variables in .env file (Refer following section)
5. Install dependencies: `yarn install`
6. Build project: `yarn build`
7. To run on local machin: `yarn start`

# Setup Environment Variables

1. Create `.env` under project root directory
2. Enter following variables into .env file

```
REGION=
REACT_APP_STAGE=
// customer user pool
REACT_APP_C_USER_POOL_ID=
REACT_APP_C_CLIENT_ID=
// tradie user pool
REACT_APP_T_USER_POOL_ID
REACT_APP_T_CLIENT_ID=

REACT_APP_API_URL=
```

# How to deploy

##### From Local Machine:

1. Setup project including the environment variables
2. Run `serverless deploy --stage <STAGE>`
3. Deploy to staging `serverless deploy --stage staging`
4. Deploy to production `serverless deploy --stage production`
   **Note:** Update environment variable as per the stage before deploying

##### Deployment Automation:

1. Merge code or Push to `Main` branch will deploy the production
2. Merge code or Push to `Develop` branch will deploy the staging
