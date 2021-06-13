import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import IncidentTable from "./index";

describe("<IncidentTable />", () => {
  const data = [
    {
      id: 1,
      date: "2021-01-01",
      title: "testing-title1",
      type: "testing-type1",
      reportedBy: "no one",
      assignedTo: "no one",
    },
    {
      id: 2,
      date: "2021-01-02",
      title: "testing-title2",
      type: "testing-type2",
      reportedBy: "no one",
      assignedTo: "no one",
    },
  ];

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
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("should display all columns header", () => {
    const state = {
      active: null,
    };

    render(
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
      />
    );

    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Reported By")).toBeInTheDocument();
    expect(screen.getByText("Assigned To")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("should display rows based on given data", () => {
    const state = {
      active: null,
    };

    const { container } = render(
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
        data={data}
      />
    );
    expect(container.querySelectorAll("tbody > tr").length).toBe(data.length);
  });

  it("should disable Edit and Delete button when state user is not in admin role", () => {
    const state = {
      active: {
        role: "user",
      },
    };

    render(
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
        data={[data[0]]}
      />
    );

    expect(screen.getByTestId("edit-btn")).toHaveAttribute("disabled");
    expect(screen.getByTestId("delete-btn")).toHaveAttribute("disabled");
  });

  it("should enable Edit and Delete button when state user is a admin", () => {
    const state = {
      active: {
        role: "admin",
      },
    };

    render(
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
        data={[data[0]]}
      />
    );

    expect(screen.getByTestId("edit-btn")).not.toHaveAttribute("disabled");
    expect(screen.getByTestId("delete-btn")).not.toHaveAttribute("disabled");
  });

  it("should  not call onEditClick method when none admin user clicks on Edit button", () => {
    const state = {
      active: {
        role: "user",
      },
    };
    const handleEditClick = jest.fn();
    render(
      <IncidentTable
        onEditClick={handleEditClick}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
        data={[data[0]]}
      />
    );

    fireEvent.click(screen.getByTestId("edit-btn"));

    expect(handleEditClick).toHaveBeenCalledTimes(0);
  });

  it("should call onEditClick method when click on Edit button", () => {
    const state = {
      active: {
        role: "admin",
      },
    };
    const handleEditClick = jest.fn();
    render(
      <IncidentTable
        onEditClick={handleEditClick}
        onDeleteClick={jest.fn()}
        onViewClick={jest.fn()}
        state={state}
        data={[data[0]]}
      />
    );

    fireEvent.click(screen.getByTestId("edit-btn"));

    expect(handleEditClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onDeleteClick method when none admin user clicks on Delete button", () => {
    const state = {
      active: {
        role: "user",
      },
    };
    const handleDeleteClick = jest.fn();
    render(
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={handleDeleteClick}
        onViewClick={jest.fn()}
        state={state}
        data={[data[0]]}
      />
    );

    fireEvent.click(screen.getByTestId("delete-btn"));

    expect(handleDeleteClick).toHaveBeenCalledTimes(0);
  });

  it("should call onDeleteClick method when click on Delete button", () => {
    const state = {
      active: {
        role: "admin",
      },
    };
    const handleDeleteClick = jest.fn();
    render(
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={handleDeleteClick}
        onViewClick={jest.fn()}
        state={state}
        data={[data[0]]}
      />
    );

    fireEvent.click(screen.getByTestId("delete-btn"));

    expect(handleDeleteClick).toHaveBeenCalledTimes(1);
  });

  it("should call onViewClick method when click on View button", () => {
    const state = {
      active: {
        role: null,
      },
    };
    const handleViewClick = jest.fn();
    render(
      <IncidentTable
        onEditClick={jest.fn()}
        onDeleteClick={jest.fn()}
        onViewClick={handleViewClick}
        state={state}
        data={[data[0]]}
      />
    );

    fireEvent.click(screen.getByTestId("view-btn"));

    expect(handleViewClick).toHaveBeenCalledTimes(1);
  });
});
