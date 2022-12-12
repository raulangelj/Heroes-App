import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth";
import { AppRouter } from "./AppRouter";

describe("Tests on <AppRouter />", () => {
  test("should display login if user is not authenticated", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={{ contextValue }}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("Should display the marvel component if user is authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        id: "ABC",
        name: "Juan Carlos",
      },
    };

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
});
