
This is A nest.js backend RESTful api for Orders.

# Technologies used

-   Postman
-   Node.js
-   Nestjs
-   Restful API
-   Prisma
-   Postgres sql



# How to use

## 1. Clone Project into your local machine

```
git clone https://github.com/nelsoniseru/mypro.git

```

## 2. Go into authService folder and install project dependencies.

```
cd authService && yarn install
```
## 2. Go into orderService folder and install project dependencies.
```
cd orderService && yarn install
```
## 3. Connecting to Database

### Add this key to your env file for both folders:

```

DATABASE_URL=postgresql://postgres:123456@localhost:5432/dbname?schema=public
TOKEN_SECRET= ""
EXPIRES_IN = ""

```

 
## 4. Start project
# run this command on orderservice folder to migrate database schema

```
npx prisma migrate dev --name init
```

# start both projects with this command

```
yarn start:dev
```




> #### You can get the link to postman, please click [here](https://documenter.getpostman.com/view/33482444/2sA35Baims) 


# DEVELOPER
NAME: NELSON ISERU,
JOB-TYPE: BACKEND ENGINEER
NUMBER: +2349026915561


