import { Config } from "@remotion/cli/config";

Config.setRspack(false);
Config.setCachingEnabled(false);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
Config.setBrowserExecutable("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    cache: false,
  };
});
