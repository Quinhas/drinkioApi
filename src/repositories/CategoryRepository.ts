import { CategoryInput } from '@models/Category';
import { prismaClient } from 'src/database/prismaClient';

class CategoryRepository {
  async findAll(onlyTop = false) {
    const where = onlyTop
      ? {
          top: true,
        }
      : {};
    const categories = await prismaClient.category.findMany({
      where,
      orderBy: {
        id: 'asc',
      },
    });

    return categories;
  }

  async findById(id: number) {
    const category = await prismaClient.category.findUnique({
      where: { id: id },
      include: {
        drinks: true,
      },
    });

    return category;
  }

  async findByDesc(desc: string) {
    const category = await prismaClient.category.findFirst({
      where: {
        desc: {
          equals: desc,
          mode: 'insensitive',
        },
      },
    });

    return category;
  }

  async create(_category: CategoryInput) {
    const category = await prismaClient.category.create({ data: _category });

    return category;
  }

  async update(id: number, _category: CategoryInput) {
    const category = await prismaClient.category.update({
      data: _category,
      where: { id: id },
    });

    return category;
  }

  async delete(id: number) {
    const deleteOperation = await prismaClient.category.delete({
      where: { id: id },
    });
    return deleteOperation;
  }
}

const categoryRepository = new CategoryRepository();

export { categoryRepository };
