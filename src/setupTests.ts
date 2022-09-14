import nock from "nock";
import "./test/matchMedia.mock";
import "@testing-library/jest-dom";
import "jest-styled-components";

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
