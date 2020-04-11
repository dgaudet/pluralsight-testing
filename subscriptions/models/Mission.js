const moment = require('moment')

class Mission {
  constructor (args) {
    if (!args) {
      args = {}
    }
    this.status = 'open'
    this.commander = args.commander || null
    this.MAVPilot = args.MAVPilot || null
    this.colonist = args.colonist || null
    this.tourists = args.tourists || null
    this.launchDate = args.launchDate || moment().add(1, 'month').startOf('month').format('MM-DD-YYYY')
  }

  needsRole (role) {
    let needed = false
    if (!this.isFlying()) {
      return false
    }

    switch (role) {
      case 'mission-commander':
        needed = !this.commander
        break
      case 'mav-pilot':
        needed = !this.MAVPilot
        break
      case 'colonist':
        needed = this.colonist.length <= 10
        break
      case 'space-tourist':
        needed = this.tourists.length <= 20
        break
    }

    return needed
  }

  assignRole (args) {
    assert.ok(args.user && args.role, 'Need a user and role in order to assign')
    let role = args.role
    const user = args.user

    switch (role) {
      case 'mission-commander':
        this.commander = user
        break
      case 'mav-pilot':
        this.MAVPilot = user
        break
      case 'colonist':
        this.colonist = user
        break
      case 'space-tourist':
        this.tourists.push(user)
        break
    }

    return this
  }

  isFlying () {
    return this.status === 'open'
  }
}

module.exports = Mission
