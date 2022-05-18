import { Router } from 'express';
import { categoryController } from './controllers/CategoryController';
import { drinkController } from './controllers/DrinkController';
import { glassController } from './controllers/GlassController';

const router = Router();

router.get('/categories', categoryController.index);
router.get('/categories/:id', categoryController.show);
router.post('/categories/byDesc/', categoryController.showByDesc);
router.post('/categories', categoryController.store);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

router.get('/glass', glassController.index);
router.get('/glass/:id', glassController.show);
router.post('/glass/byDesc/', glassController.showByDesc);
router.post('/glass', glassController.store);
router.put('/glass/:id', glassController.update);
router.delete('/glass/:id', glassController.delete);

router.get('/drinks', drinkController.index);
router.get('/drinks/:id', drinkController.show);
router.post('/drinks', drinkController.store);
router.put('/drinks/:id', drinkController.update);
router.delete('/drinks/:id', drinkController.delete);

export default router;
