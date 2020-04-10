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
  })

  describe('Application invalid if...', () => {
    it('email is 4 characters or less', () => {
      const invalidMembership = new MembershipApplication({email: 'd@d'})
      assert(!invalidMembership.emailIsValid())
    })
    it('email does not contain an @', () => {
      const invalidMembership = new MembershipApplication({email: 'dd'})
      assert(!invalidMembership.emailIsValid())
    })
    it('email is omitted', () => {
      const invalidMembership = new MembershipApplication({})
      assert(!invalidMembership.emailIsValid())
    })
    it('height is less than 60', () => {
      const invalidMembership = new MembershipApplication({height: 55})
      assert(!invalidMembership.heightIsValid())
    })
    it('height is more than 75', () => {
      const invalidMembership = new MembershipApplication({height: 80})
      assert(!invalidMembership.heightIsValid())
    })
    it('height is omitted', () => {
      const invalidMembership = new MembershipApplication({})
      assert(!invalidMembership.heightIsValid())
    })
    it('age is more than 100', () => {
      const invalidMembership = new MembershipApplication({age: 101})
      assert(!invalidMembership.ageIsValid())
    })
    it('age is less than 15', () => {
      const invalidMembership = new MembershipApplication({age: 14})
      assert(!invalidMembership.ageIsValid())
    })
    it('age is omitted', () => {
      const invalidMembership = new MembershipApplication({})
      assert(!invalidMembership.ageIsValid())
    })
    it('weight is less than 100', () => {
      const invalidMembership = new MembershipApplication({weight: 99})
      assert(!invalidMembership.weightIsValid())
    })
    it('weight is more than 300', () => {
      const invalidMembership = new MembershipApplication({weight: 300})
      assert(!invalidMembership.weightIsValid())
    })
    it('weight is omitted', () => {
      const invalidMembership = new MembershipApplication({})
      assert(!invalidMembership.weightIsValid())
    })
    it('first name is omitted', () => {
      const invalidMembership = new MembershipApplication({last: 'test'})
      assert(!invalidMembership.nameIsValid())
    })
    it('last name is omitted', () => {
      const invalidMembership = new MembershipApplication({first: 'hey'})
      assert(!invalidMembership.nameIsValid())
    })
  })
})
