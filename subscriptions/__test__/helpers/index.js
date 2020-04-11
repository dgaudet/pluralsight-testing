const MembershipApplication = require('../../models/MembershipApplication')
const DB = require('../../db')
const Mission = require('../../models/Mission')
const sinon = require('sinon')

exports.validApplication = new MembershipApplication({
  first: 'Test',
  last: 'User',
  email: 'test@test.com',
  age: 30,
  height: 66,
  weight: 180
})

exports.stubDb = (args) => {
  args || (args = {})
  const mission = args.mission || new Mission()
  const db = new DB()
  sinon.stub(db, 'getMissionByLaunchDate').returns(null)
  sinon.stub(db, 'createNextMission').returns(mission)
  return db
}
