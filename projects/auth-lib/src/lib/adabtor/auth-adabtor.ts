import { Injectable } from '@angular/core';
import { UserData, LoginResponse, RegisterResponse, ChangePasswordResponse, DeleteAccountResponse, EditProfileResponse, GetUserInfoResponse, ForgotPasswordResponse, VerifyResetCodeResponse, ResetPasswordResponse } from '../interfaces/UserData';

@Injectable({
  providedIn: 'root',
})
export class AuthAdabtor{
   private adaptUser(user: any): UserData {
    return {
      username: user?.username ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    };
  }

 adaptLogin(data: any): LoginResponse {
    return {
      message: data?.message ?? '',
      token: data?.token ?? '',
      email: data?.user?.email ?? '',
    };
  }
  adaptRegister(data: any): RegisterResponse {
    return {
      message: data?.message ?? '',
      token: data?.token ?? '',
      user: {...this.adaptUser(data?.user)
      },
}
  }
  adaptChangePassword(data: any): ChangePasswordResponse {
    return {
      message: data?.message ?? '',
    };
  }
  adaptDeleteAccount(data: any): DeleteAccountResponse {
    return {
      message: data?.message ?? '',
    };
  }
   adaptEditProfile(data: any): EditProfileResponse {
    return {
      message: data?.message ?? '',
      user: this.adaptUser(data?.user),
    };
  }
  adaptGetUserInfo(data: any): GetUserInfoResponse {
    return {
      user: this.adaptUser(data?.user),
    };
  }
   adaptForgotPassword(data: any): ForgotPasswordResponse {
    return {
      message: data?.message ?? '',
      info: data?.info ?? '',
    };
  }

  adaptVerifyResetCode(data: any): VerifyResetCodeResponse {
    return {
      status: data?.status ?? '',
    };
  }
  adaptResetPassword(data: any): ResetPasswordResponse {
    return {
      message: data?.message ?? '',
    };
  }
}

