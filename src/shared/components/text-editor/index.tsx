/* eslint-disable import/no-extraneous-dependencies */
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import ReactDOMServer from 'react-dom/server';
import { compiler } from 'markdown-to-jsx';
import TurndownService from 'turndown';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material';
import { useLookUpQuery } from 'shared/queries';
import { CenterRowSpaceBetween } from '../layouts/CenterRowSpaceBetween';

function TextEditor({
  name,
  height,
  label,
  checkBoxEnabled,
  param = '',
  fieldError,
}: {
  name: string;
  height?: number;
  label?: string;
  checkBoxEnabled?: boolean;
  param?: string;
  fieldError?: FieldError;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const turndownService = new TurndownService();
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const [text, setText] = useState('');
  const value = watch(name);

  const description = getValues(name);
  const [checkBox, setCheckBox] = useState(true);
  const theme = useTheme();
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

  useEffect(() => {
    if (value && !text) {
      const markdownString = turndownService.turndown(value);
      setText(markdownString);
    }
  }, [value]);

  const onChange = (data: any) => {
    setText(data);
    const compilerData = compiler(data);
    const htmlString = ReactDOMServer.renderToStaticMarkup(compilerData);
    setValue(name, htmlString || '');
    clearErrors(name);
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
        <Typography
          variant="bodyTextMedium"
          color={
            fieldError || errors[name]
              ? theme.palette.error.main
              : 'rgb(102, 102, 102)'
          }
        >
          {label}
        </Typography>
        {checkBoxEnabled && (
          <FormControlLabel
            control={
              <Checkbox
                value={checkBox}
                checked={checkBox}
                onChange={(e: any) => {
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
        height={height}
        preview="edit"
        style={{
          border: fieldError || errors[name] ? '1px solid red' : undefined,
          backgroundColor: 'transparent',
        }}
        value={text}
        onChange={onChange}
      />
      {fieldError?.message ||
        (errors[name] && (
          <Typography mt={2} color="error">
            {(fieldError?.message || (errors[name]?.message as string)) ?? ''}
          </Typography>
        ))}
    </div>
  );
}

TextEditor.defaultProps = {
  height: 290,
  label: 'Description',
  checkBoxEnabled: false,
  param: '',
  fieldError: undefined,
};

export default TextEditor;
