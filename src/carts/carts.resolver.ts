import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { JwtAuth } from 'src/_common/decorators/jwt-auth.decorator';
import { UserId } from 'src/_common/decorators/user-id.decorator';
import { onBehalfOf } from 'src/_common/utils/on-behalf-of';
import { Cart } from './models/cart.model';
import { CartItem } from './models/cart-item.model';
import { CartPreview } from './models/cart-preview.model';
import { CreateCartInput } from './inputs/create-cart.input';
import { PatchCartInput } from './inputs/patch-cart.input';
import { AddCartItemInput } from './inputs/add-cart-item.input';
import { CartItemsStatusArgs } from './args/cart-items-status.args';

@Resolver()
export class CartsResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query(() => [CartPreview])
  carts(@Args('ownerId', { nullable: true }) ownerId?: string) {
    return this.httpService
      .get('/carts', { params: { ownerId } })
      .pipe(map(({ data }) => data));
  }

  @Query(() => Cart)
  cart(
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args() { itemsStatus }: CartItemsStatusArgs,
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

  @Mutation(() => Cart)
  @JwtAuth()
  patchCart(
    @UserId() userId: string,
    @Args('id', { type: () => Int }) cartId: number,
    @Args('patchCartInput') input: PatchCartInput,
  ) {
    return this.httpService
      .patch(`/carts/${cartId}`, input, onBehalfOf(userId))
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => Int)
  @JwtAuth()
  async closeCart(
    @UserId() userId: string,
    @Args('cartId', { type: () => Int }) cartId: number,
  ) {
    await firstValueFrom(
      this.httpService.post(`/carts/${cartId}/close`, {}, onBehalfOf(userId)),
    );
    return cartId;
  }

  @Mutation(() => CartItem)
  @JwtAuth()
  addCartItem(
    @UserId() userId: string,
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('addCartItemInput') input: AddCartItemInput,
  ) {
    const payload = {
      ...input,
      customerId: userId,
    };

    return this.httpService
      .post(`/carts/${cartId}/items`, payload, onBehalfOf(userId))
      .pipe(map(({ data }) => data));
  }

  @Query(() => [CartItem])
  cartItems(
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args() { itemsStatus }: CartItemsStatusArgs,
  ) {
    return this.httpService
      .get(`/carts/${cartId}/items`, { params: { itemsStatus } })
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => Int)
  @JwtAuth()
  async deleteItem(
    @UserId() deleterId: string,
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('itemId', { type: () => Int }) itemId: number,
  ) {
    await firstValueFrom(
      this.httpService.delete(
        `/carts/${cartId}/items/${itemId}`,
        onBehalfOf(deleterId),
      ),
    );
    return itemId;
  }

  @Mutation(() => CartItem)
  @JwtAuth()
  approveCartItem(
    @UserId() cartOwnerId: string,
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('itemId', { type: () => Int }) itemId: number,
  ) {
    return this.httpService
      .post(
        `/carts/${cartId}/items/${itemId}/approve`,
        {},
        onBehalfOf(cartOwnerId),
      )
      .pipe(map(({ data }) => data));
  }

  @Mutation(() => CartItem)
  @JwtAuth()
  rejectCartItem(
    @UserId() cartOwnerId: string,
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('itemId', { type: () => Int }) itemId: number,
  ) {
    return this.httpService
      .post(
        `/carts/${cartId}/items/${itemId}/reject`,
        {},
        onBehalfOf(cartOwnerId),
      )
      .pipe(map(({ data }) => data));
  }
}
