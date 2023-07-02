module.exports = {
  baseUrl: "http://localhost:3000/hw/store",
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      screenshotDelay: 100,
      // retry: 5,
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080
      }
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
