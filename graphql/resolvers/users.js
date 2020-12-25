const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}
const resolvers = {
  // parent: gives result of the input from last step
  // args: register functions arguments
  // context:
  // info: meta data general info
  // Bcrypt is async
  Mutation: {
    async register(_, args, context, info) {
      // Validate Data
      // Make sure user does not already exist
      // Hash password and create token
      let {
        registerInput: { username, password, email, confirmPassword },
      } = args;

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        // id and token not in doc by default
        id: res._id,
        token,
      };
    },
  },
};

module.exports = resolvers;
