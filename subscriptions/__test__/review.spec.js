const assert = require('assert')
const ReviewProcess = require('../processes/Review')
const MembershipApplication = require('../MembershipApplication')

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision

    beforeEach(() => {
      let validApp = new MembershipApplication({
        first: 'Test',
        last: 'User',
        email: 'test@test.com',
        age: 30,
        height: 66,
        weight: 180
      })

      let review = new ReviewProcess()
      review.processApplication(validApp, (err, result) => {
        decision = result
      })
    })

    it('returns success', () => {
      assert(decision.success, decision.message)
    })
  })
})
