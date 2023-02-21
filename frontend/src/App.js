import React, { useRef, useState } from 'react';
import './App.css';

const App = () => {
    const [text, setText] = useState('');
    const textareaRef = useRef();

    const handleChange = () => {
        setText(textareaRef.current.value);
    };

    return (
        <div className='app'>
            <div className='header'>Enter the text:</div>
            <textarea ref={textareaRef} onChange={handleChange} placeholder='Aa' />
            <button>Download PDF</button>
        </div>
    );
};

export default App;
