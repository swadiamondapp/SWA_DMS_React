import React, { useState } from "react";
import "./Userlist.css";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Select } from "antd";

const UsersList = () => {
  // create modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          >
            <div className="Create_user_modal">
              <h3>Create user</h3>
              <div className="Create_form">
                <div className="create_form_field">
                  <label htmlFor="">Name</label>
                  <input type="text" />
                </div>
                <div className="create_form_field">
                  <label htmlFor="">Phone number</label>
                  <input type="text" />
                </div>
                <div className="create_form_field">
                  <label htmlFor="">Email</label>
                  <input type="text" />
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
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
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
                  <button>Create User</button>
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
              {userlist.map((item) => (
                <tr style={{ color: "#2E364C" }}>
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
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round"></span>
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
