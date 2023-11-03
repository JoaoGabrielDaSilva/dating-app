import { faker } from "@faker-js/faker";

export const mockAuthResponse = () => ({
  token: faker.string.uuid(),
});
