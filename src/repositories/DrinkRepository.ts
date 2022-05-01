import { DrinkInput } from '@models/Drink';
import { prismaClient } from 'src/database/prismaClient';

class DrinkRepository {
  async findAll() {
    const drinks = await prismaClient.drink.findMany();

    return drinks;
  }

  async findById(id: number) {
    const dirnk = await prismaClient.drink.findUnique({
      where: { id: id },
    });

    return dirnk;
  }

  async findByName(name: string) {
    const dirnk = await prismaClient.drink.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        },
      },
    });

    return dirnk;
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
