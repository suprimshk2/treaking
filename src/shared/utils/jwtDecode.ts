import jwt_decode from 'jwt-decode';

export const jwtDecode = (token: string) => {
  const decodedData = jwt_decode(token);
  return decodedData;
};
