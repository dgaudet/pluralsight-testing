const assert = require('assert')
const ReviewProcess = require('../processes/Review')
const MembershipApplication = require('../MembershipApplication')
const sinon = require('sinon')
const Helpers = require('./helpers')

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision
    let validApp = Helpers.validApplication

    let review = new ReviewProcess({application: validApp})
    sinon.spy(review, 'ensureAppIsValid')
    sinon.spy(review, 'findNextMission')
    sinon.spy(review, 'roleIsAvailable')
    sinon.spy(review, 'ensureRoleCompatible')

    beforeEach(async () => {
      await review.processApplication((err, result) => {
        decision = result
      })
    })

    it('returns success', () => {
      assert(decision.success, decision.message)
    })
    it('ensures the application is valid', () => {
      assert(review.ensureAppIsValid.called)
    })
    it('selects a mission', () => {
      assert(review.findNextMission.called)
    })
    it('ensure a role exists', () => {
      assert(review.roleIsAvailable.called)
    })
    it('ensures the role is compatible', () => {
      assert(review.ensureRoleCompatible.called)
    })
  })

  describe('Receiving an invalid application', () => {
    let decision
    let inValidApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
    })

    let review = new ReviewProcess({application: inValidApp})

    it('Returns an error', async () => {
      await review.processApplication((err, result) => {
        decision = result
      })

      assert(!decision.success)
      assert(decision.message)
    })
  })
})
