var gulp = require('gulp');
var sonarqubeScanner = require('sonarqube-scanner');
 
gulp.task('default', function(callback) {
  sonarqubeScanner({
    serverUrl : "https://localhost:9000",
    options : {
      "sonar.organization": "cdc.eip"
    }
  }, callback);
});