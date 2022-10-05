const express = require('express');
const cors = require('cors');
require("./config/db");

const userRouter = require("./routes/user.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);

// app.get("/", (req, res, next) =>{
//     res.sendFile(__dirname + "/./views/index.html");
// });


app.get((req, res, next) =>{
    res.status(404).json({
        message: "Not Found"
    });
});

// error handler
app.use((err, req, res, next)=> {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


module.exports = app;