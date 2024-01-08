import { IAddress } from 'shared/interfaces/misc';

interface IProps {
  address?: Partial<IAddress>;
  showInSingleLine?: boolean;
}

export function Address({ address, showInSingleLine }: IProps) {
  if (!address) {
    return <>N/A</>;
  }

  const { addressLine1, addressLine2, city, state, zipCode } = address;

  if (!addressLine1 && !city && !state && !zipCode) {
    return <>N/A</>;
  }

  if (showInSingleLine) {
    return (
      <>
        {addressLine1 ? `${addressLine1}, ` : ''}
        {addressLine2 ? `${addressLine2}, ` : ''}
        {city ? `${city}, ` : ''}
        {state ? `${state} ` : ''}
        {zipCode}`;
      </>
    );
  }

  return (
    <span>
      {address.addressLine1 && (
        <span>
          {address.addressLine1}
          {address.city && <br />}
        </span>
      )}

      {address.city}
      {(address.state || address.zipCode) && (
        <span>
          ,{address.city && ' '}
          {!address.city && <br />}
        </span>
      )}
      {address.state}
      {address.state && ' '}
      {address.zipCode}
    </span>
  );
}

Address.defaultProps = {
  address: null,
  showInSingleLine: false,
};
