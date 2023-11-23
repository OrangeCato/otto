const User = require('../models/user.js')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' })
    }

    const newUser = new User({ name, email, password })

    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Registration failed' })
  }
}

module.exports = {
  registerUser,
}
