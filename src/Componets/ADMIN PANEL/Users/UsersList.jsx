import React, { useState, useEffect, useRef } from "react";
import "./Userlist.css";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import UserEm from "../../../assets/userEmpty.png";
import Joi from "joi";
import {
  list_all_users,
  update_user,
  user_create,
  user_delete,
  send_mail,
  user_activating,
} from "./Api";
import UlaodImag from "../../../assets/upi.png";
import SuccessModal from "../../SuccessModal/SuccessModal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DeleteConfirmationModal from "../../ConfirmationModal/DeleteConfirmationModal";

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `cannot be an empty feild`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Email cannot be an empty field",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is a required field",
    }),
  phoneNumber: Joi.string()
    .pattern(/^\d+$/)
    .min(10)
    .max(10)
    .required()
    .messages({
      "string.empty": `cannot be an empty field`,
      "string.pattern.base": `must only contain digits`,
      "string.min": `must be 10 digits`,
      "string.max": `must be 10 digits`,
    }),
  selectedRole: Joi.number().required().messages({
    "any.required": "You should select a role",
    "number.base": "You should select a role", // Additional message for non-number values
  }),
});

const validateForm = (data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (!error) {
    return {};
  }

  const errors = {};
  error.details.forEach((err) => {
    errors[err.context.key] = err.message;
  });
  return errors;
};

