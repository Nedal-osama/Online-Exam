
export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  message: string;
  token: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: UserData;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  password: string;
  rePassword: string;
}
export interface ChangePasswordResponse {
  message: string;
}

export interface DeleteAccountResponse {
  message: string;
}

export interface EditProfileRequest {
  username?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}
export interface EditProfileResponse {
  message: string;
  user: UserData;
}
export interface GetUserInfoResponse {
  user: UserData;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  info: string;
}

export interface VerifyResetCodeRequest {
  resetCode: string;
}

export interface VerifyResetCodeResponse {
    status?: string;
}


export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}
export interface ResetPasswordResponse {
  message: string;
}
