module.exports = {
  apps: [
    {
      name: "cosmos",
      script: "index.ts",
      // Specify the interpreter to be ts-node to run TypeScript files
      interpreter: "./node_modules/.bin/ts-node",
      // More configurations can be added here
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
