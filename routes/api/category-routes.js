const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update({
      category_name: req.body.category_name,
    },
    {
    
     where: {
        id: req.params.id,
     },
      
  });

    res.status(200).json(category);
    } catch (err) {
    res.status(400).json(err);
    }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
