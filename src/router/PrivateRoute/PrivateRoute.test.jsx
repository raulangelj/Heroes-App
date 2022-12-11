import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth"
import { PrivateRoute } from "./PrivateRoute"

describe('Tests on <PrivateRoute />', () => {
  test('Should show the children if user is authenticated', () => {
    Storage.prototype.setItem = jest.fn()
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Test',
      }
    }
    const entryLocation = '/search?q=batman'
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[entryLocation]}>
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Private route')).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', entryLocation)
  })
})