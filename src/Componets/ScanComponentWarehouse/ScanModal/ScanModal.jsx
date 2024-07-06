import React from 'react'
import './ScanModal.css'
import { Box, Modal, Typography } from "@mui/material";
import printer from '../../../assets/printer.png'
import close from '../../../assets/close2.png'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    fontFamily: "Gilroy medium",
    boxShadow: 24,
  };

const ScanModal = ({setOpenModal}) => {

    const handleModalClose = () => {
        setOpenModal(false);
      };
    
  return (
<>
    <Modal
  open={open}
  onClose={handleModalClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"

>
  <Box sx={style} className="MastersModal">
    <div className="modal_container">
  
          <button onClick={handleModalClose} className='close_btn'><img  src={close} alt="" srcset="" /><span>CLOSE</span></button> 
  <div className="master_modal scan_head" >
            <h3>Slot List</h3>
            <button className='scan_list'> <img src={printer} alt="" srcset="" /><span> Print</span></button>
          </div>
      <div className="scan_table">
      <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Created date</th>
                <th >Product Category</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SWA34R56</td>
                <td>12-02-23</td>
                <td>Bangles</td>
                <td>16 Gram</td>
              </tr>
                <tr>
                    <td>SWA34R56</td>
                    <td>12-02-23</td>
                    <td>Bangles</td>
                    <td>16 Gram</td>
                </tr>
            </tbody>
          </table>
      </div>
      </div>

  </Box>
</Modal>
</>
  )
}

export default ScanModal
