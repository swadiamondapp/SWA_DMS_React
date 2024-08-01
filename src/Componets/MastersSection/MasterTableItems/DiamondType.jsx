import React, { useEffect, useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import MastersModal from "../MastersModal/MastersModal";
import {
  deleteDiamondData,
  diamondTableData,
  searchDiamondItems,
} from "../ApiMasters/ApiMasters";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { CircularProgress } from "@mui/material";

const DiamondType = () => {
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
    name: "",
    price: "",
  });

  const openModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    diamondTableData(setTableData);
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

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setsearchListId(value);
    await searchDiamondItems(value, setTableData);
  };

  useEffect(() => {
    searchDiamondItems(searchListId, setTableData, setErrors);
  }, [searchListId]);

  const handleEdit = (itemId) => {
    const selectedItem = tableData.find((item) => item.id === itemId);
    setOpen(true);
    setInputData(
      selectedItem || {
        name: "",
        price: "",
      }
    );
  };
 
  console.log("table data",tableData)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tableData.length === 0) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [tableData]);


  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Diamond Type</h3>

          <div className="secton_search">
            <div className="Search_Admin">
              <div className="Search_User">
                <input
                  type="text"
                  placeholder="Search "
                  value={searchListId}
                  onChange={handleInputChange}
                />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Diamond Type</button>
            </div>
          </div>
        </div>

        {tableData.length === 0 && loading === true ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress
            size={50}
            sx={{
              color: '#126e72',
              padding: '8px 10px',
              width: '35px',
            }}
          />
        </div>
      ) : (
        <div className="table-container">
          <table className="table_borderleft">
            <thead>
              <tr>
                <th>Sl No</th>
                <th className="wide-column">Diamond Name</th>
                <th>Price</th>
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
                  <td>₹ {item.price}</td>
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
                          srcset=""
                        />
                      </button>
                      <button
                        className="btn_section2"
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
      )}
        <SuccessModal
          successModalOpen={successModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          successMessage={successMessage}
        />
      </div>

      {open && (
        <MastersModal
          modalHeading="Create Diamond Type"
          btnName="Create"
          modalPage="Diamond"
          openModal={openModal}
          setOpen={setOpen}
          setTableData={setTableData}
          inputData={inputData}
          setInputData={setInputData}
          setSuccessModalOpen={setSuccessModalOpen}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {DeleteConfirmationOpen && (
        <DeleteConfirmationModal
          DeleteConfirmationOpen={DeleteConfirmationOpen}
          handleDeleteOpen={handleDeleteOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          deleteFunction={() => {
            deleteDiamondData(
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

export default DiamondType;
