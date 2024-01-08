import {
  parse,
  format,
  isBefore,
  differenceInYears,
  formatDistance,
  parseISO,
} from 'date-fns';
import { config } from 'shared/constants/config';
import { Interval } from 'shared/enums';

const { DATE_FORMAT } = config;

/**
 * Validate date of birth
 *
 * @param {string} dob
 * @param {number} minAge
 * @param {number} maxAge
 * @returns {boolean}
 */
export const validateDob = (dob: string, minAge = 0, maxAge = 120) => {
  let isValidDob = false;

  const parsedDob = parse(dob, DATE_FORMAT.dateInputFormat, new Date());

  if (
    isBefore(parsedDob, new Date()) &&
    differenceInYears(new Date(), parsedDob) <= maxAge
  ) {
    isValidDob = true;
  }

  if (minAge > 0 && differenceInYears(new Date(), parsedDob) >= minAge) {
    isValidDob = true;
  }

  return isValidDob;
};

/**
 * Formats date
 *
 */
export const formatDate = (
  date: string,
  dateFormat: {
    inputDateFormat: string;
    outputDateFormat: string;
  }
) => {
  if (!date) return '';

  let parsedDate;

  if (dateFormat.inputDateFormat === DATE_FORMAT.ISO) {
    parsedDate = parseISO(date);
  } else {
    parsedDate = parse(date, dateFormat.inputDateFormat, new Date());
  }

  const formattedDate = format(parsedDate, dateFormat.outputDateFormat);

  return formattedDate;
};

/**
 * Formats date to save
 * Mostly used for formatting date coming from react hook form before sending an API call
 *
 * @param {string} date
 * @returns {string} :: formatted date
 */
export const formatDateToSave = (date: string) => {
  return formatDate(date, {
    inputDateFormat: DATE_FORMAT.dateInputFormat,
    outputDateFormat: DATE_FORMAT.dateSaveFormat,
  });
};

/**
 * Formats date or datetime to view
 * Normally, the input date format is ISO format
 *
 */
export const formatDateToView = (
  date: string,
  dateFormat: {
    inputDateFormat: string;
    outputDateFormat: string;
  } = {
    inputDateFormat: DATE_FORMAT.ISO,
    outputDateFormat: DATE_FORMAT.dateViewFormat,
  }
) => {
  return formatDate(date, dateFormat);
};

/**
 * Unformat date
 * Used before populating data in the react hook form
 *
 * @param {string} date
 * @returns {string}
 *
 * @input '01/01/1995'
 * @ouput '01011995'
 *
 */
export const unformatDate = (date: string, dateFormat = DATE_FORMAT.ISO) => {
  if (!date) return '';

  if (dateFormat === DATE_FORMAT.dateViewFormat) {
    return date.replaceAll('/', '');
  }

  let parsedDate;

  if (dateFormat === DATE_FORMAT.ISO) {
    parsedDate = parseISO(date);
  } else {
    parsedDate = parse(date, dateFormat, new Date());
  }

  const formatedDate = format(parsedDate, DATE_FORMAT.dateViewFormat);

  return formatedDate.replaceAll('/', '');
};

export const getDateDuration = (start: string, end?: string) => {
  const startTime = new Date(start);
  const endTime = end ? new Date(end) : new Date();
  const timeDiff = formatDistance(startTime, endTime, { addSuffix: true });
  return timeDiff;
};

export const getCurrentDateInUTC = () => new Date().toISOString();

export const getWeekStartDate = (start = 0) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = today.getDay() - start;
  const date = today.getDate() - day;

  const startDate = new Date(today.setDate(date));
  return startDate;
};

// export const formatDateView = (
//   date: string,
//   dateFormat = config.DATE_FORMAT.dateViewFormat
// ) => {
//   if (date && !moment(date).isValid()) return date;

//   if (date) {
//     return moment(date)
//       .format(dateFormat)
//       .toString()
//       .replace('am', 'AM')
//       .replace('pm', 'PM');
//   }

//   return null;
// };

export const getDateRange = (
  interval: Interval
): {
  startDate: Date;
  endDate: Date;
} => {
  let startDate = new Date();
  let endDate = new Date();

  if (interval === Interval.LAST_MONTH) {
    startDate = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
  } else if (interval === Interval.LAST_YEAR) {
    startDate = new Date(startDate.getFullYear() - 1, 0, 1);
    endDate = new Date(endDate.getFullYear(), 0, 0);
  } else if (interval === Interval.SINCE_INCEPTION) {
    startDate = new Date(2011, 0, 1);
  } else if (interval === Interval.THIS_MONTH) {
    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  } else if (interval === Interval.THIS_QUARTER) {
    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() - (startDate.getMonth() % 3),
      1
    );
  } else if (interval === Interval.THIS_YEAR) {
    startDate = new Date(startDate.getFullYear(), 0, 1);
  } else if (interval === Interval.WEEKLY) {
    startDate = getWeekStartDate();
  }
  return {
    startDate,
    endDate,
  };
};
