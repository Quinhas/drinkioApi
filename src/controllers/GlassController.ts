import { GlassInput } from '@models/Glass';
import { glassRepository } from '@repositories/GlassRepository';
import { Request, Response } from 'express';

class GlassController {
  async index(req: Request, res: Response) {
    const glasses = await glassRepository.findAll();
    return res.json(glasses);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const glass = await glassRepository.findById(Number(id));

    if (!glass) {
      return res.status(404).json({ error: `Glass \'${id}\' not found.` });
    }

    return res.json(glass);
  }

  async showByDesc(req: Request, res: Response) {
    const { desc } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const glass = await glassRepository.findByDesc(desc);

    if (!glass) {
      return res.status(404).json({ error: `Glass \'${desc}\' not found.` });
    }

    return res.json(glass);
  }

  async store(req: Request, res: Response) {
    const { desc } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const glassExists = await glassRepository.findByDesc(desc);
    if (glassExists) {
      return res.status(400).json({ error: `Glass '${desc}' already exists.` });
    }

    const newGlass: GlassInput = {
      desc: desc,
    };

    const glass = await glassRepository.create(newGlass);

    return res.status(201).json(glass);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { desc } = req.body;

    if (!desc) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const glassExistsByID = await glassRepository.findById(id);
    if (!glassExistsByID) {
      return res.status(404).json({ error: `Glass '${id}' not found.` });
    }

    const glassExistsByDesc = await glassRepository.findByDesc(desc);
    if (glassExistsByDesc) {
      return res.status(404).json({ error: `Glass '${desc}' already exists.` });
    }

    const newGlass: GlassInput = {
      desc: desc,
    };

    const glass = await glassRepository.update(id, newGlass);

    return res.status(200).json(glass);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const glassExists = await glassRepository.findById(id);

    if (!glassExists) {
      return res.status(404).json({ error: 'Glass not found.' });
    }

    await glassRepository.delete(id);

    return res.sendStatus(204);
  }
}

const glassController = new GlassController();

export { glassController };
