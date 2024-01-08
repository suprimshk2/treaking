const apiRoute = {
  login: '/auth/login',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh-token',
  resendMFACode: '/auth/resend-otp',
  verifyMFACode: '/auth/verify-mfa',
  forgotPassword: '/users/forget-password-link',
  setNewPassword: '/users/forget-password',
  validateToken: '/auth/validate-token',
  activateAccount: '/users/account-activate',
  getAuthorizationPermissions: '/users/self-permissions',
};

export default apiRoute;
