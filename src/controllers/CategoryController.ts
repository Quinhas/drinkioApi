import { Request, Response } from 'express';
import { CategoryInput } from '../models/Category';
import { categoryRepository } from '../repositories/CategoryRepository';

class CategoryController {
  async index(req: Request, res: Response) {
    const { onlyTop } = req.query;
    const categories = await categoryRepository.findAll(onlyTop === 'true' ? true : false);
    return res.json(categories);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const category = await categoryRepository.findById(Number(id));

    if (!category) {
      return res.status(404).json({ error: `Category \'${id}\' not found.` });
    }

    return res.json(category);
  }

  async showByDesc(req: Request, res: Response) {
    const { desc } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const category = await categoryRepository.findByDesc(desc);

    if (!category) {
      return res.status(404).json({ error: `Category \'${desc}\' not found.` });
    }

    return res.json(category);
  }

  async store(req: Request, res: Response) {
    const { desc, thumb } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const categoryExists = await categoryRepository.findByDesc(desc);
    if (categoryExists) {
      return res
        .status(400)
        .json({ error: `Category '${desc}' already exists.` });
    }

    const newCategory: CategoryInput = {
      desc: desc,
      thumb: thumb,
    };

    const category = await categoryRepository.create(newCategory);

    return res.status(201).json(category);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { desc, thumb } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const categoryExistsByID = await categoryRepository.findById(id);
    if (!categoryExistsByID) {
      return res.status(404).json({ error: `Category '${id}' not found.` });
    }

    const categoryExistsByDesc = await categoryRepository.findByDesc(desc);
    if (categoryExistsByDesc) {
      return res
        .status(404)
        .json({ error: `Category '${desc}' already exists.` });
    }

    const newCategory: CategoryInput = {
      desc: desc,
      thumb: thumb,
    };

    const category = await categoryRepository.update(id, newCategory);

    return res.status(200).json(category);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const categoryExists = await categoryRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    await categoryRepository.delete(id);

    return res.sendStatus(204);
  }
}

const categoryController = new CategoryController();

export { categoryController };
