import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthAdabtor } from './adabtor/auth-adabtor';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoint } from './enums/AuthEndPoint';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteAccountResponse,
  EditProfileRequest,
  EditProfileResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GetUserInfoResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeResponse,
} from './interfaces/userdata';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  _http = inject(HttpClient);
  _adapter = inject(AuthAdabtor);
  login(data: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(AuthEndPoint.LOGIN, data).pipe(
      map((res) => this._adapter.adaptLogin(res)),
      catchError((error) => of(error))
    );
  }
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this._http.post<RegisterResponse>(AuthEndPoint.REGISTER, data).pipe(
      map((res) => this._adapter.adaptRegister(res)),
      catchError((error) => of(error))
    );
  }
  logout(): Observable<void> {
    return this._http.post<void>(AuthEndPoint.LOGOUT, {});
  }

  editProfile(data: EditProfileRequest): Observable<EditProfileResponse> {
    return this._http.put<EditProfileResponse>(AuthEndPoint.EDIT_PROFILE, data).pipe(
      map((res) => this._adapter.adaptEditProfile(res)),
      catchError((error) => of(error))
    );
  }

  getUserInfo(): Observable<GetUserInfoResponse> {
    return this._http.get<GetUserInfoResponse>(AuthEndPoint.GET_USER_INFO).pipe(
      map((res) => this._adapter.adaptGetUserInfo(res)),
      catchError((error) => of(error))
    );
  }

  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this._http.post<ChangePasswordResponse>(AuthEndPoint.CHANGE_PASSWORD, data).pipe(
      map((res) => this._adapter.adaptChangePassword(res)),
      catchError((error) => of(error))
    );
  }

  deleteAccount(): Observable<DeleteAccountResponse> {
    return this._http.delete<DeleteAccountResponse>(AuthEndPoint.DELETE_ACCOUNT).pipe(
      map((res) => this._adapter.adaptDeleteAccount(res)),
      catchError((error) => of(error))
    );
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this._http.post<ForgotPasswordResponse>(AuthEndPoint.FORGOT_PASSWORD, data).pipe(
      map((res) => this._adapter.adaptForgotPassword(res)),
      catchError((error) => of(error))
    );
  }

  verifyResetCode(data: VerifyResetCodeRequest): Observable<VerifyResetCodeResponse> {
    return this._http.post<VerifyResetCodeResponse>(AuthEndPoint.VERIFY_RESET_CODE, data).pipe(
      map((res) => this._adapter.adaptVerifyResetCode(res)),
      catchError((error) => of(error))
    );
  }

  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this._http.post<ResetPasswordResponse>(AuthEndPoint.RESET_PASSWORD, data).pipe(
      map((res) => this._adapter.adaptResetPassword(res)),
      catchError((error) => of(error))
    );
  }
}
