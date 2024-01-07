import React, { Fragment, useState } from "react";
import { Button, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { queryClient } from "../React-Query";
import {
  useDeleteSingleData,
  useFetchSingleData,
  useFetchTable,
} from "../React-Query/Get";
import { EditComponent } from "../Components";

export default function FetchTable() {
  const { data: tableData } = useFetchTable("table");
  const deleteMutation = useDeleteSingleData();
  const singleDataMutation = useFetchSingleData();

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);
  const [singleData, setSingleData] = useState();

  const handleEdit = async (id) => {
    const getSingleDataRes = await singleDataMutation.mutateAsync(id);
    setSingleData(getSingleDataRes?.data);
    toggle1();
  };
  const handleDelete = async (id) => {
    const deleteRes = await deleteMutation.mutateAsync(id);
    if (deleteRes.status === 200) {
      queryClient.refetchQueries("table");
      toast.success(`${deleteRes.statusText} Deleted Successfully`);
    } else {
      toast.error(deleteRes.statusText);
    }
  };
  return (
    <Fragment>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>E-mail</th>
            <th>User Name</th>
            <th>Password</th>
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
              <td>{row.password}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEdit(row._id)}
                >
                  <MdOutlineModeEdit />
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(row._id)}
                >
                  <MdOutlineDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal1} toggle={toggle1}>
        <ModalHeader toggle={toggle1}>Edit</ModalHeader>
        <ModalBody>
          <EditComponent singleData={singleData} toggle={toggle1} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
