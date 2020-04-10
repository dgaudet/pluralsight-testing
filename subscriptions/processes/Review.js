const EventEmitter = require('events')

class ReviewProcess extends EventEmitter {
  constructor (args) {
    super()
    this.callback

    this.on('application-received', this.ensureAppIsValid)
    this.on('validated', this.findNextMission)
    this.on('mission-selected', this.roleIsAvailable)
    this.on('role-available', this.ensureRoleCompatible)
    this.on('role-compatible', this.acceptApplication)

    this.on('invalid', this.denyApplication)
  }

  ensureAppIsValid (app) {
    if (app.isValid()) {
      this.emit('validated', app)
    } else {
      this.emit('invalid', app.validationMessage())
    }
  }

  findNextMission (app) {
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    }
    this.emit('mission-selected', app)
  }

  roleIsAvailable (app) {
    // not sure what to do about roles
    this.emit('role-available', app)
  }

  ensureRoleCompatible (app) {
    this.emit('role-compatible', app)
  }

  acceptApplication () {
    this.callback(null, {
      success: true,
      message: 'Welcome to the Mars Program!'
    })
  }

  denyApplication (message) {
    this.callback(null, {
      success: false,
      message
    })
  }

  processApplication(app, next) {
    this.callback = next
    this.emit('application-received', app)
  }
}

module.exports = ReviewProcess
