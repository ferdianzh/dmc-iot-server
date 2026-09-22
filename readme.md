## Description

- Project created using Typescript, Express, & PostgreSQL
- Follow the steps below to run the application
- Required node version 20+ (tested with v24.14.1)

## Setup DB

1. Make sure you already have a PostgreSQL database running
2. Create a database named `dmc_iot`

## Setup MQTT/Mosquitto

1. Make sure you already have a Mosquitto running (for windows make sure the path is added in enviroment variables)
2. Run this command in terminal to check if Mosquitto is running

```bash
mosquitto_sub -h localhost -p 1883 -t "greenhouse/control/+" -v
```

3. Mosquitto will running and waiting for command to be published on topic `greenhouse/control/+`

## Setup Env

1. Copy .env.example into .env or run the following command:

```bash
cp .env.example .env
```

2. Fill in the .env file with the correct database credentials if needed

## Install Dependencies

1. Run this command in terminal

```bash
npm install
```

## Run Database Migration

1. Run this command in terminal

```bash
npx drizzle-kit push
```

## Compile and Run Application

1. Run this command in terminal

```bash
npm run dev
```

2. Application will running at http://localhost:3000
3. If something wrong, check the terminal for the error

## How to Test

1. Open Postman and import Postman Collection at `docs` folder
2. Make sure the postman variable `host` is correct
3. Test by sending a request to each endpoint
