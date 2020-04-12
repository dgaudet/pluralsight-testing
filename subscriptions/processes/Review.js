const assert = require('assert')
const MissionControl = require('../models/MissionControl')
const Assignment = require('../models/Assignment')

class ReviewProcess {
  constructor (args) {
    assert(args.application, 'Need an application to review')
    assert(args.db, 'Need a database instance')
    this._app = args.application
    this._db = args.db
    this._
    this._missionControl = new MissionControl({ db: args.db })
  }

  ensureAppIsValid () {
    if (this._app.isValid()) {
      return true
    }
    throw new Error(this._app.validationMessage())
  }

  async findNextMission () {
    return await this._missionControl.currentMission()
  }

  async roleIsAvailable () {
    return await this._missionControl.hasSpaceForRole(this._app.role)
  }

  generateAssignment (mission) {
    return new Assignment({
      passenger: this._app,
      role: this._app.role,
      mission: mission
    })
  }

  ensureRoleCompatible (assignment) {
    return assignment.passengerIsCompatible()
  }

  async approveApplication (assignment) {
    await this._db.saveAssignment(assignment)
  }

  async processApplication(next) {
    let assignment
    try {
      this.ensureAppIsValid ()
      const nextMission = await this.findNextMission ()
      assignment = this.generateAssignment(nextMission)
      await this.roleIsAvailable ()
      this.ensureRoleCompatible (assignment)
      await this.approveApplication (assignment)
    } catch(err) {
      next (null, {
        success: false,
        message: err
      })
      return
    }
    next (null, {
      assignment,
      success: true,
      message: 'Welcome to Mars!'
    })
  }
}

module.exports = ReviewProcess
