import React, { useMemo } from "react";
import { Table, Button } from "antd";

const IncidentTable = ({
  data = [],
  onEditClick,
  onDeleteClick,
  onViewClick,
  state,
}) => {
  const isAdmin = state.active?.role === "admin" || false;

  const columns = useMemo(() => {
    return [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Reported By",
        dataIndex: "reportedBy",
        key: "reportedBy",
      },
      {
        title: "Assigned To",
        dataIndex: "assignedTo",
        key: "assignedTo",
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 300,
        render: ({ id }) => {
          return (
            <>
              <Button
                style={{ marginRight: 20 }}
                onClick={() => onViewClick(id)}
                data-testid="view-btn"
              >
                VIEW
              </Button>
              <Button
                type="primary"
                style={{ marginRight: 20 }}
                onClick={() => onEditClick(id)}
                disabled={!isAdmin}
                data-testid="edit-btn"
              >
                EDIT
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => onDeleteClick(id)}
                disabled={!isAdmin}
                data-testid="delete-btn"
              >
                DELETE
              </Button>
            </>
          );
        },
      },
    ];
  }, [isAdmin, onDeleteClick, onEditClick, onViewClick]);

  return <Table dataSource={data} columns={columns} />;
};

export default IncidentTable;
