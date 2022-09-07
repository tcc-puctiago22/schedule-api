module.exports= function act() {

    const actuator = require('express-actuator');
    const options = {
            basePath: '/management', // It will set /management/info instead of /info
            infoGitMode: 'simple', // the amount of git information you want to expose, 'simple' or 'full',
            infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
            infoDateFormat: null, // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
            customEndpoints: [] // array of custom endpoints
    };

  actuator(options);
  
  return actuator
}