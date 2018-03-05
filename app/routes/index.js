const noteRoutes = require('./employees_routes');

module.exports = function(app,db){
  noteRoutes(app, db);
};