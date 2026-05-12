import { Order } from '../../domain/entities/order';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { HttpError } from '../../../../shared/errors';

export class GetOrderUseCase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(id: string): Promise<Order> {
    const order = await this.orderRepo.findById(id);
    if (!order) {
      throw new HttpError(404, `Order not found: ${id}`, 'ORDER_NOT_FOUND');
    }
    return order;
  }
}
