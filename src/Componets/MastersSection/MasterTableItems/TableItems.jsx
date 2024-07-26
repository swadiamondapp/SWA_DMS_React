import React, { useEffect, useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import { IoHandLeft } from "react-icons/io5";
import MastersModal from "../MastersModal/MastersModal";
import {
  delete_finding_data,
  finding_table_data,
  search_finding_data,
} from "../ApiMasters/ApiMasters";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../../SuccessModal/SuccessModal";

const TableItems = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchListId, setsearchListId] = useState("");
  const [filteredData, setfilteredData] = useState([]);
  const [errors, setErrors] = useState("");
  const [inputData, setInputData] = useState({
    find_name: "",
    priority: "",
  });

  const openModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    finding_table_data(setTableData);
  }, []);

  const handleDeleteOpen = (userId) => {
    setDeleteConfirmationOpen(true);
    setDeleteId(userId);
  };

  const handleOpen = () => {
    setSuccessModalOpen(true);
  };
  const handleClose = () => {
    setSuccessModalOpen(false);
  };

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setsearchListId(value);

    await search_finding_data(value,setTableData);
  };




  useEffect(() => {
    search_finding_data(searchListId, setTableData, setErrors);
  }, [searchListId]);

  const handleEdit = (itemId) => {
    const selectedItem = tableData.find((item) => item.id === itemId);
    setOpen(true);
    setInputData(selectedItem || { find_name: "", priority: "" });
  };

  console.log("errors -----", errors);

  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Findings</h3>

          <div className="secton_search">
            <div className="Search_Admin">
              <div className="Search_User">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchListId}
                  onChange={handleInputChange}
                />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Create Findings</button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="table_borderleft">
            <thead>
              <tr>
                <th style={{ borderLeft: "none" }}>Sl No</th>
                <th>Name</th>
                <th className="wide-column">Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table_border_left">
              {(filteredData.length > 0 && searchListId !== ""
                ? filteredData
                : tableData
              ).map((item, index) => (
                <tr key={item.id} className="table_row">
                  <td style={{ borderLeft: "none" }}>{index + 1}</td>
                  <td>
                    <span className="bg_cover">{item.find_name}</span>
                  </td>
                  <td>{item.priority}</td>
                  <td>
                    <div className="btn_td">
                      <button
                        className="btn_section"
                        onClick={() => handleEdit(item.id)}
                      >
                        <img
                          className="btn_section_img"
                          src={editicon}
                          alt=""
                        />
                      </button>
                      <button
                        className="btn_section2"
                        onClick={() => handleDeleteOpen(item.id)}
                      >
                        <img className="btn_section_img" src={dlticon} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {errors && <span style={{ color: "red" }}>{errors}</span>}
            </tbody>
          </table>
          {tableData.length === 0 && (
          <div
            className=""
            style={{
              width: "100%",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>No Data Found</span>
          </div>
        )}
        </div>
        <SuccessModal
          successModalOpen={successModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          successMessage={successMessage}
        />
      </div>

      {open && (
        <MastersModal
          modalHeading="Create Findings"
          btnName="Add Finding"
          modalPage="Findings"
          openModal={openModal}
          setOpen={setOpen}
          setTableData={setTableData}
          inputData={inputData}
          setInputData={setInputData}
        />
      )}

      {DeleteConfirmationOpen && (
        <DeleteConfirmationModal
          DeleteConfirmationOpen={DeleteConfirmationOpen}
          handleDeleteOpen={handleDeleteOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          deleteFunction={() => {
            delete_finding_data(
              setTableData,
              deleteId,
              setDeleteConfirmationOpen,
              setSuccessMessage,
              setSuccessModalOpen
            );
          }}
        />
      )}
    </>
  );
};

export default TableItems;
