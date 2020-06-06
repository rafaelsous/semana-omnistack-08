const dev = require('../model/Dev');

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const loggedDev = await dev.findById(user);
    const targetDev = await dev.findById(devId);

    if (!targetDev) {
      return response.status(400).json({ error: 'Dev not exists' });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return response.json(loggedDev);
  }
}