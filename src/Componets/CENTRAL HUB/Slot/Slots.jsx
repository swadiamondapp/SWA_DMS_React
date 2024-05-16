import React, { useState,useEffect } from "react";
import "./Slot.css";
import { IoEye } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SlotCreation from "../../SlotCreation/SlotCreation";
import SlotView from "../../SlotVIew/SlotView";
import { list_slot_central_hub } from "../../../Pages/CENTRAL HUB/Api";

const Slots = () => {
  const [showEditDelete, setShowEditDelete] = useState(null);
  const [isModalOpenslot, setIsModalOpenslot] = useState(false);
  const [isModalOpenslotview, setIsModalOpenslotview] = useState(false);

  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userlist = [
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
    {
      slino: "1",
      date: "12/12/2024 04:31 PM",
      slotid: "SWA245967",
    },
  ];

  useEffect(() => {
    list_slot_central_hub(setIsLoading, setData);
  }, []);
  console.log(Data,'center==============>')
  return (
    <div className="parentCentral">
      <div className="slot_create">
        <button onClick={() => setIsModalOpenslot(true)}>Create</button>
      </div>
      <div className="slote_labe">
        <h3>Slot list</h3>
      </div>
      {/* table */}
      <div className="Users_Table_List">
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ color: "#455173" }}>
              <th>SL NO</th>
              <th>Created on</th>
              <th>Slot ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr key={index} style={{ color: "#2E364C" }}>
                <td>{item.id}</td>
                <td>{item.created_at}</td>
                <td>{item.slotnumber}</td>
                <td>
                  <div className="parentSlotS">
                    <div className="EYEBTN">
                      <IoEye
                        onClick={() => setIsModalOpenslotview(true)}
                        style={{ color: "#455173", cursor: "pointer" }}
                      />
                    </div>
                    <div className="DOTSBTNS">
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
                          <p className="Delete_btn_user">Delete</p>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table */}
      <SlotCreation
        open={isModalOpenslot}
        onClose={() => setIsModalOpenslot(false)}
      />
      <SlotView
        open={isModalOpenslotview}
        onClose={() => setIsModalOpenslotview(false)}
      />
    </div>
  );
};

export default Slots;
