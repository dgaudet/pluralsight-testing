const moment = require('moment')
const assert = require('assert')

const Mission = require('./Mission')

class MissionControl {
  constructor (args) {
    assert(args.db, 'Needs a database')
    this._db = args.db
  }

  async currentMission () {
    const nextMission = moment().add(1, 'month').startOf('month')
    const formattedMissionDate = nextMission.format('MM-DD-YYYY')

    let foundMission = await this._db.getMissionByLaunchDate(formattedMissionDate)
    if (foundMission) {
      return foundMission
    } else {
      foundMission = new Mission()
      await this._db.createNextMission(foundMission)
      return foundMission
    }
  }

  async hasSpaceForRole (role) {
    const mission = await this.currentMission()
    return mission.needsRole(role)
  }
}

module.exports = MissionControl
