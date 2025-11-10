import { Observable } from "rxjs";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ChangePasswordRequest, ChangePasswordResponse, DeleteAccountResponse, EditProfileRequest, EditProfileResponse, GetUserInfoResponse, ForgotPasswordRequest, ForgotPasswordResponse, VerifyResetCodeRequest, VerifyResetCodeResponse, ResetPasswordRequest, ResetPasswordResponse } from "../interfaces/userdata";

export abstract class AuthApi {
  abstract login(data: LoginRequest): Observable<LoginResponse>;
  abstract register(data: RegisterRequest): Observable<RegisterResponse>;
  abstract logout(): Observable<void>;
  abstract changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse>;
  abstract deleteAccount(): Observable<DeleteAccountResponse>;
  abstract editProfile(data: EditProfileRequest): Observable<EditProfileResponse>;
  abstract gitLogUserInfo(): Observable<GetUserInfoResponse>;
  abstract forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;
  abstract virifyResetCode(data: VerifyResetCodeRequest): Observable<VerifyResetCodeResponse>;
  abstract resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse>;}
