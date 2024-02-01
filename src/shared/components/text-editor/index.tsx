/* eslint-disable import/no-extraneous-dependencies */
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ReactDOMServer from 'react-dom/server';
import { compiler } from 'markdown-to-jsx';
import TurndownService from 'turndown';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useLookUpQuery } from 'shared/queries';
import { CenterRowSpaceBetween } from '../layouts/CenterRowSpaceBetween';

function TextEditor({
  name,
  label = 'Description',
  checkBoxEnabled = false,
  param = '',
}: {
  name: string;
  label?: string;
  checkBoxEnabled?: boolean;
  param?: string;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const turndownService = new TurndownService();
  const [text, setText] = useState('');
  const { setValue, getValues } = useFormContext();
  const description = getValues(name);
  const [checkBox, setCheckBox] = useState(true);

  const lookUpQuery = useLookUpQuery(
    {
      key: 'code',
      value: param,
    },
    checkBox && !!param
  );

  useEffect(() => {
    // If the functionality of this TextEditor extends more than this than seperate this
    if (lookUpQuery.data?.data?.rows?.length && checkBox && !text) {
      const value = lookUpQuery.data?.data?.rows?.[0].metadata.payload;
      const markdownString = turndownService.turndown(value);
      setValue(name, markdownString);
      setText(markdownString);
    }
  }, [
    description,
    lookUpQuery.data?.data?.rows,
    name,
    setValue,
    turndownService,
    checkBox,
    text,
  ]);

  useEffect(() => {
    if (description && !text) {
      const markdownString = turndownService.turndown(description);
      setText(markdownString);
    }
  }, [description, text, turndownService]);

  const onChange = (data: any) => {
    setText(data);
    const compilerData = compiler(data);
    const htmlString = ReactDOMServer.renderToStaticMarkup(compilerData);
    setValue(name, htmlString || '');
  };

  const onChangeCheckValue = (isChecked: boolean) => {
    if (isChecked) {
      setText('');
      setValue(name, '');
    }
  };

  return (
    <div data-color-mode="light">
      <CenterRowSpaceBetween>
        <Typography variant="bodyTextMedium" color="rgb(102, 102, 102)">
          {label}
        </Typography>
        {checkBoxEnabled && (
          <FormControlLabel
            control={
              <Checkbox
                value={checkBox}
                checked={checkBox}
                onChange={(e) => {
                  setCheckBox((prev) => !prev);
                  onChangeCheckValue(e);
                }}
              />
            }
            label="Use Default Description"
          />
        )}
      </CenterRowSpaceBetween>
      <div style={{ marginBottom: 6, fontSize: '24px' }} />
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

TextEditor.defaultProps = {
  label: 'Description',
  checkBoxEnabled: false,
  param: '',
};

export default TextEditor;
