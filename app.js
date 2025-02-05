require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
//const rateLimiter = require('express-rate-limit')


const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
//app.use(rateLimiter())
app.use(express.static("public"));


// routes
//app.get('/', (req, res) => {
  //res.send('jobs api')
  // });

const apiRouter = express.Router();
app.use('/api/v1', apiRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {

  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
