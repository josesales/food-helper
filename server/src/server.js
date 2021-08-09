const app = require('./app');

const port = process.env.PORT;

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log('Server up on port ' + port);
});
