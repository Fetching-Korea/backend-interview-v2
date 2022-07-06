import { User } from '../entities/user.entity';

export class UserReturnType {
  user?: User;
  error?: {
    field: string;
    message: string;
  };
}
