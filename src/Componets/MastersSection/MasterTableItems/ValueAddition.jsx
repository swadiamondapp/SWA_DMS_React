import React, { useState } from "react";
import dlticon from "../../../assets/Vector.png";
import editicon from "../../../assets/Edit.png";
import searchimg from "../../../assets/search.png";
import MastersModal from "../MastersModal/MastersModal";

const ValueAddition = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="masetrs_section">
        <div className="secton_header">
          <h3>Value Addition Master</h3>

          <div className="secton_search">
            <div className="Search_Admin">
              <div className="Search_User">
                <input type="text" placeholder="Search Users" />
                <img src={searchimg} alt="" />
              </div>
            </div>
            <div className="Create_user">
              <button onClick={openModal}>Create VA Master</button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th className="wide-column">Slab Number</th>
                <th>Min</th>
                <th>Max</th>
                <th>value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table_row">
                <td>1</td>
                <td>slab Name</td>
                <td>₹ 12000</td>
                <td>₹ 12000</td>
                <td>₹ 12000</td>
                <td>
                  <div className="btn_td">
                    <button className="btn_section">
                      <img
                        className="btn_section_img"
                        src={editicon}
                        alt=""
                        srcset=""
                      />
                    </button>
                    <button className="btn_section2">
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
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <MastersModal
          modalHeading="Create Value Addition Master"
          btnName="Create"
          openModal={openModal}
          setOpen={setOpen}
          modalPage="ValueAddition"
        />
      )}
    </>
  );
};

export default ValueAddition;
