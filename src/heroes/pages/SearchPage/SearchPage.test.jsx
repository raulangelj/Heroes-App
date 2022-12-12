import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "./SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Tests on <SearchPage />", () => {

  beforeEach(() => jest.clearAllMocks());

  test("Should display default values", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("Should display Batman and the input with the query string", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");

    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("none");
  });

  test("Should display an error if hero was not found", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("");
  });

  test("Should call the navigate to the new screen", () => {
    const inputText = "iron man";

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { name: 'searchText', value: inputText } });
    fireEvent.click(button);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputText}`);
  });
});
