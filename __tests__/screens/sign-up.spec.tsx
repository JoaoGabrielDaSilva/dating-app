import { faker } from "@faker-js/faker";
import {
  fireEvent,
  render,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { useRouter } from "expo-router";
import SignUp from "../../app/sign-up";
import { makeUseRouterMock } from "../helpers/mocks/make-useRouter-mock";
import { signUp } from "../../src/services/auth/sign-up";

jest.mock("../../src/services/auth/sign-up");
jest.mock("expo-router");

jest.useFakeTimers();

const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>;
const signUpMock = signUp as jest.MockedFunction<typeof signUp>;

const makeSut = () => {
  const sut = render(<SignUp />);
  const user = userEvent.setup();

  return {
    sut,
    user,
  };
};

describe("Sign Up Screen", () => {
  afterEach(() => {
    useRouterMock.mockClear();
    signUpMock.mockClear();
  });

  it("Should render screen correctly", () => {
    const { sut } = makeSut();

    sut.getByText("Create Account");
    sut.getByText(
      "Fill your information below or register with your social account"
    );
    sut.getByText("Name");
    sut.getByText("E-mail");
    sut.getByText("Password");
    sut.getByText("Confirm Password");
    sut.getByPlaceholderText("John Doe");
    sut.getByPlaceholderText("example@gmail.com");
    sut.getByLabelText("password");
    sut.getByLabelText("confirmPassword");
    sut.getByText("Already have an account? ");
    sut.getByText("Sign In");
  });

  it("Should show/hide password when clicking on eye icon", async () => {
    const { sut, user } = makeSut();

    const eyeIcon = sut.getByTestId("password-eye-icon");
    const passwordInput = sut.getByLabelText("password");
    const confirmPasswordInput = sut.getByLabelText("confirmPassword");

    await user.press(eyeIcon);

    await waitFor(() =>
      expect(passwordInput).toHaveProp("secureTextEntry", false)
    );

    expect(confirmPasswordInput).toHaveProp("secureTextEntry", false);

    await user.press(eyeIcon);

    await waitFor(() =>
      expect(passwordInput).toHaveProp("secureTextEntry", true)
    );
    expect(confirmPasswordInput).toHaveProp("secureTextEntry", true);
  });

  it("Should navigate to sign in screen", async () => {
    const useRouterReturnMock = makeUseRouterMock();

    useRouterMock.mockReturnValue(useRouterReturnMock);

    const { sut, user } = makeSut();

    const signUpText = sut.getByText("Sign In");

    await user.press(signUpText);

    await waitFor(() =>
      expect(useRouterReturnMock.push).toHaveBeenCalledWith("login")
    );
  });
  it("Should call login method with the correct parameters", async () => {
    const { sut, user } = makeSut();

    const nameInput = sut.getByPlaceholderText("John Doe");
    const emailInput = sut.getByPlaceholderText("example@gmail.com");
    const passwordInput = sut.getByLabelText("password");
    const confirmPasswordInput = sut.getByLabelText("confirmPassword");

    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await user.type(nameInput, name);
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.type(confirmPasswordInput, password);

    const signInButton = sut.getByText("Sign Up");

    await user.press(signInButton);

    expect(signUpMock).toHaveBeenCalledWith({ name, email, password });
  });
});
