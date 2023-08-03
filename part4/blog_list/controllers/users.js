const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url:1, likes:1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const userId = request.params.id;
  try {
    const user = await User.findById(userId).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });

    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong while fetching the user' });
  }
});

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter