import React, { useEffect, useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import MastersModal from "../MastersModal/MastersModal";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { deleteOutletData, outletTableData, searchOutletItems } from "../ApiMasters/ApiMasters";

const Outlets = () => {
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
    name: ""
  });

  const openModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    outletTableData(setTableData);
  }, []);

  const handleOpen = () => {
    setSuccessModalOpen(true);
  };
  const handleClose = () => {
    setSuccessModalOpen(false);
  };

  const handleDeleteOpen = (itemId) => {
    setDeleteConfirmationOpen(true);
    setDeleteId(itemId);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setsearchListId(value);
    searchOutletItems(searchListId, setTableData, setsearchListId);
  };

  useEffect(() => {
    searchOutletItems(searchListId, setTableData, setErrors);
  }, [searchListId]);

  const handleEdit = (itemId) => {
    const selectedItem = tableData.find((item) => item.id === itemId);
    setOpen(true);
    setInputData(
      selectedItem || {
        name: ""
      }
    );
  };
 console.log("tabledata" , tableData)

  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Outlet</h3>

          <div className="secton_search">
            <div className="Search_Admin">
              <div className="Search_User">
                <input type="text" placeholder="Search "
                 value={searchListId}
                 onChange={handleInputChange}
                />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Create Outlet</button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="table_borderleft">
            <thead>
              <tr>
                <th>Sl No</th>
                <th className="wide-column">Outlet name</th>
                <th>Place</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {(filteredData.length > 0 && searchListId !== ""
                ? filteredData
                : tableData
              ).map((item, index) => (
              <tr className="table_row">
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.palce}</td>
                <td>
                  <div className="btn_td">
                    <button className="btn_section"
                      onClick={() => handleEdit(item.id)}
                    >
                      <img
                        className="btn_section_img"
                        src={editicon}
                        alt=""
                        srcset=""
                      />
                    </button>
                    <button className="btn_section2"
                     onClick={() => handleDeleteOpen(item.id)}
                    >
                      <img
                        className="btn_section_img"
                        src={dlticon}
                        alt=""
                        srcset=""
                      />
                    </button>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
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
          modalHeading="Create Outlet"
          modalPage="outlets"
          btnName="Create"
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
            deleteOutletData(
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

export default Outlets;
