import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Homepage } from "./Homepage";
import { UserProvider } from "../testUtils";


it("matches snapshot", function (): void {
  const { asFragment }: RenderResult = render(
      <MemoryRouter>
        <UserProvider>
          <Homepage />
        </UserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserProvider currentUser={null}>
          <Homepage />
        </UserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
