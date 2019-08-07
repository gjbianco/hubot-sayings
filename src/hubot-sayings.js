const SAYINGS_KEY = process.env.HUBOT_SAYINGS_KEY || 'hubot-sayings'

function getKey (key) {
  return `${SAYINGS_KEY}-${key}`
}

module.exports = (robot) => {

  robot.hear(/^!remember (\w+) ((?:.|\n)+)/i, (res) => {
    robot.brain.set(getKey(res.match[1]), res.match[2])
    res.send('okay, i\'ll remember that')
  })

  robot.hear(/^!recall (\w+)$/i, (res) => {
    res.send(robot.brain.get(getKey(res.match[1])) || 'i don\'t know that')
  })

  robot.hear(/^!forget (\w+)$/i, (res) => {
    robot.brain.set(getKey(res.match[1]), undefined)
    res.send('forgotten')
  })

}
