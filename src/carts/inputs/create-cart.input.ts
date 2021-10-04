import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  title!: string;

  isAutoApproveEnabled?: boolean = false;

  storeId!: number;
}
