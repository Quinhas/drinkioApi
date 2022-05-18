import { prismaClient } from '../database/prismaClient';
import { DrinkInput } from '../models/Drink';

class DrinkRepository {
  async findAll() {
    const drinks = await prismaClient.drink.findMany();

    return drinks;
  }

  async findById(id: number) {
    const drink = await prismaClient.drink.findUnique({
      where: { id: id },
      include: {
        glass: true,
      },
    });

    return drink;
  }

  async findByName(name: string) {
    const drink = await prismaClient.drink.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return drink;
  }

  async create(_drink: DrinkInput) {
    const drink = await prismaClient.drink.create({ data: _drink });

    return drink;
  }

  async update(id: number, _drink: DrinkInput) {
    const drink = await prismaClient.drink.update({
      data: _drink,
      where: { id: id },
    });

    return drink;
  }

  async delete(id: number) {
    const deleteOperation = await prismaClient.drink.delete({
      where: { id: id },
    });
    return deleteOperation;
  }
}

const drinkRepository = new DrinkRepository();

export { drinkRepository };
