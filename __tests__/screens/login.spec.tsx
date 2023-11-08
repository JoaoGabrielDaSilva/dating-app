import {
  act,
  fireEvent,
  render,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import Login from "../../app/login";
import { faker } from "@faker-js/faker";
import { login } from "../../src/services/auth/login";
import { useRouter } from "expo-router";
import { makeUseRouterMock } from "../helpers/mocks/make-useRouter-mock";

jest.mock("../../src/services/auth/login");
jest.mock("expo-router");
jest.useFakeTimers();

const mockedLogin = login as jest.MockedFunction<typeof login>;
const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;

const makeSut = () => {
  const sut = render(<Login />);
  const user = userEvent.setup();

  return {
    sut,
    user,
  };
};

describe("Login Screen", () => {
  afterEach(() => {
    mockedLogin.mockClear();
  });

  it("Should render screen correctly", () => {
    const { sut } = makeSut();

    expect(sut.queryAllByText("Sign In").length).toBe(2);
    sut.getByText("Hi! Welcome back, you've been missed");
    sut.getByText("E-mail");
    sut.getByText("Password");
    sut.getByPlaceholderText("example@gmail.com");
    sut.getByPlaceholderText("******");
    sut.getByText("Don't have an account? ");
    sut.getByText("Sign Up");
    sut.getByText("Forgot Password?");
  });
  it("Should block inputs when trying to sign in", async () => {
    const { sut, user } = makeSut();

    mockedLogin.mockImplementation(
      async () => new Promise((res) => setTimeout(res, 1500))
    );

    const emailInput = sut.getByPlaceholderText("example@gmail.com");
    const passwordInput = sut.getByPlaceholderText("******");

    const email = faker.internet.email();
    const password = faker.internet.password();

    user.type(emailInput, email);

    await waitFor(() => user.type(passwordInput, password));

    const loginButton = sut.getByTestId("sign-in-button");

    user.press(loginButton);

    await waitFor(async () =>
      expect(sut.queryByPlaceholderText("example@gmail.com")).toBeDisabled()
    );

    expect(sut.getByPlaceholderText("******")).toBeDisabled();
    expect(loginButton).toBeDisabled();

    act(() => jest.runAllTimers());

    await waitFor(() =>
      expect(sut.queryByTestId("sign-in-button")).not.toBeDisabled()
    );
  });
  it("Should show/hide password when clicking on eye icon", async () => {
    const { sut, user } = makeSut();

    const eyeIcon = sut.getByTestId("password-eye-icon");
    const passwordInput = sut.getByPlaceholderText("******");

    await user.press(eyeIcon);

    await waitFor(() =>
      expect(passwordInput).toHaveProp("secureTextEntry", false)
    );

    await user.press(eyeIcon);

    expect(passwordInput).toHaveProp("secureTextEntry", true);
  });
  it("Should navigate to forgot password screen", async () => {
    const useRouterReturnMock = makeUseRouterMock();

    useRouterMock.mockReturnValue(useRouterReturnMock);

    const { sut, user } = makeSut();

    const forgotPasswordText = sut.getByText("Forgot Password?");

    await user.press(forgotPasswordText);

    await waitFor(() =>
      expect(useRouterReturnMock.push).toHaveBeenCalledWith("forgot-password")
    );
  });
  it("Should navigate to sign up screen", async () => {
    const useRouterReturnMock = makeUseRouterMock();

    useRouterMock.mockReturnValue(useRouterReturnMock);

    const { sut, user } = makeSut();

    const signUpText = sut.getByTestId("sign-up-button");

    await user.press(signUpText);

    await waitFor(() =>
      expect(useRouterReturnMock.push).toHaveBeenCalledWith("sign-up")
    );
  });
  it("Should call login method with the correct parameters", async () => {
    const { sut, user } = makeSut();

    const emailInput = sut.getByPlaceholderText("example@gmail.com");
    const passwordInput = sut.getByPlaceholderText("******");

    const email = faker.internet.email();
    const password = faker.internet.password();

    user.type(emailInput, email);
    await waitFor(() => user.type(passwordInput, password));

    const loginButton = sut.getByTestId("sign-in-button");

    await waitFor(() => user.press(loginButton));

    expect(mockedLogin).toHaveBeenCalledWith({ email, password });
  });
});
