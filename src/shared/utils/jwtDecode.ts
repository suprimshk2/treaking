import { jwtDecode } from 'jwt-decode';

export const decodeJwt = (token: string) => {
  const decodedData = jwtDecode(token);
  return decodedData;
};
