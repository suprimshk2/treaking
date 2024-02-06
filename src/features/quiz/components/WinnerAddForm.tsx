import { Grid, Box, IconButton } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { useState } from 'react';

import { BsPlusLg, BsX } from 'react-icons/bs';
import { useFormContext, useFieldArray } from 'react-hook-form';
import Checkbox from 'shared/theme/components/Checkbox';
import { FormGameParticipantsSelect } from './FormGameParticipantSelect';

interface IProps {
  isEditMode?: boolean;
  gameId: string;
}

export function WinnerAddEditForm({ isEditMode, gameId }: IProps) {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const [checkBox, setCheckBox] = useState(false);
  console.log({ checkBox });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'winners',
  });
  const onAddWinner = () => {
    append([{ id: '', rank: 1, rankLabel: '', name: '' }]);
  };
  const onChange = () => {
    setCheckBox((prev) => !prev);
  };
  setValue('applyToAllQuizInCampaign', checkBox);

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Grid container spacing={4} key={item.id} mb={2}>
            <Grid item xs={3}>
              <FormInput
                name={`winners.${index}.rank`}
                id="rank"
                label="Rank"
                type="number"
              />
            </Grid>

            <Grid item xs={4}>
              <FormInput
                name={`winners.${index}.rankLabel`}
                id="rankLabel"
                label="Position"
              />
            </Grid>
            <Grid item xs={index === 0 ? 5 : 4}>
              <FormGameParticipantsSelect
                gameId={gameId}
                name={`winners.${index}.name`}
                participantsId={`winners.${index}.id`}
                id="name"
                label="Name"
                clearable
              />
            </Grid>

            {index === 0 ? null : (
              <Grid
                item
                xs={1}
                display="flex"
                alignSelf="flex-end"
                justifyContent="flex-end"
              >
                <IconButton size="medium" onClick={() => remove(index)}>
                  <BsX />
                </IconButton>
              </Grid>
            )}
          </Grid>
        );
      })}
      <Grid item xs={1} alignItems="flex-end" mt={4}>
        <Box alignItems="flex-end" justifyContent="flex-end" display="flex">
          <Button
            size={ButtonSize.SMALL}
            variant={ButtonVariant.TEXT}
            prefix={<BsPlusLg />}
            buttonType={ButtonType.NORMAL}
            onClick={onAddWinner}
            sx={{
              alignItems: 'flex-end',
              color: 'black',
              justifyContent: 'flex-end',
            }}
          >
            Add Winner
          </Button>
        </Box>
      </Grid>
      <Grid item xs={1} alignItems="flex-end" mt={4}>
        <Checkbox
          label="Apply to all question within this campaign."
          checked={checkBox}
          onChange={onChange}
        />
      </Grid>
    </>
  );
}

WinnerAddEditForm.defaultProps = {
  isEditMode: false,
};
