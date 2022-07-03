import * as crypto from 'crypto';
import { config as envConfig } from 'dotenv';

envConfig();

export async function digestPassword(
  password: string,
  salt?: string,
): Promise<string[]> {
  let passwordVar: string = password;
  let saltVar: string | undefined = salt;
  if (undefined == saltVar) {
    saltVar = crypto.randomBytes(192).toString('base64').substring(0, 255);
  }

  for (let i = 0; i < 3; i++)
    passwordVar = crypto
      .createHash('sha512')
      .update(passwordVar + saltVar)
      .digest('hex');

  return [passwordVar, saltVar];
}

export async function comparePassword(
  password: string,
  digestedPassword: string,
  salt: string,
): Promise<boolean> {
  return (await digestPassword(password, salt))[0] === digestedPassword;
}
