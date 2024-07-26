import React, { useEffect, useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import MastersModal from "../MastersModal/MastersModal";
import { categoryTableData, deleteCategoryData, searchCategoryItems } from "../ApiMasters/ApiMasters";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../../SuccessModal/SuccessModal";

const ProductCategory = () => {
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
    categoryTableData(setTableData);
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
   await searchCategoryItems(value, setTableData);
  };

  useEffect(() => {
    searchCategoryItems(searchListId, setTableData, setErrors);
  }, [searchListId]);

  // const handleEdit = (itemId) => {
  //   const selectedItem = tableData.find((item) => item.id === itemId);
  //   setOpen(true);
  //   setInputData(
  //     selectedItem || {
  //       name: ""
  //     }
  //   );
  // };

  console.log("table data", tableData);

  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Product Category</h3>

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
              <button onClick={openModal}>Create Category</button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="table_borderleft">
            <thead>
              <tr>
                <th>Sl No</th>
                <th className="wide-column">Category name</th>
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
                <td>
                  <div className="btn_td">
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
          modalHeading="Create Product category"
          btnName="Create"
          modalPage="productCategory"
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
            deleteCategoryData(
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

export default ProductCategory;
