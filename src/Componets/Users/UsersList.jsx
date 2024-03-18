import React, { useState } from "react";
import "./Userlist.css";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import UserEm from "../../assets/userEmpty.png";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
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
  const userlist = [
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
    {
      date: "11/2/2023",
      name: "Mohammed sabeel",
      email: "sampletext@gmail.com",
      password: "1231231",
      designation: "Votors",
    },
  ];

  return (
    <div>
      <div className="Parent_userList">
        <div className="Create_user">
          <button onClick={showModal}>Create user</button>
        </div>

        {/* create modal */}
        <div className="create_modal_parent">
          <Modal
            title=""
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
                <div className="create_form_field">
                  <label htmlFor="">Name</label>
                  <input type="text" className="inputFeild" />
                </div>
                <div className="create_form_field">
                  <label htmlFor="">Phone number</label>
                  <input type="text" className="inputFeild" />
                </div>
                <div className="create_form_field">
                  <label htmlFor="">Email</label>
                  <input type="text" className="inputFeild" />
                </div>
                <div className="create_form_field">
                  <label htmlFor="">Role</label>
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: "jack",
                        label: "Designer",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
                
                <div className="create_user_btn">
                  <button className="create-user-button">Create User</button>
                </div>
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
              {userlist.map((item,index) => (
                <tr key={index} style={{ color: "#2E364C" }}>
                  <td>{item.date}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="view_password">
                      {item.password}
                      <IoEye style={{ color: "#455173" }} />
                    </div>
                  </td>
                  <td>{item.designation}</td>
                  <td>
                    <div className="active_sendmail">
                      <button className="active_btn">Active</button>
                      <button className="sendmail_btn">Send Mail</button>
                    </div>
                  </td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <BsThreeDotsVertical className="Action_dots" />
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
