const { render, screen } = require("@testing-library/react")
const { MemoryRouter, Routes, Route } = require("react-router-dom")
const { AuthContext } = require("../../auth")
const { PublicRoute } = require("./PublicRoute")

describe('Tests on <PublicRoute />', () => {
  test('Should show the children if user is not authenticated', () => {
    const contextValue = {
      logged: false,
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Public route')).toBeTruthy()
  })

  test('Should navigate if user is authenticated', () => {
    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Test',
      }
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path='login' element={
              <PublicRoute>
                <h1>Public route</h1>
              </PublicRoute>
            } />
            <Route path='marvel' element={<h1>Marvel page</h1>} />  
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Marvel page')).toBeTruthy()
  })
})