const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    proxy: {
      "/get_token": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
});
