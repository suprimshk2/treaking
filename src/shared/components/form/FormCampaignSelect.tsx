import {
  Autocomplete,
  Box,
  FilterOptionsState,
  FormControl,
  MenuItem,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { ISelectProps } from 'shared/theme/components/Select';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useCampaignQuery } from 'features/quiz/queries';
import { ICampaignResponse } from 'features/quiz/interfaces';
import { useState } from 'react';

export function FormCampaignSelect({
  name,
  placeholder,
  clearable,
  ...others
}: Omit<ISelectProps, 'children'>) {
  const {
    control,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();
  const filters = useBoundStore.use.quizTableFilters();
  const { data } = useCampaignQuery(filters, {
    enabled: true,
  });
  const campaignId = watch(name)?.id || '';
  console.log(errors[name], 'errors[name]');
  const [changeValue, setValueChanged] = useState(false);

  const handleClear = () => {
    setValue(name, '');
  };
  const filterOptions = (
    options: ICampaignResponse[],
    state: FilterOptionsState<ICampaignResponse>
  ) => {
    const keyword = state.inputValue.toLowerCase();
    const optionList = options?.filter(
      (option) =>
        option.code?.toLowerCase().includes(keyword) ||
        option.name?.toLowerCase().includes(keyword)
    );
    console.log({ optionList });

    return optionList;
  };
  console.log(data, 'data');

  // return (
  //   <Autocomplete
  //     // disableClearable
  //     filterOptions={filterOptions}
  //     // freeSolo
  //     id="campaign-autocomplete"
  //     onChange={(event, newValue) => console.log(newValue, 'nw')}
  //     options={data ? data : []}
  //     renderInput={(params) => (
  //       <FormControl fullWidth variant="standard">
  //         <TextField
  //           onChange={() => !changeValue && setValueChanged(true)}
  //           {...params}
  //           className="filled-variant"
  //           InputProps={{
  //             ...params.InputProps,
  //             type: 'Search',
  //           }}
  //           name="campaign"
  //           placeholder="Search"
  //           size="small"
  //         />
  //       </FormControl>
  //     )}
  //     sx={{ marginTop: `5px !important` }}
  //   />
  // );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          {...others}
          value={campaignId}
          placeholder={placeholder || 'Select campaign'}
          color={errors[name] ? 'error' : undefined}
          hint={(errors[name]?.message as string) ?? ''}
          clearable={clearable}
          handleClear={handleClear}
          onChange={(item) => {
            const vendor = data?.find(
              (el) => el.campaignId === item.target.value
            );

            setValue(name, {
              id: vendor?.campaignId,
              name: vendor?.name,
            });
            clearErrors(name);
          }}
        >
          {data?.map?.((campaign) => (
            <MenuItem value={campaign?.campaignId} key={campaign?.campaignId}>
              {campaign?.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
