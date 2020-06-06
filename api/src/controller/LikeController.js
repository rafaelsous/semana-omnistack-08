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

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = request.connectedUsers[user];
      const targetSocket = request.connectedUsers[devId];

      if (loggedSocket) {
        request.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        request.io.to(targetSocket).emit('match', loggedDev)
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return response.json(loggedDev);
  }
}