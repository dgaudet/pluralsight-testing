const MembershipApplication = require('../../MembershipApplication')

exports.validApplication = new MembershipApplication({
  first: 'Test',
  last: 'User',
  email: 'test@test.com',
  age: 30,
  height: 66,
  weight: 180
})
