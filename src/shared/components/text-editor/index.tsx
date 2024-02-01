/* eslint-disable import/no-extraneous-dependencies */
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ReactDOMServer from 'react-dom/server';
import { compiler } from 'markdown-to-jsx';
import TurndownService from 'turndown';
import { Typography, useTheme } from '@mui/material';

function TextEditor({
  name,
  height = 290,
  placeholder = '',
}: {
  name: string;
  height?: number;
  placeholder?: string;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const turndownService = new TurndownService();
  const [text, setText] = useState('');
  const { setValue, getValues } = useFormContext();
  const description = getValues(name);
  const theme = useTheme();
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
      <Typography
        pb={1}
        sx={theme.typography.bodyTextMedium}
        color={theme.palette.gray.dark}
      >
        {placeholder || ''}
      </Typography>
      <MDEditor
        extraCommands={[
          commands.codeEdit,
          commands.codePreview,
          commands.codeLive,
        ]}
        height={height}
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
