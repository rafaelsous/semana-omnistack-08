const axios = require('axios');
const dev = require('../model/Dev');

module.exports = {
  async index(request, response) {
    const { user } = request.headers;

    const loggedDev = await dev.findById(user);

    const users = await dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });

    return response.json(users);
  },

  async store(request, response) {
    const { username } = request.body;

    const userExists = await dev.findOne({ user: username });

    if (userExists) {
      return response.json(userExists);
    }

    const retorno = await axios.get(`https://api.github.com/users/${username}`);
    
    const { name, bio, avatar_url: avatar } = retorno.data;

    const devCreated = await dev.create({
      name: name,
      user: username,
      bio: bio,
      avatar
    });

    return response.json(devCreated);
  }
}