const authRouter = require('./auth.router');
const calendarRouter = require('./calendar.router');
const teamRouter = require('./team.router');
const todosRouter = require('./todos.router');

const route = (app) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/calendars', calendarRouter);
  app.use('/api/v1/team', teamRouter);
  app.use('/api/v1/todos', todosRouter);
};

module.exports = route;
