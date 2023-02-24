const fs = require('fs');
const path = require('path');
const fontkit = require('@pdf-lib/fontkit');
const { PDFDocument, rgb } = require('pdf-lib');

let fontBytes = null;

const createPdf = async (texts, fontSize = 12) => {
    if (fontBytes === null) {
        fontBytes = await fs.promises.readFile(
            path.join(__dirname, '..', 'resources', 'Ubuntu-R.ttf')
        );
    }
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const ubuntuFont = await pdfDoc.embedFont(fontBytes);

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
            lineHeight: 1.3 * fontSize,
        });
    }

    return await pdfDoc.save();
};

module.exports = createPdf;
