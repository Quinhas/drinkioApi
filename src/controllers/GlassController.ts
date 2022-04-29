import { GlassInput } from '@models/Glass';
import { glassRepository } from '@repositories/GlassRepository';
import { Request, Response } from 'express';

class GlassController {
  async index(req: Request, res: Response) {
    const categories = await glassRepository.findAll();
    return res.json(categories);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const glass = await glassRepository.findById(Number(id));

    if (!glass) {
      return res.status(404).json({ error: `Glass \'${id}\' not found.` });
    }

    return res.json(glass);
  }

  async store(req: Request, res: Response) {
    const { desc } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const categoryExists = await glassRepository.findByDesc(desc);
    if (categoryExists) {
      return res.status(400).json({ error: `Glass '${desc}' already exists.` });
    }

    const newCategory: GlassInput = {
      desc: desc,
    };

    const glass = await glassRepository.create(newCategory);

    return res.status(201).json(glass);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { desc } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const categoryExistsByID = await glassRepository.findById(id);
    if (!categoryExistsByID) {
      return res.status(404).json({ error: `Glass '${id}' not found.` });
    }

    const categoryExistsByDesc = await glassRepository.findByDesc(desc);
    if (categoryExistsByDesc) {
      return res.status(404).json({ error: `Glass '${desc}' already exists.` });
    }

    const newCategory: GlassInput = {
      desc: desc,
    };

    const glass = await glassRepository.update(id, newCategory);

    return res.status(200).json(glass);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const categoryExists = await glassRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: 'Glass not found.' });
    }

    await glassRepository.delete(id);

    return res.sendStatus(204);
  }
}

const glassController = new GlassController();

export { glassController };
