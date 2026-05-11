# ShopEase Backend

## Installation
1. Clone the repository.
2. Navigate to the backend directory: `cd apps/backend`
3. Install dependencies: `npm install`
4. Copy the `.env.example` file to `.env` and fill in the required values.

## Migration
Run the following command to set up the database:
```bash
npm run migrate
```

## Running the Application
To start the application in development mode, run:
```bash
npm run dev
```

## Build
To build the application, run:
```bash
npm run build
```

## Verification
To verify the setup, run:
```bash
npm install
npm run migrate
node --check src/index.js
npm run build
```