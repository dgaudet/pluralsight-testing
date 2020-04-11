const assert = require('assert')
const MissionControl = require('../models/MissionControl')

class ReviewProcess {
  constructor (args) {
    assert(args.application, 'Need an application to review')
    this._app = args.application
    this._missionControl = new MissionControl({ db: args.db })
  }

  ensureAppIsValid () {
    if (this._app.isValid()) {
      return true
    }
    throw new Error(this._app.validationMessage())
  }

  findNextMission () {
    return {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    }
  }

  roleIsAvailable () {
    // not sure what to do about roles
    return true
  }

  ensureRoleCompatible () {
    return true
  }

  approveApplication () {
    return true
  }

  processApplication(next) {
    try {
      this.ensureAppIsValid ()
      this.findNextMission ()
      this.roleIsAvailable ()
      this.ensureRoleCompatible ()
      this.approveApplication ()
    } catch(err) {
      next (null, {
        success: false,
        message: err
      })
      return
    }
    next (null, {
      success: true,
      message: 'Welcome to Mars!'
    })
  }
}

module.exports = ReviewProcess
