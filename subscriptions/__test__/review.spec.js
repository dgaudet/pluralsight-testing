const assert = require('assert')
const ReviewProcess = require('../processes/Review')
const MembershipApplication = require('../MembershipApplication')
const sinon = require('sinon')

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision
    let validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    })

    let review = new ReviewProcess()
    const validationSpy = sinon.spy()
    const missionSpy = sinon.spy()
    const roleAvailableSpy = sinon.spy()
    const roleCompatibleSpy = sinon.spy()

    beforeEach(() => {
      review.on('validated', validationSpy)
      review.on('mission-selected', missionSpy)
      review.on('role-available', roleAvailableSpy)
      review.on('role-compatible', roleCompatibleSpy)
      review.processApplication(validApp, (err, result) => {
        decision = result
      })
    })

    it('returns success', () => {
      assert(decision.success, decision.message)
    })
    it('ensures the application is valid', () => {
      assert(validationSpy.called)
    })
    it('selects a mission', () => {
      assert(missionSpy.called)
    })
    it('ensure a role exists', () => {
      assert(roleAvailableSpy.called)
    })
    it('ensures the role is compatible', () => {
      assert(roleCompatibleSpy.called)
    })
  })
})
