import * as userRepository from "../repositories/user.repository";
import { User } from "../types/user.types";
import * as authError from "../errors/auth.error";
import * as passwordUtils from "../utils/password.utils";  
import * as jwtUtils from "../utils/jwt.utils";
import * as authRepository from "../repositories/auth.repository";


export const register = async (user: User): Promise<Omit<User, "password">> => {
  // check if user already exists
  const existingUser = userRepository.findUserByEmail(user.email);
  if (existingUser) {
    throw new authError.UserAlreadyExistsError(user.email);
  }

  const newUser: User = {
    ...user,
    password: await passwordUtils.hashPassword(user.password), // hash the password before storing
  };
  const result = userRepository.createUser(newUser);
  // return the created user without the password
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
}

export const login = async (email: string, reqPassword: string): Promise<{ token: object; user: Omit<User, "password"> }> => {
   const user = userRepository.findUserByEmail(email);
  if (!user) {
    throw new authError.UserNotFoundError(email);
  }
  // compare the provided password with the stored hashed password
  const isPasswordValid = await passwordUtils.comparePassword(reqPassword, user.password);
  if (!isPasswordValid) {
    throw new authError.InvalidCredentialsError(email);
  }

  const accessToken = jwtUtils.generateToken({ id: user.id, username: user.username, email: user.email, role: user.role, type: "access" });
  const refreshToken = jwtUtils.generateRefreshToken({ id: user.id, username: user.username, email: user.email, role: user.role, type: "refresh" });

  // store refresh token
  await authRepository.addToken(refreshToken);

  // return the user without the password
  const { password, ...userWithoutPassword } = user;
  return { token: {accessToken: accessToken, refreshToken: refreshToken}, user: userWithoutPassword};
}

export const confirmAuthencity = async (user: User, refreshToken: string): Promise<{token: string}> => {
  // verify accessToken in db
  const token = authRepository.verifyToken(refreshToken)
  if(!token) {
    throw new authError.AccessRevokedError;
  }

  const accessToken = jwtUtils.generateToken({ id: user.id, username: user.username, email: user.email, role: user.role, type: "access" });
  return { token: accessToken };
}

export const logout = async (token: string) => {
  authRepository.removeToken(token);
  return true;
}