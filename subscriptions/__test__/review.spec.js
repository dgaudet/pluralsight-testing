const assert = require('assert')
const ReviewProcess = require('../processes/Review')
const MembershipApplication = require('../models/MembershipApplication')
const sinon = require('sinon')
const Helpers = require('./helpers')

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision
    const validApp = Helpers.validApplication
    let review
    let db

    beforeAll(() => {
      db = Helpers.stubDb()
      sinon.stub(db, 'saveAssignment').returns({saved: true})
      review = new ReviewProcess({application: validApp, db })
      sinon.spy(review, 'ensureAppIsValid')
      sinon.spy(review, 'findNextMission')
      sinon.spy(review, 'roleIsAvailable')
      sinon.spy(review, 'ensureRoleCompatible')
      sinon.spy(review, 'approveApplication')
    })

    beforeEach(async () => {
      await review.processApplication((err, result) => {
        decision = result
      })
    })

    it('returns success', () => {
      assert(decision.success, decision.message)
    })
    it('returns an assignment', () => {
      assert(decision.assignment)
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
    it('ensures the application is approved', () => {
      assert(review.approveApplication.called)
      assert(db.saveAssignment.called)
    })
  })

  describe('Receiving an invalid application', () => {
    let decision
    let inValidApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
    })

    const db = Helpers.stubDb()
    let review = new ReviewProcess({application: inValidApp, db})

    it('Returns an error', async () => {
      await review.processApplication((err, result) => {
        decision = result
      })

      assert(!decision.success)
      assert(decision.message)
    })
  })
})
