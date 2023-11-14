import { render, userEvent } from "@testing-library/react-native";
import Login from "../../app/login";
import TwoFactorAuth from "../../app/two-factor-auth";

jest.mock("../../src/services/auth/login");
jest.mock("expo-router");
jest.useFakeTimers();

const makeSut = () => {
  const sut = render(<TwoFactorAuth />);
  const user = userEvent.setup();

  return {
    sut,
    user,
  };
};

describe("Two Factor Auth Screen", () => {
  it("Should render screen correctly", () => {
    const { sut } = makeSut();

    sut.getByText("Verify Code");
    sut.getByText("Please enter the code just sent to email");
    sut.getByText("example@gmail.com");
    sut.getByText("Didn't receive OTP?");
    sut.getByText("Resend code");
    sut.getByText("Verify");
    expect(sut.getAllByLabelText(/code-input-[0-4]/g).length).toBe(4);
  });
});
