const jsonServer = require('json-server');
const express = require('express');
const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(jsonServer.bodyParser);

// Middleware para autenticação
app.use((req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer ', '');
        const user = router.db.get('users').find({ token }).value();
        if (user) {
            req.user = user;
        }
    }
    next();
});

app.use('/api', router);

app.listen(3001, () => {
    console.log('JSON Server is running');
});
