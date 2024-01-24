import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // 사용자와 제품 엔터티를 찾아옴
    const userId = createOrderDto.userId;
    const productId = createOrderDto.productId;
    const user = await this.userRepository.findOne({
      where: {id:userId}
    });
    const product = await this.productRepository.findOne({
      where: {id:productId}
    });

    // 주문 엔터티 생성 및 연관관계 설정
    const newOrder = new Order(user, product);

    // 주문 엔터티 저장
    return await this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        id
      }, relations: ['user', 'product']
    });
  }

  async update(id: number, update: UpdateOrderDto): Promise<number> {
    await this.orderRepository.update(id, update);
    return id
  }

  async remove(id: number): Promise<number> {
    await this.orderRepository.delete(id);
    return id;
  }
}
