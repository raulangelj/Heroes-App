import { types } from "./types"

describe('Tests on "types.js"', () => {
  test('Should return this types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    })
  })
})