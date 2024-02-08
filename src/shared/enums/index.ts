export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
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
  USER_MANAGEMENT = 'USER-MANAGEMENT',
}

export enum ResourceCode {
  USER_MANAGEMENT = 'USER-MANAGEMENT',
  QUEUE_MANAGEMENT = 'QUEUE-MANAGEMENT',
  ROLES_PERMISSION_MANAGEMENT = 'ROLES-PERMISSION-MANAGEMENT',
  QUIZ_MANAGEMENT = 'QUIZ-MANAGEMENT',
  VENDORS_MANAGEMENT = 'VENDORS-MANAGEMENT',
  OFFERS_MANAGEMENT = 'OFFERS-MANAGEMENT',
  PRODUCTS_MANAGEMENT = 'PRODUCTS-MANAGEMENT',
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

export enum CloudFileCategory {
  VENDORS_LOGO = 'VENDORS_LOGO',
  QUIZ_PRIZE = 'QUIZ_PRIZE',
  QUIZ_LOGO = 'QUIZ_LOGO',
  USER_AVATAR = 'USER_AVATAR',
  PRODUCT_IMAGE = 'PRODUCT_IMAGE',
}

export enum LookupCategory {
  OFFER_CONTENT_BACKGROUND = 'OFFER_CONTENT_BACKGROUND',
}

export enum LookUpCode {
  OFFER_USAGE_INSTRUCTION = 'OFFER_USAGE_INSTRUCTION',
  QUIZ_TERMS = 'QUIZ_TERMS',
}
