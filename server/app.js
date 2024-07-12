const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const removeHeaders = require('./middleware/removeHeaders');
const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(removeHeaders);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(morgan('dev'));
const indexRouter = require('./routers/index.routes');
app.use('/api', indexRouter);
app.listen(PORT, () => {
    console.log(`работает порт ${PORT}`);
  });