export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum Role {
  ADMIN = 'ADMIN',
  ADMIN_TEXT = 'Administrator',
  REPRESENTATIVE = 'REPRESENTATIVE',
  REPRESENTATIVE_TEXT = 'Representative',
}

export enum Size {
  SMALL = 'size-small',
  MEDIUM = 'size-medium',
  LARGE = 'size-large',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ModuleCodes {
  SETTING = 'SETTING',
  COMPANY = 'COMPANY',
  NOTIFICATION = 'NOTIFICATION',
  DASHBOARD = 'DASHBOARD',
  PAYMENT = 'PAYMENT',
}

export enum ResourceCode {
  USER_MANAGEMENT = 'USER-MANAGEMENT',
  QUEUE_MANAGEMENT = 'QUEUE-MANAGEMENT',
  ROLES_PERMISSION_MANAGEMENT = 'ROLES-PERMISSION-MANAGEMENT',
}

export enum DashboardViewCodes {
  REPRESENTATIVE_VIEW = 'DASHBOARD-REPRESENTATIVE-VIEW',
  ADMIN_VIEW = 'DASHBOARD-ADMIN-VIEW',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum Interval {
  WEEKLY = 'Weekly',
  LAST_MONTH = 'Last Month',
  THIS_MONTH = 'This Month',
  THIS_QUARTER = 'This Quarter',
  THIS_YEAR = 'This Year',
  LAST_YEAR = 'Last Year',
  SINCE_INCEPTION = 'Inception',
  CUSTOM_DATE = 'Custom',
  CURRENT_PERIOD = 'Current Period',
  LAST_PERIOD = 'Last Period',
}
