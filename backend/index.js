const express = require('express');
const translate = require('translate');
const createPdf = require('./utils/createPdf');

const app = express();

const SERVER_PORT = process.env.SERVER_PORT ?? 8080;

app.use(express.json());

app.post('/upload-text', async (req, res) => {
    const originalText = req.body.text;
    const originalLanguage = 'pl';
    let englishText, germanText, spanishText;
    try {
        englishText = await translate(originalText, {
            from: originalLanguage,
            to: 'en',
        });
        germanText = await translate(originalText, {
            from: originalLanguage,
            to: 'de',
        });
        spanishText = await translate(originalText, {
            from: originalLanguage,
            to: 'es',
        });
    } catch (error) {
        console.error('Text translation error.', error);
        res.sendStatus(500);
        return;
    }

    let pdfData;
    try {
        pdfData = await createPdf([originalText, englishText, germanText, spanishText]);
    } catch (error) {
        console.error('PDF creation error.', error);
        res.sendStatus(500);
        return;
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfData.length);
    res.setHeader('Content-Disposition', 'attachment; filename=translation.pdf');
    res.end(pdfData);
});

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}.`));
