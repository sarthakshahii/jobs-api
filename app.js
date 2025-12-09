const swaggerDocs = require('./swagger');
require('dotenv').config();
const express= require('express');
const app= express();

const connectDB= require('./db/connect');
const authenticateUser= require('./middleware/authentication');

const authRouter= require('./routes/auth');
const jobsRouter= require('./routes/jobs');

const notFoundMiddleware= require('./middleware/not-found');
const errorHandlerMiddleware= require('./middleware/error-handler');

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authenticateUser ,jobsRouter);
app.get('/', (req, res) => {
  res.send('Jobs API is running...');
});

swaggerDocs(app);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = Number(process.env.PORT);

if (!port) {
  throw new Error('PORT is not defined');
}


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(Number(process.env.PORT), () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};
start();
