const assert = require('assert')
const sinon = require('sinon')

const DB = require('../db')
const MissionControl = require('../models/MissionControl')
const Mission = require('../models/Mission')
const Helpers = require('./helpers')

describe('Mission Planning', () => {
  let missionControl
  let db
  beforeAll(() => {
    db = Helpers.stubDb()
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
