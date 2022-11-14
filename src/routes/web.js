'use strict';

const newsRoute = require('./news');
const coursesRoute = require('./courses');
const homeRoute = require('./home');
const userRoute = require('./user');

const route = (app) => {
    app.use('/courses', coursesRoute);
    app.use('/news', newsRoute);
    app.use('/me', userRoute);
    app.use('/', homeRoute);
};

module.exports = route;
