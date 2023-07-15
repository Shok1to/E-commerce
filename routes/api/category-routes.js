const router = require('express').Router();
const { Category, Product, Category } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({}).then(categories=>res.json(categories))
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const findCategory = await Category.findByPk(req.params.id);

  return res.json(findCategory);
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);

  return res.json(newCategory);
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(updateCategory);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(deleteCategory);
});

module.exports = router;
