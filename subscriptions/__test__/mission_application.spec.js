const assert = require('assert')
const MembershipApplication = require('../MembershipApplication')

describe('Membership Application requirements', () => {
  let validApp
  function given () {
    return {
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    }
  }

  function when (context) {
    validApp = new MembershipApplication(context)
  }

  beforeAll(() => {
    const context = given()
    when(context)
  })

  describe('Application validations if...', () => {
    it('all validators successful', () => {
      assert(validApp.isValid(), 'Not valid')
    })
    it('email is 4 or more chars and contains an @', () => {
      assert(validApp.emailIsValid())
    })
    it('height is between 60 and 75 inches', () => {
      assert(validApp.heightIsValid())
    })
    it('age is between 15 and 100', () => {
      assert(validApp.ageIsValid())
    })
    it('weight is between 100 and 300', () => {
      assert(validApp.weightIsValid())
    })
    it('first and last name are provided', () => {
      assert(validApp.nameIsValid())
    })
  })
})
