import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  ASSIGNED_DATA_BY_ID,
  FINISHED_PROJECT_CAD,
  LIST_ASSIGNED_CAD_DESIGN,
  TRANSFER_CAD,
  UPLOAD_CAD_DESIGN,
  CAD_DESIGNS,
  STATUS_CHANGE,
  CAD_UPLOAD,
  FINISHED_FOLDERS,
  FOLDER_DETAILS,
  CAD_RE_UPLOAD,
  BASIC_DETAILS,
  CAD_LOGOUT,
} from "../../Pages/Services/EndPoints";
import axios from "axios";

export const list_assigned_cad_design = async (
  setIsLoading,
  setAssignedCadDesign
) => {
  try {
    const response = await apiService.get(LIST_ASSIGNED_CAD_DESIGN);
    if (checkApiStatus(response)) {
      setAssignedCadDesign(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const upload_cad_design = async (
  setIsLoading,
  designCode,
  imageFile,
  threeDFile,
  onClose,
  setSuccessModalOpen,
  setSuccessMessage,
  handleSuccessUpload
) => {
  try {
    setIsLoading(true);
    const body = {
      designcode: designCode,
      file1: imageFile,
      file2: threeDFile,
    };

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Set the appropriate content type for your request
        // Add any other headers you need
      },
    };
    console.log(body, "uploadCad");
    const response = await apiService.post(UPLOAD_CAD_DESIGN, body, config);
    if (response.data.results.status_code === 201) {
      // list_assignment_folder(setIsLoading, setAssignmentFolder);
      handleSuccessUpload();
      setSuccessModalOpen(true);
      setSuccessMessage("File Uploaded Successfully");
      onClose();
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoading(false);
  }
};

export const assigned_data_by_id = async (
  setIsLoading,
  setFolderDetailsById,
  paramId
) => {
  try {
    const response = await apiService.get(`${ASSIGNED_DATA_BY_ID}/${paramId}/`);
    if (checkApiStatus(response)) {
      setFolderDetailsById(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const transfer_work = async (
  status,
  itemId,
  setTransferModalOpen,
  setSuccessMessage,
  setSuccessModalOpen,
  paramId,
  setFolderDetailsById,
  setIsLoading
) => {
  try {
    const body = {
      work_status: status,
    };
    console.log(status, "statusss");
    const response = await apiService.patch(`${TRANSFER_CAD}/${itemId}/`, body);
    if (checkApiStatus(response)) {
      setTransferModalOpen(false);
      setSuccessMessage("Transfered Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
      assigned_data_by_id(setIsLoading, setFolderDetailsById, paramId);
    }
  } catch (error) {
    console.log(error);
  }
};

export const finished_product_list_cad = async (
  setIsLoading,
  setFinishedProduct
) => {
  try {
    const response = await apiService.get(FINISHED_PROJECT_CAD);
    if (checkApiStatus(response)) {
      setFinishedProduct(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDesignList = async (setIsLoading, setData) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(CAD_DESIGNS);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const designListStatusChange = async (
  setIsLoading,
  id,
  callBack,
  status,
  timer
) => {
  try {
    const body = timer
      ? {
          timer_status: status,
          timer_value: timer,
        }
      : {
          timer_status: status,
        };
    setIsLoading(true);
    const response = await apiService.patch(`${STATUS_CHANGE}${id}`, body);
    if (checkApiStatus(response)) {
      callBack();
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const uploadFile = async (
  setIsLoading,
  body,
  setImages,
  setSuccessModalOpen,
  setSuccessMessage,
  setIsModalOpen,
  setProductCode,
  callBack
) => {
  try {
    setIsLoading(true);
    console.log("cadddddddd", body);
    const response = await apiService.post(CAD_UPLOAD, body);
    if (checkApiStatus(response)) {
      setImages({ normal: null, threeD: null });
      setIsModalOpen(false);
      setProductCode("");
      setSuccessMessage("Successfully uploaded");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
      callBack();
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const finishedProjectFolder = async (setIsLoading, setData) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(FINISHED_FOLDERS);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const projectDetails = async (setIsLoading, setData, id, setItemId) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(`${FOLDER_DETAILS}${id}`);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
      setItemId(response.data.results.data[0].id);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const getBasicDetails = async (setIsLoading, setData, id) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(`${BASIC_DETAILS}${id}`);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const reUploadFile = async (
  setIsLoading,
  body,
  setImages,
  setSuccessModalOpen,
  setSuccessMessage,
  setIsModalOpen,
  setProductCode,
  id,
  setItemId,
  setData,
  callBack
) => {
  try {
    setIsLoading(true);
    const response = await apiService.put(`${CAD_RE_UPLOAD}${id}`, body);
    if (checkApiStatus(response)) {
      setIsModalOpen(false);
      setProductCode("");
      setSuccessMessage("Successfully uploaded");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
      callBack();
      setImages({ 
        normal: null, 
        threeD: null });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};


// export const cadLogut = async (timerValue) => {
//   const body  ={
//     timer_value : timerValue
//   }
//   try {
//     const response = await apiService.post(CAD_LOGOUT,body);
//     if (checkApiStatus(response)) {
//       // setData(response.data.results.data);
//     }
//   } catch (error) {
//     console.log(error);
//   } 
// };

export const cadLogut = (timerValue) => {
  const userType = localStorage.getItem("Usertype")
 
  if (userType === "CAD"){
    var cadToken = localStorage.getItem("token")
}
  const token = cadToken
  console.log(token,"token")
  axios
    .post(
      "https://dmstestapi.zinfog.in/dms/logout/",
      { timer_value: timerValue }, // Add any data to be sent in the POST request if needed
      {
        headers: {
          Authorization: `token ${token}`, // Add the token in the Authorization header
          "Content-Type": "application/json", // Set the Content-Type header
        },
      }
    )
    .then((res) => {
      // setUserList(res.data.data);
      // setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching user list:", error);
      // setLoading(false);
    });
};