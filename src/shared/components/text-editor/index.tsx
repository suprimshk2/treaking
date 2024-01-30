import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ReactDOMServer from 'react-dom/server';
import { compiler } from 'markdown-to-jsx';
import TurndownService from 'turndown';

function TextEditor({ name }: { name: string }) {
  const turndownService = new TurndownService();
  const [text, setText] = useState('');
  const { setValue, getValues, watch } = useFormContext();
  const description = getValues(name);

  useEffect(() => {
    if (description && !text) {
      const htmlString = turndownService.turndown(description);
      setText(htmlString);
    }
  }, [description, text, turndownService]);

  const onChange = (data: any) => {
    setText(data);
    const compilerData = compiler(data);
    const htmlString = ReactDOMServer.renderToStaticMarkup(compilerData);
    setValue(name, htmlString || '');
  };

  return (
    <div className="max-w-[736px]" data-color-mode="light">
      <div className="wmde-markdown-var" />
      <MDEditor
        extraCommands={[
          commands.codeEdit,
          commands.codePreview,
          commands.codeLive,
        ]}
        height={290}
        preview="edit"
        style={{
          backgroundColor: 'transparent',
        }}
        value={text}
        onChange={onChange}
      />
    </div>
  );
}

export default TextEditor;
