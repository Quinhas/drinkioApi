import { GlassInput } from '@models/Glass';
import { prismaClient } from 'src/database/prismaClient';

class GlassRepository {
  async findAll() {
    const glass = await prismaClient.glass.findMany();

    return glass;
  }

  async findById(id: number) {
    const glass = await prismaClient.glass.findUnique({
      where: { id: id },
    });

    return glass;
  }

  async findByDesc(desc: string) {
    const glass = await prismaClient.glass.findFirst({
      where: {
        desc: {
          equals: desc,
          mode: 'insensitive',
        },
      },
    });

    return glass;
  }

  async create(_glass: GlassInput) {
    const glass = await prismaClient.glass.create({ data: _glass });

    return glass;
  }

  async update(id: number, _glass: GlassInput) {
    const glass = await prismaClient.glass.update({
      data: _glass,
      where: { id: id },
    });

    return glass;
  }

  async delete(id: number) {
    const deleteOperation = await prismaClient.glass.delete({
      where: { id: id },
    });
    return deleteOperation;
  }
}

const glassRepository = new GlassRepository();

export { glassRepository };
