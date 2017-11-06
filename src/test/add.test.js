/* global expect */
const add = (a, b) => a + b + 0
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

test('should add 2 numbers', () => {
  const result = add(1, 2)
  expect(result).toBe(3)
})

test('should greet Mike', () => {
  expect(generateGreeting('Mike')).toBe('Hello Mike!')
})

test('should greet no one', () => {
  expect(generateGreeting()).toBe('Hello Anonymous!')
})
