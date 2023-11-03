import { mockAuthResponse } from "../../../__tests__/helpers/mocks/mock-auth-response";

type Params = {
  email: string;
  password: string;
};

type Response = {
  token: string;
};

export const login = async ({ email, password }: Params): Promise<Response> => {
  const response = await new Promise<Response>((res) =>
    setTimeout(() => res(mockAuthResponse()), 1500)
  );

  return {
    token: response.token,
  };
};
