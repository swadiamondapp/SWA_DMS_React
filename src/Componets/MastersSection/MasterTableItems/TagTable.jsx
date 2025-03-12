import React, { useEffect, useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import eye from "../../../assets/eye.png";
import MastersModal from "../MastersModal/MastersModal";
import {
  delete_tag_data,
  search_tag_data,
  tag_table_data,
} from "../ApiMasters/ApiMasters";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { CircularProgress } from "@mui/material";

const TagTable = () => {
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
    priority: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    tag_table_data(setTableData,setIsLoading);
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
    await search_tag_data(value, setTableData,setIsLoading);
  };

  useEffect(() => {
    search_tag_data(searchListId, setTableData, setIsLoading);
  }, [searchListId]);

  const handleEdit = (itemId) => {
    const selectedItem = tableData.find((item) => item.id === itemId);
    setOpen(true);
    setInputData(
      selectedItem || {
        name: "",
        priority: "",
        image: "",
      }
    );
  };

  console.log("selectedImage", selectedImage);



  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Tags</h3>

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
              <button onClick={openModal}>Create Tags</button>
            </div>
          </div>
        </div>

        { isLoading === true ? (
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
                <th>Name</th>
                <th className="wide-column">Priority</th>
                <th>Image</th>
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
                  <td>
                    <span className="bg_cover">{item.name}</span>
                  </td>
                  <td>{item.priority}</td>
                  <td>
                    <img
                      style={{ width: "60px", height: "60px",objectFit:"contain" }}
                      src={item.image}
                      alt=""
                      srcset=""
                    />
                  </td>
                  <td>
                    <div className="btn_td">
                      <button className="btn_section">
                        <img
                          className="btn_section_img"
                          src={eye}
                          alt=""
                          srcset=""
                        />
                      </button>
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

          {tableData.length === 0 &&  (
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
          modalHeading="Create Tag"
          btnName="Add Tag"
          modalPage="Tags"
          openModal={openModal}
          setOpen={setOpen}
          setTableData={setTableData}
          inputData={inputData}
          setInputData={setInputData}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          setSuccessModalOpen={setSuccessModalOpen}
          setSuccessMessage={setSuccessMessage}
          setIsLoading={setIsLoading}
        />
      )}

      {DeleteConfirmationOpen && (
        <DeleteConfirmationModal
          DeleteConfirmationOpen={DeleteConfirmationOpen}
          handleDeleteOpen={handleDeleteOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          deleteFunction={() => {
            delete_tag_data(
              setTableData,
              deleteId,
              setDeleteConfirmationOpen,
              setSuccessMessage,
              setSuccessModalOpen,
              setIsLoading
            );
          }}
        />
      )}
    </>
  );
};

export default TagTable;
