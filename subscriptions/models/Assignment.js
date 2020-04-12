const assert = require('assert')
const _ = require('underscore')

class Assignment {
  constructor (args) {
    assert(args.passenger && args.role && args.mission, 'Need a role, passenger and mission')
    _.extend(this, args)
  }

  passengerIsCompatible () {
    let valid = false
    if (this.role === 'commander') {
      valid = this.passenger.age > 35 &&
        this.passenger.age < 75 &&
        this.passenger.weight < 250 &&
        this.passenger.height < 84
    } else if (this.role === 'mav-pilot') {
      valid = this.passenger.age > 35 &&
        this.passenger.age < 55 &&
        this.passenger.weight < 180 &&
        this.passenger.height < 72
    } else {
      valid = this.mission.hasRoom &&
        this.passenger.age > 35 &&
        this.passenger.age < 55 &&
        this.passenger.weight < 200 &&
        this.passenger.height < 72
    }
    return valid
  }
}

module.exports = Assignment
