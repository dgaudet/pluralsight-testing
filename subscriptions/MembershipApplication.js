const _ = require('underscore')._
const moment = require('moment')

class MembershipApplication  {
  constructor(args) {
    _.extend(this, args)
    this.validUntil = this.validUntil ? moment(this.validUntil) : moment().add(10, 'days')
  }


  expired () {
    return this.validUntil.isBefore(moment())
  }

  emailIsValid () {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1
  }

  heightIsValid () {
    return this.height && this.height > 60 && this.height < 75
  }

  ageIsValid () {
    return this.age && this.age < 100 && this.age > 15
  }

  weightIsValid () {
    return this.weight && this.weight > 100 && this.weight < 300
  }

  nameIsValid () {
    return this.first && this.last
  }

  validationMessage () {
    if (this.isValid()) {
      return 'Application is valid'
    } else if (!this.emailIsValid()) {
      return 'Email is invalid'
    } else if (!this.heightIsValid()) {
      return 'Height is invalid'
    } else if (!this.ageIsValid()) {
      return 'Age is invalid'
    } else if (!this.weightIsValid()) {
      return 'Weight is invalid'
    } else if (!this.nameIsValid()) {
      return 'Name is invalid'
    } else if (this.expired()) {
      return 'Application has expired'
    }
  }

  isValid () {
    return this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.weightIsValid() &&
      this.nameIsValid() &&
      !this.expired()
  }
}

module.exports = MembershipApplication
