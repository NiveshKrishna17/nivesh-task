import React, { Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { useFetchTable } from "../React-Query/Get";
import { MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";

export default function FetchTable() {
  const { data: tableData, isLoading } = useFetchTable("table");

  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <Fragment>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>E-mail</th>
            <th>User Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.email}</td>
              <td>{row.userName}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(row.id)}
                >
                  <MdOutlineModeEdit />
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(row.id)}
                >
                  <MdOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}
