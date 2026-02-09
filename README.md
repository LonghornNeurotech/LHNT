# Longhorn Neurotech Website (LHNT)

This repository contains the LHNT website frontend (Vite + React) and a lightweight Node backend (`server/` folder) used to communicate with the PostgresSQL database on Amazon Lightsail.

It's also important to know that **this website is currently a full stack web application.** The website is currently hosted on an Amazon Lightsail instance, not on GitHub! A PostgresSQL database named LHNTWebDatabase is already setup on Amazon Lightsail to be the database for where data on the website is stored (currently onboarding progress for each member is stored there). The website's backend (basically the `server/` folder) is already currently setup to continue communicating with that PostgresSQL database.

## Getting Started (Local Development)
The following steps below are there to get started with running the LHNT website locally in your computer. **While the website is run locally in your computer, any changes you made to that locally run website doesn't affect the LHNT website that is currently publicly available at https://lhneurotech.com.** 

The steps for bringing the changes to that publicly available website is very different and more complex from the steps here, so those steps are not covered here. Ensure that any changes you made to the website running locally doesn't crash that website you ran locally because those same changes can crash the publicly available website.

### Prerequisites
You will need Node.js and npm installed before you get started. npm is automatically installed alongside Node.js when you have installed Node.js.
- Node.js 18+ (Node 22 is fine)
- npm

You can check if you have Node.js installed by running this following command in your Terminal:
```bash
node -v

## If you got an output v##.##.# (for example: v22.14.0), then you have Node.js of the specified version number installed.
## If you don't, then you don't have Node.js installed yet. So, you'll need to install Node.js.
```

You can check if you have npm installed by running this following command in your Terminal: 
```bash
npm -v 

## If you got an output v##.##.# (for example: v11.3.0), then you have npm of the specified version number installed.
## If you don't, then you don't have npm installed yet.
```

### 1) Clone this repository by running this following command in your Terminal:
```bash
git clone https://github.com/LonghornNeurotech/LHNT.git
```

### 2) Install dependencies needed for the website's frontend
From the project root (`LHNT` folder), run the following command in your Terminal below:
```bash
npm install
```

### 3) Configure frontend env for the locally run website to reach out to the website's backend API
Create `.env.local` file in the project root and add this into the new file:
```
VITE_API_BASE_URL=http://localhost:8080
```

### 4) Configure backend API env to be able to run the website's backend API locally
Create a new .env file in the `server` folder and add in the contents as specified by Phuc in that new .env file (known as `server/.env`). For security reasons, the contents of this `server/.env` file are not publicly disclosed on this README file. 

If there is no `server/.env` file with the correct contents, the backend API will not run.

### 5) Install dependencies needed for the website's backend API
In Terminal, run the following commands one command at a time in your Terminal:
```bash
cd server       
npm install
```

### 6) Run the website's backend API locally in your computer
In your current Terminal, you must be currently at the server folder and then run this following command: 
```bash
npm run start
```

Wait a bit after you ran ```npm run start``` command for the backend API to finish starting. If you see the message `Progress API listening on :8080` in your Terminal, then the backend API is currently runnning now. 

### 7) Run the website's frontend locally 
Ensure that the backend API is currently running in one Terminal now. Then, open a new Terminal and navigate to the project root. Then run the following command in that new Terminal:
```bash
npm run dev
```

The website that is running locally on your computer will be available at the following address `http://localhost:5173` and you can easily visit that website by right-clicking on that link displayed in your Terminal and opening it in your browser. Copying that link and directly pasting in your browser also works too!

### 8) Next Steps 
Overall, there are 2 separate terminals already opened up in your terminal. One terminal is currently at the /server folder and is running the backend API. The other terminal is currently at the project root and is locally running the website in your computer.

You can stop running the backend API by holding Ctrl and C down at the same time in the terminal that is currently running the backend API. 
You can stop running the website in your computer by holding Ctrl and C down at the same time in the terminal that is currently locally running the website.

If you want to locally run the website again in your computer, then...
1) Create 2 separate terminals
2) Have 1 terminal currently at the server folder and then run the `npm run start` command to run the backend API.
3) Have 1 terminal currently at the project root (LHNT) and then run the `npm run dev` command to run the website.

## Useful Scripts
From the project root:
- `npm run dev` — start frontend dev server

From `server/`:
- `npm run start` — start backend API

## Folder Overview
```
LHNT                 # Project root
├─ src/              # React app source
├─ public/           # Static assets
├─ server/           # Backend API (Express + PostgreSQL)
└─ dist/             # Production build output (generated)
```

## Important Tips to Know
* Any change to any file in the `server/` folder is a "backend change". 
* Any change to any file outside the `server/` folder is a  "frontend change". 