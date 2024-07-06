import React, { useState } from "react";
import "./WorkdoneEditModal.css";
import close from "../../../assets/close.png";

const WorkdoneEditModal = ({setOpenLeftbar}) => {

    const [formData,setFormData] =useState([])

    const handleClose =()=>{
        setOpenLeftbar(false)
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }

      console.log("formdata",formData)

  return (
    <>
      <div className="edit_opcity"></div>
      <div className="leftbar">
        <div className="Basic_detail">
          <>
            <div className="master_modal">
              <h3>Basic Detail</h3>
            </div>

            <div className="workdone_modal" style={{ marginTop: "15px" }}>
              <span>Product ID</span>
              <span>SWA12356</span>
            </div>
            <div className="workdone_modal">
              <span>Length</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>Width</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>Height</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>Type of metal</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>Dimond Type</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>APPROX DIAMOND WEIGHT</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>Findings</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>Approx weight</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal">
              <span>Tags</span>
              <span>20 mm</span>
            </div>
            <div className="workdone_modal" style={{ borderBottom: "none" }}>
              <span>Note</span>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates expedita voluptatem a provident, ab magni unde
                repellendus rem autem minus veritatis perspiciatis
                necessitatibus vel qui repudiandae nihil animi. Dignissimos,
                nemo?
              </p>
            </div>
          </>
        </div>


        <div className="Edit_detail">
        <div className="edit_height">
          <div className="master_modal ">
            <h3>Actual details</h3>
            <button onClick={handleClose} style={{backgroundColor:"#F5F5F5"}}>
              <img className="btn_close" src={close} alt="" srcset="" />
            </button>
          </div>

          <div className="workdone_modal" style={{marginTop:"15px"}}>
            <span>Product ID</span>
            <input type="text" name="" />
          </div>
          <div className="workdone_modal">
            <span>Length</span>
            <input type="text" onChange={handleInput} name="length" />
          </div>
          <div className="workdone_modal">
            <span>Width</span>
            <input type="text" onChange={handleInput} name="width" />
          </div>
          <div className="workdone_modal">
            <span>Height</span>
            <input type="text" onChange={handleInput} name="height" />
          </div>
          <div className="workdone_modal">
            <span>Type of metal</span>
            <input type="text" onChange={handleInput} name="metalType" />
          </div>
          <div className="workdone_modal">
            <span>Dimond Type</span>
            <input type="text" onChange={handleInput} name="diamondType" />
          </div>
          <div className="workdone_modal">
            <span>APPROX DIAMOND WEIGHT</span>
            <input type="text" onChange={handleInput} name="diamondWeight" />
          </div>
          <div className="workdone_modal">
            <span>Findings</span>
            <input type="text" onChange={handleInput} name="findings" />
          </div>
          <div className="workdone_modal">
            <span>Approx weight</span>
            <input type="text" onChange={handleInput} name="approxweight" />
          </div>
          <div className="workdone_modal">
            <span>Tags</span>
            <input type="text"  />
          </div>
          <div className="workdone_modal" style={{borderBottom:"none"}}>
            <span>Note</span>
           <textarea name="note" onChange={handleInput}/>
          </div>
          </div>
<div className="update_btn">
          <button >Update</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkdoneEditModal;
