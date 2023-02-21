const express = require('express');
const { createProxy } = require('./utils/proxy');
const { createPdf } = require('./utils/createPdf');
const { translateString } = require('./utils/translateString');
const { SERVER_PORT } = require('./utils/configuration');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/upload-text', async (req, res) => {
    const originalText = req.body.text;
    const originalLanguage = 'pl';
    let englishText, germanText, spanishText;
    try {
        englishText = await translateString(originalText, {
            from: originalLanguage,
            to: 'en',
        });
        germanText = await translateString(originalText, {
            from: originalLanguage,
            to: 'de',
        });
        spanishText = await translateString(originalText, {
            from: originalLanguage,
            to: 'es',
        });
    } catch (error) {
        res.send({ error: 'Translating error.' });
        return;
    }

    let resultPdf;
    try {
        resultPdf = await createPdf([originalText, englishText, germanText, spanishText]);
        res.setHeader('Content-Length', resultPdf.length);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=translation.pdf');
        res.end(resultPdf);
    } catch (error) {
        console.error(error);
        res.send({ error: 'Creating PDF error.' });
        return;
    }
});

createProxy(app, '/', 'http://localhost:3000/');

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));
