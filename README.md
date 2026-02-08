# Longhorn Neurotech Website (LHNT)

This repository contains the LHNT website frontend (Vite + React) and a lightweight Node backend (in `server/`) used to communicate with the PostgresSQL database on Amazon Lightsail.

It's also important to know that this website is currently a full stack web application. The website is currently hosted on an Amazon Lightsail instance, not on GitHub! A PostgresSQL database named LHNTWebServer is already setup on Amazon Lightsail to be the database for where data on the website is stored (currently onboarding progress for each member is stored there). The website's backend (basically the `server/` folder) is already currently setup to the communicate with that PostgresSQL database.

## Getting Started (Local Development)
The following steps below are there to get started with running the LHNT website locally in your computer. While the website is run locally in your computer, any changes you made doesn't affect the LHNT website that is currently publicly available at https://lhneurotech.com. 

The steps for bringing the changes to that publicly available website is very different and more complex from the steps here. Ensure that any changes you made to the website running locally doesn't crash that website you ran locally because those same changes can crash the publicly available website.

### Prerequisites
You will need Node.js and npm installed before you get started.
- Node.js 18+ (Node 22 is fine)
- npm


### 1) Clone this repository by copying the HTTPS URL of this repo and running this following command in your Terminal:
```bash
   git clone https://github.com/LonghornNeurotech/LHNT.git
```

### 2) Install dependencies

From the project root, run the following command  in your Terminal below:
```bash
npm install
```

### 3) Configure frontend env

Create `.env.local` in the project root and add this into the new file:

```
VITE_API_BASE_URL=http://localhost:8080
```




### 3) Run the backend API locally on your computer

Create `server/.env` and paste in the contents of the .env file that will be provided by the UX/UI Lead in that new file(for security reasons, these .env file credentials are not publicly displayed on this README file). In Terminal, navigate to the server directory and then run the following commands one command at a time in your Terminal:

```bash
cd server
npm install
npm run start
```

Wait a bit after you ```npm run start``` command for the backend API to finish starting. If you see the message `Progress API listening on :8080` in your Terminal, then the backend API is currently runnning now. 


### 4) Run the website's frontend locally 

Ensure that the backend API is currently running in one terminal now. Then, open a new terminal and navigate to the project root. Then run the following command in that new terminal:

```bash
npm run dev
```

The website that is running locally on your computer will be available at:

```
http://localhost:5173
```

## Useful Scripts

From the project root:

- `npm run dev` — start frontend dev server

From `server/`:

- `npm run start` — start backend API

## Folder Overview

```
/
├─ src/              # React app source
├─ public/           # Static assets
├─ server/           # Backend API (Express + PostgreSQL)
└─ dist/             # Production build output (generated)
```

## Important Tips
* Any change to any file in the server/ folder is a "backend change". Any change to any file outside the server/ folder is a  "frontend change". 