const _ = require('underscore')._
const assert = require('assert')

const Mission = require('../models/Mission')
const Assignment = require('../models/Assignment')

const goodSpecs = { age: 40, height: 60, weight: 190 }

describe('Assignemnts', () => {
  describe('Commander with valid app', () => {
    let assignment

    beforeAll(() => {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({id: 1000}),
        role: 'commander'
      })
    })

    it('compatible', () => {
      assert(assignment.passengerIsCompatible)
    })
  })

  describe('Commander overweight', () => {
    let assignment

    beforeAll(() => {
      assignment = new Assignment({
        passenger: {weight: 300},
        mission: new Mission({id: 1000}),
        role: 'commander'
      })
    })

    it('no compatibility', () => {
      assert(!assignment.passengerIsCompatible())
    })
  })

  describe('Commander too tall', () => {
    let assignment

    beforeAll(() => {
      assignment = new Assignment({
        passenger: { height: 300 },
        mission: new Mission({id: 1000}),
        role: 'commander'
      })
    })

    it('no compatibility', () => {
      assert(!assignment.passengerIsCompatible())
    })
  })

  describe('Passenger availability - empty mission', () => {
    let assignment

    beforeAll(() => {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({id: 1000}),
        role: 'space-tourist'
      })
    })

    it('available with no passengers', () => {
      assert(assignment.passengerIsCompatible())
    })
  })
})
