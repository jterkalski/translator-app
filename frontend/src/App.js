import React, { useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
    const [text, setText] = useState('');
    const textareaRef = useRef();

    const handleChange = () => {
        setText(textareaRef.current.value);
    };

    const handleDownload = () => {
        axios
            .post('/upload-text', { text: text }, { responseType: 'blob' })
            .then((response) => {
                const url = URL.createObjectURL(response.data);
                const a = document.createElement('a');
                a.style = 'display: none';
                a.href = url;
                a.download = 'translation.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
                alert(
                    'Text translation error.\nIf the error persists, please contact website administrator.'
                );
            });
    };

    return (
        <div className='app'>
            <div className='header'>Enter the text:</div>
            <textarea
                ref={textareaRef}
                onChange={handleChange}
                placeholder='Type something...'
                spellCheck={false}
            />
            <button onClick={handleDownload}>Download PDF</button>
        </div>
    );
};

export default App;
