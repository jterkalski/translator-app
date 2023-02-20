const express = require('express');

const app = express();
app.get('/path/to/endpoint', (req, res) => {
    res.send(req.session.id);
});

app.listen(8080, () => {
    console.log('app running on port 8080');
});
