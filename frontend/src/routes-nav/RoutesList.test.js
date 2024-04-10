import React from "react";
import { render } from "@testing-library/react";
import RoutesList from "./RoutesList";
import { MemoryRouter } from "react-router";
import { UserProvider } from '~/providers';
import { MockUserProvider } from '~/test-utils/MockUserProvider';

// Define the demoUser object
const demoUser = {
  username: "testuser",
  firstName: "testfirst",
  lastName: "testlast",
  password: "testpassword",
  email: "test@test.net",
  isAdmin: false,
  applications: [],
};

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <RoutesList />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("matches snapshot with demo user", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <MockUserProvider currentUser={demoUser}>
          <RoutesList />
        </MockUserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
