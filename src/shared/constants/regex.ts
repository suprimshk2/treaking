export const regex = {
  PHONE: /^[0-9]{10}$/,
  NUMBER: /^(?=.*\d)(?=.{1,10}$)\d+$/,
  SPECIAL_CHARACTER:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
};
