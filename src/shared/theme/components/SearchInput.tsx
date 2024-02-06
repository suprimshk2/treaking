import { useMemo, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { debounce } from 'shared/utils/lodash';
import Input from './Input';

interface IProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChangeHandler: (v: string) => void;
  onDebouncedChangeHandler: (v: string) => void;
  fullWidth?: boolean;
}

export function SearchInput({
  id = 'Search',
  name = 'searchText',
  placeholder,
  value,
  onChangeHandler,
  onDebouncedChangeHandler,
  fullWidth,
}: IProps) {
  const onDebouncedChangeHandlerRef = useRef(onDebouncedChangeHandler);

  const handleDebounceChange = useMemo(
    () =>
      debounce(async (v: string) => {
        if (v.length > 2 || !v.length)
          onDebouncedChangeHandlerRef.current(v.trim());
      }, 600),
    []
  );

  const onChange = (v: string) => {
    onChangeHandler(v);
    handleDebounceChange(v);
  };

  return (
    <Input
      id={id}
      name={name}
      width={fullWidth ? '100%' : 400}
      value={value}
      placeholder={placeholder}
      prefix={<BsSearch />}
      onChange={(event) => onChange(event.target.value)}
      autoComplete="off"
    />
  );
}

SearchInput.defaultProps = {
  id: 'search-input',
  name: 'searchText', // Adding search will auto preffill
  placeholder: 'Search',
  fullWidth: false,
};
