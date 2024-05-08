import React, { useState, useEffect } from "react";
import "./Userlist.css";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import UserEm from "../../../assets/userEmpty.png";
import Joi from "joi";
import { list_all_users, user_create, user_delete } from "./Api";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `cannot be an empty feild`,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `cannot be an empty feild`,
    }),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": `cannot be an empty feild`,
    }),
  selectedRole: Joi.string().required().messages({
    "string.empty": `cannot be an empty feild`,
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
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UsersList = () => {
  // create modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [errors, setErrors] = useState({});
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteuser, setDeleteuser] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    selectedRole: "",
  });

  console.log("userList", userList);

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
      if (imageUrl) {
        const file = document.querySelector(
          '.avatar-uploader input[type="file"]'
        ).files[0];
        if (file) {
          data.append("image", file);
        }
      }
      await user_create(setIsLoading, data, setUserList);
      setIsModalOpen(false);
      // Reset form data after successful submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        selectedRole: "",
      });
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
    } else {
      // Form is invalid, display errors
      setErrors(validationErrors);
    }
  };

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
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
    console.log("item.id", userId);
    user_delete(setIsLoading, setUserList, userId);
  };

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
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            width={380}
          >
            <div className="Create_user_modal">
              <div className="title-Createuser">
                <h3>Create user</h3>
              </div>
              <div className="dragAndDrop">
                <div>
                  <div>
                    <Upload
                      name="avatar"
                      listType="picture-circle"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
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
                    </Upload>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="uploadFile">
                  Drag & Drop or{" "}
                  <span style={{ color: "#0464D5" }}>choose file </span>to
                  upload file
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
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="parant_relative">
                    <label htmlFor="">Role</label>
                    <Select
                      showSearch
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
                          value: "2",
                          label: "DESIGNER",
                        },
                        {
                          value: "3",
                          label: "CAD",
                        },
                        {
                          value: "4",
                          label: "VOTERS",
                        },
                        {
                          value: "5",
                          label: "RENDERS",
                        },
                        {
                          value: "6",
                          label: "WAREHOUSE",
                        },
                        {
                          value: "7",
                          label: "CENTRAL HUB",
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
                      Create User
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
                  <td>{item.created_at}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="view_password">
                      123123123
                      <IoEye style={{ color: "#455173" }} />
                    </div>
                  </td>
                  <td>{item.Usertype}</td>
                  <td>
                    <div className="active_sendmail">
                      <button className="active_btn">{item.status}</button>
                      <button className="sendmail_btn">Send Mail</button>
                    </div>
                  </td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
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
                      <div className="Edit_delete_btn_user">
                        <p className="Edit_btn_user">Edit</p>
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
      </div>
    </div>
  );
};

export default UsersList;
