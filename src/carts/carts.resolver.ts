import { Resolver, Query, Args } from '@nestjs/graphql';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Cart } from './models/cart.model';
import { CartItemStatus } from './models/cart-item.model';
import { CartPreview } from './models/cart-preview.model';

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
}
