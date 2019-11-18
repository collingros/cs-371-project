// Add controllers
const temp = require('./controllers/temp');
const signup = require('./controllers/signup');
const login = require('./controllers/login');
const update = require('./controllers/update');

module.exports = (app) => {
// GET api/device *retrieve data to client*
    app.get('api/tempC', temp.getAllC());
    app.get('api/tempF', temp.getAllF());

// POST api/device *create*
    app.post('signup', signup);
    app.post('login', login);


// PATCH api/device *need to modify without modifying other parts*
    app.patch('user/update', update);

// PUT api/device *create or replace*


// DELETE api/device *delete*
}