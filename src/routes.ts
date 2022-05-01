import { categoryController } from '@controllers/CategoryController';
import { glassController } from '@controllers/GlassController';
import { Router } from 'express';

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

export default router;
