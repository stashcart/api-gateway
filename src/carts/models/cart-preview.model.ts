import { ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/profiles/models/profile.model';

@ObjectType()
export class CartPreview {
  id!: number;

  title!: string;

  owner!: Profile;

  storeName!: string;

  isAutoApproveEnabled!: boolean;
}
