/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date | undefined;
}

export interface Success {}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokensRequest {
  userId: string;
  refreshToken: string;
}

export interface LogoutRequest {
  accessToken: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<Tokens>;

  login(request: LoginRequest): Observable<Tokens>;

  refresh(request: RefreshTokensRequest): Observable<Tokens>;

  logout(request: LogoutRequest): Observable<Success>;
}

export interface AuthServiceController {
  register(
    request: RegisterRequest
  ): Promise<Tokens> | Observable<Tokens> | Tokens;

  login(request: LoginRequest): Promise<Tokens> | Observable<Tokens> | Tokens;

  refresh(
    request: RefreshTokensRequest
  ): Promise<Tokens> | Observable<Tokens> | Tokens;

  logout(
    request: LogoutRequest
  ): Promise<Success> | Observable<Success> | Success;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "refresh", "logout"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("AuthService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("AuthService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
