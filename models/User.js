const { model, Schema } = require('mongoose');

// Using graphql for required fields
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model('User', userSchema);
