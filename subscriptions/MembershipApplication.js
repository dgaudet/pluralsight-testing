const _ = require('underscore')._

class MembershipApplication  {
  constructor(args) {
    _.extend(this, args)
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

  isValid () {
    return this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.weightIsValid() &&
      this.nameIsValid()
  }
}

module.exports = MembershipApplication
