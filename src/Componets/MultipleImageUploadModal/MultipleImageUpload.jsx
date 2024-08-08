import React, { useState, useEffect } from "react";
import "./MultipleImageUpload.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import closeButton from "../../assets/closeButton.svg";
import plusICon from "../../assets/plusIcon.png";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Select, Upload } from "antd";
import {
  product_category_basicDetails,
  tag_List_basicDetails,
} from "../Assignment Panel/Api";
import {
  upload_designs_items,
  upload_multiple_designs_items,
} from "../DESIGNER PANEL/Designer Dashboard/Api";
import SuccessModal from "../SuccessModal/SuccessModal";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  height: "80%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 0,
  overflowY: "auto",
  borderRadius: 2,
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MultipleImageUpload = ({
  onClose,
  open,
  previewImages,
  handleFileSelect,
  setUploadedDesigns,
  setMultipleImageModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  //   const [images, setImages] = useState(Array(initialImageSlots).fill(null));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [ProudctCategory, setListProductCategory] = useState([""]);
  const [selectedFechedTags, setSelectedFechedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileList, setFileList] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  console.log(fileList, "uploadedImage");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleclose = () => {
    onClose();
    setFileList([]);
  };

  useEffect(() => {
    // metal_type_dropdown_basicDetails(setMetalTypeDropDown);
    // diamond_type_dropdown_basicDetails(setDiamondType);
    tag_List_basicDetails(setSelectedTags);
    // findings_List_basicDetails(setFindingsList);
    product_category_basicDetails(setListProductCategory);
    // list_all_designers(setAllDesigners);
  }, []);

  useEffect(() => {
    if (selectedTags.length > 0) {
      const tags = selectedTags.map((tag) => ({ id: tag.id, name: tag.name }));
      setSelectedFechedTags(tags);
      console.log("Fetched tags set:", tags);
    }
  }, [selectedTags]);

  const handleUploadImages = () => {
    upload_multiple_designs_items(
      setIsLoading,
      fileList,
      setUploadedDesigns,
      setSuccessModalOpen,
      setSuccessMessage,
      handleclose
    );
  };

  return (
    <div>
      <div className="">
        <div className="modalContainer" style={{ position: "relative" }}>
          <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ position: "absolute", right: "0px" }}
            className="modal"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div
                  className="headerModal"
                  style={{ background: "#FAFAFA", padding: "3px 15px" }}
                >
                  <span
                    className="assignTitle"
                    style={{ background: "#FAFAFA" }}
                  >
                    Upload file
                  </span>
                  <button
                    onClick={handleclose}
                    style={{ background: "#FAFAFA", border: "none" }}
                  >
                    <img src={closeButton} alt="close" />
                  </button>
                </div>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mx: 2, my: 2 }}>
                {/* <div className="addButton_Container">
                  <div className="dashed_imageContainer">
                    {previewImages?.map((image, index) => (
                      <div key={index} className="dashedImage">
                        {image && (
                          <img
                            src={image.previewUrl}
                            alt=""
                            style={{ height: "64px", width: "64px" }}
                          />
                        )}
                        <div style={{ position: "absolute" }}>
                          <label>
                            <img src={plusICon} alt="add" />
                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              style={{ display: "none" }}
                              onChange={(e) => handleFileSelect(index, e)}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="modalContaer_multipleImageUpload">
                  <div style={{ marginLeft: "6px" }}>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      accept="image/jpeg, image/jpg, image/png"
                      multiple
                      beforeUpload={() => false}
                    >
                      {uploadButton}
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{
                          display: "none",
                        }}
                        preview={{ visible: false }}
                        src={previewImage}
                      />
                    )}

                    <div className="UploadFileSelectConteainer">
                      <div className="uploadProductCategory">
                        <label htmlFor="" className="label-text">
                          Product Category
                        </label>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          optionFilterProp="children"
                          // value={formData.typeOfMetal}
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              productCategory: [value],
                            }))
                          }
                          onSearch={onSearch}
                          filterOption={filterOption}
                          style={{
                            width: "100%",
                            zIndex: "9999999",
                            background: "#006E7F1A",
                            minHeight: "38px",
                          }}
                          options={ProudctCategory.map((tag) => ({
                            label: tag.name,
                            value: tag.id,
                          }))}
                        />
                        <div>
                          {errors.productCategory && (
                            <span className="error_input_p">
                              {errors.productCategory}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="uploadTagsCategory">
                        <label htmlFor="" className="label-text">
                          Tags
                        </label>

                        <Select
                          mode="multiple"
                          style={{
                            width: "100%",
                            zIndex: "9999999",
                            background: "#006E7F1A",
                          }}
                          placeholder="Select tags"
                          onChange={(value) => {
                            console.log("Tag changed to:", value);
                            setFormData((prevState) => ({
                              ...prevState,
                              tag: value,
                            }));
                          }}
                          options={selectedFechedTags.map((tag) => ({
                            label: tag.name,
                            value: tag.id,
                          }))}
                        />
                        <div>
                          {errors.tag && (
                            <span className="error_input_p">{errors.tag}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="multiImageUploadButtons">
                    <div className="multiImageConatainer">
                      <button
                        className="cancel_of_multiModal"
                        onClick={handleclose}
                      >
                        Cancel
                      </button>
                      {isLoading ? (
                           <button
                           className="upload_of_multiModal"
                          //  onClick={handleUploadImages}
                         >
                              <CircularProgress
                           size={20} // Set the desired size
                           sx={{
                             color: "#fff",
                             padding: "10px 20px",
                             width: "35px",
                           }}
                         />
                         </button>
                      ) : (
                        <button
                          className="upload_of_multiModal"
                          onClick={handleUploadImages}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <SuccessModal
        successModalOpen={successModalOpen}
        successMessage={successMessage}
      />
    </div>
  );
};

export default MultipleImageUpload;