const UsersList = () => {
  // create modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [errors, setErrors] = useState({});
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteuser, setDeleteuser] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [ErrorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingStates, setLoadingStates] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const [DeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedRole: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click occurred outside the dropdown, so close it
        setShowEditDelete(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("imageUrl===>", userList);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error message for this input field
    }));
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file change for image upload
  // const handleFileChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       setImageUrl(e.target.result); // Set the base64 URL to `imageUrl`
  //       console.log("Image URLSET", e.target.result); // Debug statement
  //     };
  //     fileReader.readAsDataURL(info.file.originFileObj); // Convert file to base64
  //   }
  // };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       setImageUrl(e.target.result); // Set the base64 URL to `imageUrl`
  //     };
  //     fileReader.readAsDataURL(file); // Convert file to base64
  //   }
  // };
  console.log(ErrorMessages, "errrormesfg");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the selected file is an image
      if (file.type.startsWith("image")) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          setImageUrl(e.target.result); // Set the base64 URL to `imageUrl`
        };
        fileReader.readAsDataURL(file); // Convert file to base64
      } else {
        // Handle non-image files (e.g., display an error message)
        console.error("Please select an image file (JPG or PNG).");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const data = new FormData();
      // Append form data fields
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone_code", "+91");
      data.append("phone_number", formData.phoneNumber);
      data.append("usertype", formData.selectedRole);
      data.append("status", "ACTIVE");
      // If there's an uploaded image, append it to the FormData
      // Append image if it exists
      const fileInput = document.querySelector(".avatar-uploader");
      const file = fileInput ? fileInput.files[0] : null;

      if (file) {
        data.append("image", file);
      }
      console.log(file, "file");

      if (userIdToEdit) {
        update_user(
          setIsLoading,
          data,
          setUserList,
          userIdToEdit,
          setIsModalOpen,
          setSuccessModalOpen,
          setSuccessMessage
        );
      } else {
        await user_create(
          setIsLoading,
          data,
          setUserList,
          setIsModalOpen,
          setSuccessModalOpen,
          setSuccessMessage,
          setErrorMessages,
          setFormData
        );
      }

      // setIsModalOpen(false);

      // Reset form data after successful submission

      // Form is valid, proceed with submission

      console.log("Form submitted:", formData);
    } else {
      // Form is invalid, display errors
      setErrors(validationErrors);
    }
  };
  console.log(ErrorMessages, "errorrrssd");

  // const validateForm = (data) => {
  //   const errors = {};
  //   if (!data.name.trim()) {
  //     errors.name = "Name is required";
  //   }
  //   if (!data.email.trim()) {
  //     errors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(data.email)) {
  //     errors.email = "Email is invalid";
  //   }
  //   if (!data.phoneNumber.trim()) {
  //     errors.phoneNumber = "Phone number is required";
  //   } else if (!/^\d{10}$/.test(data.phoneNumber)) {
  //     errors.phoneNumber = "Phone number must be 10 digits";
  //   }

  //   return errors;
  // };
  const [showEditDelete, setShowEditDelete] = useState(null);

  const [modalTitle, setModalTitle] = useState("Create user");
  const [submitBtn, setSubmitBtn] = useState("Create user");
  const [deleteId, setDeleteId] = useState([]);
  const [toggleStates, setToggleStates] = useState({});
  const [userIdToEdit, setUserIdToEdit] = useState(null);

  console.log("userIdToEdit", userIdToEdit);

  const showModal = () => {
    setIsModalOpen(true);
    setModalTitle("Create user");
    setSubmitBtn("Create user");
    setImageUrl(null);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      selectedRole: "",
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrorMessages(null);
  };
  // create modal
  // select box
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div
        style={{
          marginTop: 4,
        }}
      >
        <img src={UserEm} style={{ maxWidth: "80px" }} />
      </div>
    </button>
  );

  // select box

  useEffect(() => {
    list_all_users(setIsLoading, setUserList);
  }, []);

  const handleDelete = (userId) => {
    setDeleteConfirmationOpen(true);
    console.log("item.id", userId);
    setDeleteId(userId);
    setShowEditDelete(null);
  };

  const hendleEdit = (user) => {
    console.log("usereditid", user);
    if (user) {
      setIsModalOpen(true);
      setShowEditDelete(null);
      setErrors({});

      setModalTitle("Edit User");
      setSubmitBtn("Update User");
      setFormData({
        name: user.name,
        email: user.email,
        phoneNumber: user.phone_number,
        selectedRole: parseInt(user.usertype),
      });
      console.log("mm????", user.usertype);
      setImageUrl(user.image);
    }
    setUserIdToEdit(user.id);
  };
  const handleAvatarClick = () => {
    // Trigger click event of file input when avatar is clicked
    document.getElementById("fileInput").click();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleSendMail = (usersId) => {
    send_mail(setLoadingStates, usersId, setSuccessModalOpen);
  };
  const handleOpen = () => {
    setSuccessModalOpen(true);
  };
  const handleDeleteOpen = () => {
    setDeleteConfirmationOpen(true);
  };
  const handleClose = () => {
    setSuccessModalOpen(false);
  };
  const handleDeleteClose = () => {
    setDeleteConfirmationOpen(false);
  };
  const handleTogglePassword = (userId) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const toggleStatus = (user) => {
    const newStatus = user.status === "ACTIVE" ? "IN-ACTIVE" : "ACTIVE";
    const statusPayload = newStatus === "ACTIVE" ? "true" : "false";
    setUserList((prevState) =>
      prevState.map((item) =>
        item.id === user.id ? { ...item, status: newStatus } : item
      )
    );
    user_activating(setIsLoading, user.id, statusPayload, setUserList);
  };

  console.log(toggleStates, "toggleState");

  // update_user(setIsLoading, data, setUserList ,"70");
  return (
    <div>
      <div className="Parent_userList">
        <div className="Create_user">
          <button onClick={showModal}>Create user</button>
        </div>

        {/* create modal */}
        <div className="create_modal_parent">
          <Modal
            open={isModalOpen}
            // onOk={handleOk}
            onCancel={handleCancel}
            centered
            width={380}
          >
            <div className="Create_user_modal">
              <div className="title-Createuser">
                <h3>{modalTitle}</h3>
              </div>
              <div className="dragAndDrop">
                <div>
                  <div>
                    {/* <Upload
                      name="avatar"
                      listType="picture-circle"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={() => false} // Prevent auto-upload, we handle it manually
                      onChange={handleFileChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{
                            width: "100%",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload> */}
                    <div>
                      <input
                        id="fileInput"
                        type="file"
                        className="avatar-uploader"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <div
                        id="avatar_upload_icon"
                        onClick={handleAvatarClick}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                          width: imageUrl ? "80px" : "auto",
                          height: imageUrl ? "80px" : "auto",
                        }}
                      >
                        {imageUrl ? (
                          <div className="uploaded_image_container">
                            <img
                              src={imageUrl}
                              alt="avatar"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%", // Make the image circular
                                objectFit: "cover", // Ensure the image covers the entire space
                              }}
                            />
                          </div>
                        ) : (
                          <img src={UlaodImag} alt="upload icon" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="uploadFile">
                  Drag & Drop or{" "}
                  <span
                    style={{ color: "#0464D5" }}
                    onClick={handleAvatarClick}
                  >
                    choose file{" "}
                  </span>
                  to upload file
                  <br />
                  jpg, png
                </span>
              </div>
              <div className="Create_form">
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="create_form_field">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      className="inputFeild"
                      name="name"
                      value={formData.name}
                      onChange={handleInput}
                    />
                    {errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
                  </div>
                  <div className="create_form_field">
                    <label htmlFor="">Phone number</label>
                    <input
                      type="number"
                      className="inputFeild"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInput}
                    />
                    {ErrorMessages?.reason?.phone_number && (
                      <span className="error">
                        {ErrorMessages?.reason?.phone_number}
                      </span>
                    )}
                    {errors.phoneNumber && (
                      <span className="error">{errors.phoneNumber}</span>
                    )}
                  </div>
                  <div className="create_form_field">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="inputFeild"
                      name="email"
                      value={formData.email}
                      onChange={handleInput}
                    />
                    {ErrorMessages?.reason?.email && (
                      <span className="error">
                        {ErrorMessages?.reason?.email}
                      </span>
                    )}
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="parant_relative">
                    <label htmlFor="">Role</label>
                    <Select
                      showSearch
                      value={formData.selectedRole}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={(value) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          selectedRole: value,
                        }))
                      }
                      onSearch={onSearch}
                      filterOption={filterOption}
                      style={{ width: "100%" }}
                      options={[
                        {
                          value: 2,
                          label: "Designer",
                        },
                        {
                          value: 3,
                          label: "Cad",
                        },
                        {
                          value: 4,
                          label: "Voters",
                        },
                        {
                          value: 5,
                          label: "Renders",
                        },
                        {
                          value: 6,
                          label: "Warehouse",
                        },
                        {
                          value: 7,
                          label: "Central Hub",
                        },
                      ]}
                    />
                    {errors.selectedRole && (
                      <span className="error_selected_input">
                        {errors.selectedRole}
                      </span>
                    )}
                  </div>

                  <div className="create_user_btn">
                    <button className="create-user-button" type="submit">
                      {submitBtn}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
        {/* create modal */}
        <div className="Users_Table_List">
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ color: "#455173" }}>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Desigination</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((item, index) => (
                <tr key={index} style={{ color: "#2E364C" }}>
                  <td>{formatDate(item.created_at)}</td>
                  {console.log(item.created_at, "createdTime")}
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="view_password">
                      {showPassword[item.id] ? (
                        <span className="passwordEncy">{item.Password}</span>
                      ) : (
                        <span className="passwordEncy_star">*************</span>
                      )}
                      {showPassword ? (
                        <IoEye
                          style={{
                            color: "#455173",
                            cursor: "pointer",
                            opacity: showPassword ? 0.5 : 1,
                            marginRight: "25px",
                          }}
                          onClick={() => handleTogglePassword(item.id)}
                        />
                      ) : (
                        <IoEye
                          style={{ color: "#455173", cursor: "pointer" }}
                          onClick={() => handleTogglePassword(item.id)}
                        />
                      )}
                    </div>
                  </td>
                  <td>{item.Usertype}</td>
                  <td>
                    <div className="active_sendmail">
                      <button
                        className={
                          item.status === "ACTIVE"
                            ? "active_btn"
                            : "inactive_btn"
                        }
                      >
                        {item.status === "ACTIVE" ? "Active" : "Inactive"}
                      </button>
                      <button
                        className="sendmail_btn"
                        onClick={() => handleSendMail(item.id)}
                      >
                        {loadingStates[item.id] ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress
                              size={16} // Set the desired size
                              sx={{ color: "#fff" }}
                            />
                          </Box>
                        ) : (
                          <>Send Mail</>
                        )}
                      </button>
                    </div>
                  </td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.status === "ACTIVE"}
                        onChange={() => toggleStatus(item)}
                      />
                      <span
                        className={`slider round ${
                          item.status === "ACTIVE" ? "active" : "inactive"
                        }`}
                      ></span>
                    </label>
                  </td>
                  <td style={{ position: "relative" }}>
                    <BsThreeDotsVertical
                      className="Action_dots"
                      onClick={() =>
                        setShowEditDelete(
                          showEditDelete === index ? null : index
                        )
                      }
                    />
                    {showEditDelete === index && (
                      <div ref={dropdownRef} className="Edit_delete_btn_user">
                        <p
                          className="Edit_btn_user"
                          onClick={() => hendleEdit(item)}
                        >
                          Edit
                        </p>
                        <p
                          className="Delete_btn_user"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </p>
                      </div>
                    )}
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
        <DeleteConfirmationModal
          DeleteConfirmationOpen={DeleteConfirmationOpen}
          handleDeleteClose={handleDeleteClose}
          handleDeleteOpen={handleDeleteOpen}
          setDeleteConfirmationOpen={setDeleteConfirmationOpen}
          successMessage={successDeleteMessage}
          deleteFunction={() => {
            user_delete(
              setIsLoading,
              setUserList,
              deleteId,
              setDeleteConfirmationOpen,
              setSuccessMessage,
              setSuccessModalOpen
            );
          }}
        />
      </div>
    </div>
  );
};

export default UsersList;
