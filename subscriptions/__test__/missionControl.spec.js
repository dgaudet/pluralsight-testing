const moment = require('moment')
const assert = require('assert')
const sinon = require('sinon')

const db = require('../db')
const MissionControl = require('../models/MissionControl')
const Mission = require('../models/Mission')

describe('Mission Planning', () => {
  let missionControl
  beforeAll(() => {
    sinon.stub(db, 'getMissionByLaunchDate').returns(null)
    sinon.stub(db, 'createNextMission').returns(new Mission())
    missionControl = new MissionControl({ db })
  })

  describe('No Current Mission', () => {
    let currentMission

    beforeEach(async () => {
      currentMission = await missionControl.currentMission()
    })

    it('is created if none exists', () => {
      assert(currentMission)
      assert(db.getMissionByLaunchDate.called)
      assert(db.createNextMission.called)
    })
  })

  describe('Current Mission Exists', () => {
    let currentMission

    beforeEach(async () => {
      db.getMissionByLaunchDate.restore()
      sinon.stub(db, 'getMissionByLaunchDate').returns({id: 1000})
      currentMission = await missionControl.currentMission()
    })

    it('returns mission 1000', () => {
      assert.equal(currentMission.id, 1000)
      assert(db.getMissionByLaunchDate.called)
      assert(db.createNextMission.called)
    })
  })
})
