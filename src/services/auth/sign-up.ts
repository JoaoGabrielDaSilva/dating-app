// import { mockAuthResponse } from "../../../__tests__/helpers/mocks/mock-auth-response";

type Params = {
  name: string;
  email: string;
  password: string;
};

type Response = {
  success: boolean;
};

export const signUp = async ({
  name,
  email,
  password,
}: Params): Promise<Response> => {
  const response = await new Promise<Response>((res) =>
    setTimeout(
      () =>
        res({
          success: true,
        }),
      1500
    )
  );

  return {
    success: response.success,
  };
};
