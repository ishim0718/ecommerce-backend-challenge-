const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findAll({
      include: [{ model: Product, ProductTag }],
    });
      res.json(getTag);
  } catch (err) {
      res.json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTagId = await Category.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag }],
    });

    if (!getTagId) {
      res.json({ message: 'No tag found with specified id' });
      return;
    }
    res.json(getTagId); 
  } catch(err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch(err) {
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.json(updateTag);
  } catch(err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.json({ message: 'No tag found with specified id' });
      return;
    }
    res.json(deleteTag);
  } catch(err) {
    res.json(err);
  }
});

module.exports = router;
