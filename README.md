# To Build and Run 20

1. Install dependencies with node: `npm install`
2. Create build directory: `mkdir build`
3. Run JavaScript preprocessor: `npx babel --watch src --out-dir build --presets react-app/prod`
4. Create a .env file and add the following key: `API_KEY={spoonacular-api-key}`
4. Run the app: `node server.js`
