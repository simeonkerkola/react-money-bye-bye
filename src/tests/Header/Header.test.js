import React from 'react'
import { shallow } from 'enzyme'

// Use every time when expecting something from enzyme wrapper to get rid of all the junk
// in snapshot file
import toJSON from 'enzyme-to-json'
import Header from '../../components/Header'

test('should render header correctly', () => {
  const wrapper = shallow(<Header />)

  expect(wrapper.find('h1').length).toBe(1) // Expect to have only one h1 tag
  expect(toJSON(wrapper)).toMatchSnapshot()
})
