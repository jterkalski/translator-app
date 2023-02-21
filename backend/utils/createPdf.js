const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const fontkit = require('@pdf-lib/fontkit');

let fontBytes = null;

const createPdf = async (texts) => {
    if (fontBytes === null) {
        fontBytes = await fs.promises.readFile(
            path.join(__dirname, '..', 'resources', 'Ubuntu-R.ttf')
        );
    }
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const ubuntuFont = await pdfDoc.embedFont(fontBytes);
    const fontSize = 12;

    for (const text of texts) {
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        page.drawText(text, {
            maxWidth: width - 2 * 10,
            x: 20,
            y: height - fontSize - 10,
            size: fontSize,
            font: ubuntuFont,
            color: rgb(0, 0, 0),
            lineHeight: 16,
        });
    }

    return await pdfDoc.save();
};

module.exports = {
    createPdf,
};
