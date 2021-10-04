import { InputType } from '@nestjs/graphql';

@InputType()
export class PatchCartInput {
  title?: string;

  isAutoApproveEnabled?: boolean;
}
