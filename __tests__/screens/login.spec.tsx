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

const mockedLogin = login as jest.MockedFunction<typeof login>;
const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;

const makeSut = () => {
  const sut = render(<Login />);

  return {
    sut,
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
    sut.getByText("Don't have an account? Sign Up");
    sut.getByText("Forgot Password?");
  });
  it("Should block inputs when trying to sign in", async () => {
    jest.useFakeTimers();
    const { sut } = makeSut();

    mockedLogin.mockImplementation(
      async () => new Promise((res) => setTimeout(res, 1500))
    );

    const loginButton = sut.getByTestId("sign-in-button");

    fireEvent(loginButton, "press");

    await waitFor(async () =>
      expect(sut.getByPlaceholderText("example@gmail.com")).toBeDisabled()
    );

    expect(sut.getByPlaceholderText("******")).toBeDisabled();
    expect(loginButton).toBeDisabled();

    act(() => jest.runAllTimers());

    await waitFor(() =>
      expect(sut.queryByTestId("sign-in-button")).not.toBeDisabled()
    );
  });
  it("Should show/hide password when clicking on eye icon", async () => {
    const { sut } = makeSut();

    const eyeIcon = sut.getByTestId("password-eye-icon");
    const passwordInput = sut.getByPlaceholderText("******");

    fireEvent(eyeIcon, "press");

    expect(passwordInput).toHaveProp("secureTextEntry", false);

    fireEvent(eyeIcon, "press");

    expect(passwordInput).toHaveProp("secureTextEntry", true);
  });
  it("Should navigate to forgot password screen", async () => {
    const useRouterReturnMock = makeUseRouterMock();

    useRouterMock.mockReturnValue(useRouterReturnMock);

    const { sut } = makeSut();

    const forgotPasswordText = sut.getByText("Forgot Password?");

    fireEvent(forgotPasswordText, "press");

    expect(useRouterReturnMock.push).toHaveBeenCalledWith("forgot-password");
  });
  it("Should navigate to sign up screen", async () => {
    const useRouterReturnMock = makeUseRouterMock();

    useRouterMock.mockReturnValue(useRouterReturnMock);

    const { sut } = makeSut();

    const signUpText = sut.getByTestId("sign-up-button");

    fireEvent(signUpText, "press");

    expect(useRouterReturnMock.push).toHaveBeenCalledWith("sign-up");
  });
  it("Should call login method with the correct parameters", async () => {
    const { sut } = makeSut();

    const emailInput = sut.getByPlaceholderText("example@gmail.com");
    const passwordInput = sut.getByPlaceholderText("******");

    const email = faker.internet.email();
    const password = faker.internet.password();

    fireEvent(emailInput, "changeText", email);
    fireEvent(passwordInput, "changeText", password);

    const loginButton = sut.getByTestId("sign-in-button");

    fireEvent(loginButton, "press");
    expect(mockedLogin).toHaveBeenCalledWith({ email, password });
  });
});
