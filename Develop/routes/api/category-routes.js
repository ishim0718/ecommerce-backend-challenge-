const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  const categoryProduct = await Category.findAll({
    include: [{ model: Product }],
  });
    res.json(categoryProduct);
} catch (err) {
    res.json(500).json(err);
}
    // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryProductId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryProductId) {
      res.json({ message: 'No category found with specified id' });
      return;
    }
    res.json(categoryProductId); 
  } catch(err) {
    res.json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch(err) {
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.json(updateCategory);
  } catch(err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.json({ message: 'No category found with specified id' });
      return;
    }
    res.json(deleteCategory);
  } catch(err) {
    res.json(err);
  }
});
  // delete a category by its `id` value


module.exports = router;
