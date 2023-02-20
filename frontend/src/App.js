import React, { useRef, useState } from 'react';

const App = () => {
    const [text, setText] = useState('');
    const textareaRef = useRef();

    const handleChange = () => {
        setText(textareaRef.current.value);
    };

    return (
        <textarea
            ref={textareaRef}
            onChange={handleChange}
            placeholder='Aa'
            style={{ padding: '0.5rem' }}
        />
    );
};

export default App;
