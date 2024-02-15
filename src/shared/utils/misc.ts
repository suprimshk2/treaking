import DOMPurify from 'dompurify';
import { IAddress } from 'shared/interfaces/misc';
import { omit, pickBy, size, truncate } from './lodash';

/**
 * RetryDelay is set to double (starting at 3000ms) with each attempt, but not exceed 30 seconds
 *
 * @param {number} attemptIndex
 * @returns {number} :: retryDelay
 */
export const getRetryDelay = (attemptIndex: number) => {
  return Math.min(3000 * 2 ** attemptIndex, 30000);
};

/**
 * Converts hex to rgba
 *
 * @param {string} hex
 * @param  {number} alpha
 * @returns {string}
 *
 * @example
 * hexToRgbA('#fbafff', 1) => rgba(251,175,255,1)
 *
 */
export const hexToRgbA = (hex: string, alpha = 1) => {
  // Need to specify 'any' type for bitwise operation below
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    // eslint-disable-next-line no-bitwise
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ','
    )}, ${alpha})`;
  }
  throw new Error('Bad Hex');
};

/**
 * Unformat phone
 * Used before populating data in the react hook form
 *
 * @param {string} formattedPhone
 * @returns {string}
 *
 * @input '(171) 933-7160'
 * @outpt '1719337160'
 */
export const unformatPhone = (formattedPhone: string) => {
  if (!formattedPhone) {
    return '';
  }

  return formattedPhone.replace(/[^\d]/g, '');
};

/**
 * Truncates the string adding the specified string at the end
 *
 * @input thisisalongemail@noveltytechnology.com
 * @output thisisalo...
 *
 *
 * @param {string} str :: original untruncated string
 * @param {number} length :: length of the string after which it should be truncated
 * @param {number} ending :: string with which the string is to be truncated
 * @returns
 */
export const truncateText = (str: string, length?: number, ending?: string) => {
  let l = length;
  let e = ending;
  if (l == null) {
    l = 25;
  }
  if (e == null) {
    e = '...';
  }
  if (str?.length > l) {
    return str.substring(0, l - e.length) + e;
  }
  return str || '';
};

/**
 * Maps keys of object/record
 *
 * @param filter :: original object
 * @param map :: object which contains the new keys
 * @returns :: new object with the mapped keys
 *
 * @input
 * obj => {one: 'x', two: 'y'}, map =>  {one: 'mapped.one'}
 *
 * @output
 * {'mapped.one': 'x', two: 'y'}
 *
 */
export const mapKeys = (
  obj: Record<string, unknown>,
  map: Record<string, string>
): Record<string, unknown> => {
  const output: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const mappedKey = map[key] || key;
    output[mappedKey] = obj[key];
  });

  return output;
};

/**
 * Gives total number of active advanced filters used in a table.
 * `q` and `limit` are bypassed as they are not considered advanced filters
 *
 * @param {object} filters :: table filters
 * @returns {number} :: total number of active advanced filters
 *
 * @example
 *
 * const filters = { keyword: 'search', limit: 10, firstName: 'Rashil', lastName: '', email: ''}
 *
 * getActiveAdvancedFilterCount(filters);
 * // => 1
 *
 */
export const getActiveAdvancedFilterCount = (filters: object) => {
  const advancedFilters = omit(filters, ['keyword', 'limit', 'page']); // `keyword` and `limit` and `page` do not fall under advanced filter
  const nonEmptyValues = pickBy(
    advancedFilters,
    (value) => value !== undefined && value !== ''
  );
  return size(nonEmptyValues);
};

/**
 * Parses HTML string
 *
 * @param {string} html :: HTML string
 * @param {number} chars :: length of the string after which it should be truncated
 * @returns
 */
export const parseHtml = (html: string, chars?: number) => {
  if (chars) {
    return truncate(DOMPurify.sanitize(html), { length: chars });
  }
  return DOMPurify.sanitize(html);
};

export const formatEncodedParam = (param: string) =>
  param?.replace(/ /g, '+') ?? '';

export const getFirstLetterOfFirstAndLastName = (name: string) => {
  if (!name) return '';
  const nameArray = name.split(' ');
  return `${nameArray[0]?.[0]}${nameArray[1]?.[0] || ''}`.toLocaleUpperCase();
};

export const formatSortParam = (sort: {
  sortBy: string | null;
  sortOrder: string | null;
}) => ({
  sortBy: sort.sortOrder ? `${sort.sortBy}:${sort.sortOrder}` : null,
});

export const checkAndReplaceEmptyValue = (value: any) => value || 'N/A';

export const formatAddressInSingleLine = (address: IAddress) => {
  if (!address) return 'N/A';
  const { addressLine1, addressLine2, city, state, zipCode } = address;

  if (!addressLine1 && !city && !state && !zipCode) {
    return 'N/A';
  }
  return `${addressLine1 ? `${addressLine1}, ` : ''}${
    addressLine2 ? `${addressLine2}, ` : ''
  }${city ? `${city}, ` : ''}${state ? `${state} ` : ''}${zipCode}`;
};

export const formatIntoDollar = (val: string) => {
  if (val == null) {
    return 'N/A';
  }
  return Number(val).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const clearBrowserCaches = async () => {
  if (caches) {
    await caches?.keys().then((names) => {
      names?.forEach((name) => {
        caches?.delete(name);
      });
    });
  }
};

export const getFirstAndLastNameOnly = (name: string) => {
  if (!name) return '';
  const splittedName = name.split(' ');

  return splittedName.length === 2
    ? name
    : `${splittedName.at(0)} ${splittedName.at(-1)}`;
};

/**
 * The function compares two semantic version numbers and returns true if the first one is greater than
 * the second one.
 * @param {string} versionA - `versionA` is a string representing a version number in the format of
 * "major.minor.patch". For example, "1.2.3".
 * @param {string} versionB - `versionB` is a string representing a version number that we want to
 * compare against `versionA`. It is used as a reference point to determine if `versionA` is greater
 * than `versionB`.
 * @returns The function `semverGreaterThan` returns a boolean value. It returns `true` if `versionA`
 * is greater than `versionB`, and `false` otherwise.
 */
export const semverGreaterThan = (versionA: string, versionB: string) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

const calculateLuminance = (color: string): number => {
  const hexColor = color.replace('#', '');
  const red = parseInt(hexColor.substring(0, 2), 16);
  const green = parseInt(hexColor.substring(2, 4), 16);
  const blue = parseInt(hexColor.substring(4, 6), 16);

  // Calculate relative luminance using the sRGB color space formula
  const relativeLuminance =
    (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;

  return relativeLuminance;
};

const darkenColor = (color: string): string => {
  const hexColor = color.replace('#', '');
  const numColor = parseInt(hexColor, 16);
  // eslint-disable-next-line no-bitwise
  const darkenedColor = (numColor >> 1) & 0x7f7f7f;

  return `#${darkenedColor.toString(16).padStart(6, '0')}`;
};

/**
 * Get color (hex code) from string
 *
 * @param {string} text
 * @returns {string}
 */
export const getColorFromString = (text: string): string => {
  let hash = 0;
  let i;
  const firstAndLastName = getFirstAndLastNameOnly(text);
  /* eslint-disable no-bitwise */
  for (i = 0; i < firstAndLastName.length; i += 1) {
    hash = firstAndLastName.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  const luminance = calculateLuminance(color);
  const contrastThreshold = 0.6; // Adjust this threshold value as needed
  if (luminance > contrastThreshold) {
    // Return a darker color for better contrast with white text
    return darkenColor(color);
  }
  return color;
};

export const calculateNetAmount = (
  allowedAmount: number,
  patientPayAmount: number
) => {
  return allowedAmount || 0 - patientPayAmount || 0;
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const formatPhone = (unformattedPhone: string) => {
  let phone = unformattedPhone;
  if (phone) {
    const x = phone.replace(/\D/g, '').match(/(\d{3})(\d{7})/);
    if (!x) return '-';

    phone = '+977-' + x[1] + x[2];
    return phone;
  }
  return 'N/A';
};
