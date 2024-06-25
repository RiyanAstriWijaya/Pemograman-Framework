const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());

app.use('/', router);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.json({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
});


app.listen(3000, ()=>{
    console.log('Server runing on port 3000');
});