import { types } from "../../types"
import { authReducer } from "./authReducer"

describe('Test on authReducer', () => {
  test('should return default values', () => {
    const state = authReducer({ logged: false }, {})
    expect(state).toEqual({ logged: false })
  })

  test('should do login', () => {
    const action = {
      type: types.login,
      payload: {
        id: 'ABC',
        name: 'Jorge'
      }
    }
    const state = authReducer({ logged: false }, action)
    expect(state).toEqual({ logged: true, user: action.payload })
  })

  test('should do logout', () => {
    const action = {
      type: types.logout,
    }
    const state = authReducer({ logged: true, user: { id: 'ABC', name: 'Jorge' } }, action)
    expect(state).toEqual({ logged: false })

  })
})