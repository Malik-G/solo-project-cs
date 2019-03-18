
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const tradeBlockRouter = require('./routes/tradeBlock.router')
const portfolioRouter = require('./routes/portfolio.router');
const memberPortfolioRouter = require('./routes/memberPortfolio.router')
const communityRouter = require('./routes/community.router');
const watchListRouter = require('./routes/watchList.router');
const messagingRouter = require('./routes/messaging.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/trade-block', tradeBlockRouter)
app.use('/api/portfolio', portfolioRouter);
app.use('/api/member-portfolio', memberPortfolioRouter);
app.use('/api/community', communityRouter);
app.use('/api/watch-list', watchListRouter);
app.use('/api/messaging', messagingRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
