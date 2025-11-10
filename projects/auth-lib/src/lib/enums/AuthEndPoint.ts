export const baseUrl = 'https://exam.elevateegy.com/api/v1/auth';

export const AuthEndPoint = {
  LOGIN: `${baseUrl}/signin`,
  REGISTER: `${baseUrl}/signup`,
  LOGOUT: `${baseUrl}/logout`,
  EDIT_PROFILE: `${baseUrl}/editProfile`,
  GET_USER_INFO: `${baseUrl}/profileData`,
  CHANGE_PASSWORD: `${baseUrl}/changePassword`,
  DELETE_ACCOUNT: `${baseUrl}/deleteMe`,
  FORGOT_PASSWORD: `${baseUrl}/forgotPassword`,
  VERIFY_RESET_CODE: `${baseUrl}/verifyResetCode`,
  RESET_PASSWORD: `${baseUrl}/resetPassword`,
};
