import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
  email!: string;

  password!: string;
}
