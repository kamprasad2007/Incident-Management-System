import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import IncidentCard from "./index";

describe("<IncidentCard />", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("should render without crashing", () => {
    const state = {
      active: null,
    };

    const { container } = render(
      <IncidentCard onSubmit={jest.fn()} onCancel={jest.fn()} state={state} />
    );

    expect(container).toBeInTheDocument();
  });

  it("should display all fields", () => {
    const state = {
      active: null,
    };

    render(
      <IncidentCard
        onEditClick={jest.fn()}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
      />
    );

    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Reported By")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
  });

  it("should display error messages when click on submit button and will not call onSubmit method", async () => {
    const state = {
      active: null,
    };
    const handleSubmit = jest.fn();
    render(
      <IncidentCard
        onSubmit={handleSubmit}
        onCancel={jest.fn()}
        state={state}
      />
    );

    fireEvent.click(screen.getByTestId("submit-btn"));

    expect(handleSubmit).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      expect(screen.getByText("Please input title!")).toBeInTheDocument();
      expect(screen.getByText("Please input description!")).toBeInTheDocument();
      expect(screen.getByText("Please input type!")).toBeInTheDocument();
      expect(screen.getByText("Please input type!")).toBeInTheDocument();
    });
  });

  it("should call onCancel when click on cancel button", async () => {
    const state = {
      active: null,
    };
    const handleCancel = jest.fn();
    render(
      <IncidentCard
        onSubmit={jest.fn()}
        onCancel={handleCancel}
        state={state}
      />
    );

    fireEvent.click(screen.getByTestId("cancel-btn"));

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit when click on submit button after filled form", async () => {
    const state = {
      active: null,
    };
    const initialValues = {
      date: "2021-01-01",
      title: "test",
      description: "test",
      type: "low",
      reportedBy: "test",
    };

    const handleSubmit = jest.fn();
    render(
      <IncidentCard
        onSubmit={handleSubmit}
        onCancel={jest.fn()}
        state={state}
        initialValues={initialValues}
      />
    );

    fireEvent.click(screen.getByTestId("submit-btn"));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  });

  it("should display CREATE on button when not passing isEdit prop", async () => {
    const state = {
      active: null,
    };
    render(
      <IncidentCard onSubmit={jest.fn()} onCancel={jest.fn()} state={state} />
    );

    expect(screen.getByTestId("submit-btn")).toHaveTextContent("CREATE");
  });

  it("should display UPDATE on button and assignedTo selector when passing isEdit as True", async () => {
    const state = {
      active: null,
      users: [],
    };
    render(
      <IncidentCard
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
        state={state}
        isEdit={true}
      />
    );

    expect(screen.getByTestId("submit-btn")).toHaveTextContent("UPDATE");
    expect(screen.getByTestId("assignedTo-select")).toBeInTheDocument();
  });
});
