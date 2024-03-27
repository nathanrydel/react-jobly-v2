import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";
import JoblyApi from "../api/api";


it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <LoginForm login={JoblyApi.login}/>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
