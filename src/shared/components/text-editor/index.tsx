import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';

function TextEditor() {
  const [value, setValue] = useState('');

  return (
    <div className="container">
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  );
}

export default TextEditor;
