import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { JwtAuth } from 'src/_common/decorators/jwt-auth.decorator';
import { UserId } from 'src/_common/decorators/user-id.decorator';
import { onBehalfOf } from 'src/_common/utils/on-behalf-of';
import { Cart } from './models/cart.model';
import { CartItemStatus } from './models/cart-item.model';
import { CartPreview } from './models/cart-preview.model';
import { CreateCartInput } from './inputs/create-cart.input';

@Resolver()
export class CartsResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query(() => [CartPreview])
  carts() {
    return this.httpService.get('/carts').pipe(map(({ data }) => data));
  }

  @Query(() => Cart)
  cart(
    @Args('cartId')
    cartId: number,
    @Args('itemsStatus', { type: () => CartItemStatus, nullable: true })
    itemsStatus?: CartItemStatus,
  ) {
    return this.httpService
      .get(`/carts/${cartId}`, { params: { itemsStatus } })
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => Cart)
  @JwtAuth()
  createCart(
    @UserId() userId: string,
    @Args('createCartInput') input: CreateCartInput,
  ) {
    const payload = {
      ...input,
      ownerId: userId,
    };

    return this.httpService
      .post('/carts', payload, onBehalfOf(userId))
      .pipe(map(({ data }) => data));
  }
}
