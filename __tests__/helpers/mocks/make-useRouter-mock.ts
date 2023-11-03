export const makeUseRouterMock = () => ({
  push: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn(),
  replace: jest.fn(),
  setParams: jest.fn(),
});
