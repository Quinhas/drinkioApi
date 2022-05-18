import { Request, Response } from 'express';
import { DrinkInput } from '../models/Drink';
import { drinkRepository } from '../repositories/DrinkRepository';

class DrinkController {
  async index(req: Request, res: Response) {
    const drinks = await drinkRepository.findAll();
    return res.json(drinks);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const drink = await drinkRepository.findById(Number(id));

    if (!drink) {
      return res.status(404).json({ error: `Drink \'${id}\' not found.` });
    }

    return res.json(drink);
  }

  async store(req: Request, res: Response) {
    const {
      name,
      categoryId,
      alcoholic,
      glassId,
      instructions,
      thumb,
      ingredients,
      measures,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Description [desc] is required.' });
    }

    const drinkExists = await drinkRepository.findByName(name);
    if (drinkExists) {
      return res.status(400).json({ error: `Drink '${name}' already exists.` });
    }

    const newDrink: DrinkInput = {
      name: name,
      categoryId: categoryId,
      alcoholic: alcoholic,
      glassId: glassId,
      instructions: instructions,
      thumb: thumb || null,
      ingredients: ingredients,
      measures: measures,
    };

    const drink = await drinkRepository.create(newDrink);

    return res.status(201).json(drink);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const {
      name,
      categoryId,
      alcoholic,
      glassId,
      instructions,
      thumb,
      ingredients,
      measures,
    } = req.body;

    const drinkExistsByID = await drinkRepository.findById(id);
    if (!drinkExistsByID) {
      return res.status(404).json({ error: `Drink '${id}' not found.` });
    }

    const drinkExistsByName = await drinkRepository.findByName(name);
    if (drinkExistsByName) {
      return res.status(404).json({ error: `Drink '${name}' already exists.` });
    }

    const newDrink: DrinkInput = {
      name: name,
      categoryId: categoryId,
      alcoholic: alcoholic,
      glassId: glassId,
      instructions: instructions,
      thumb: thumb || null,
      ingredients: ingredients,
      measures: measures,
    };

    const drink = await drinkRepository.update(id, newDrink);

    return res.status(200).json(drink);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const drinkExists = await drinkRepository.findById(id);

    if (!drinkExists) {
      return res.status(404).json({ error: 'Drink not found.' });
    }

    await drinkRepository.delete(id);

    return res.sendStatus(204);
  }
}

const drinkController = new DrinkController();

export { drinkController };
