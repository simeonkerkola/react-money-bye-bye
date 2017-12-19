import React from 'react'
import { shallow } from 'enzyme'

// Use enzyme-to-json every time when expecting something from enzyme wrapper to
// get rid of all the junk in snapshot file
import toJSON from 'enzyme-to-json'
import { Header } from '../../components/Header'

let startLogout
let wrapper

beforeEach(() => {
  startLogout = jest.fn()
  wrapper = shallow(<Header startLogout={startLogout} />)
})

test('should render header correctly', () => {
  expect(wrapper.find('h1').length).toBe(1) // Expect to have only one h1 tag
  expect(toJSON(wrapper)).toMatchSnapshot()
})

test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('click')
  expect(startLogout).toHaveBeenCalled()
})
