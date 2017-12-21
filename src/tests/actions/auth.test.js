import { login, logout } from '../../actions/auth'

test('should generate login action object', () => {
  const action = login('abc666')
  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'abc666',
  })
})

test('should generate logout action object', () => {
  const action = logout()
  expect(action).toEqual({
    type: 'LOGOUT',
  })
})
