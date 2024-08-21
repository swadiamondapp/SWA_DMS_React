import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import {
  ALL_DESIGNS,
  MOVE_TO_ASSIGNMENT,
  UNVOTED_DESIGN,
  LIST_ASSIGNMENT_FOLDER,
  DESIGNPOOL_SEARCHBY_ID,
  UPDATE_DESIGNPOOL_IMAGE,
  DELETE_ITEM_FROM_DESIGNPOOL,
  DELETE_TRASFER_DATA,
} from "../../../Pages/Services/EndPoints";
import { centralTransfer } from "../../../Pages/CENTRAL HUB/Api";

export const all_Designs = async (setIsLoading, setData) => {
  try {
    setIsLoading(true)
    const response = await apiService.get(`${ALL_DESIGNS}?not_assigned=true`);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }finally{
    setIsLoading(false)
  }
};

export const designPoolSearchById = async (searchListId, setData) => {
  try {
    if (!searchListId) {
      const response = await apiService.get(
        `${ALL_DESIGNS}/?not_assigned=true`
      );
      if (checkApiStatus(response)) {
        setData(response.data.results.data);
      }
    } else {
      const response = await apiService.get(
        `${DESIGNPOOL_SEARCHBY_ID}${searchListId}`
      );
      if (checkApiStatus(response)) {
        setData(response?.data?.results?.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// export const designPoolSearchById = async (
//   searchListId,
//   setData,
//   setErrors
// ) => {
//   try {
//     let response;

//     if (searchListId !== "") {
//       response = await apiService.get(
//         `${DESIGNPOOL_SEARCHBY_ID}${searchListId}`
//       );
//     } else {
//       response = await apiService.get(`${ALL_DESIGNS}/?not_assigned=true`); // Replace with your endpoint to fetch all designs
//     }

//     if (checkApiStatus(response)) {
//       setData(response.data.results.data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const unvoted_design = async (setIsLoading, setUnvotedData) => {
  try {
    const response = await apiService.get(UNVOTED_DESIGN);
    if (checkApiStatus(response)) {
      setUnvotedData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const moveSelectedDesign = async (setIsLoading, selectedDesigns) => {
  try {
    const body = {
      design_codes: selectedDesigns,
    };
    const response = await apiService.post(MOVE_TO_ASSIGNMENT, body);
    const res = response.data.results.status_code === 200;
    if (response.data.results.status_code === 200) {
      console.log(response.data.results.message, "success");
    }
    return res;
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const list_assignment_folder = async (
  setIsLoading,
  setAssignmentFolder
) => {
  try {
    const response = await apiService.get(LIST_ASSIGNMENT_FOLDER);
    if (checkApiStatus(response)) {
      setAssignmentFolder(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const editedImageUpload = async (
  setIsLoading,
  editedImage,
  selectImageId,
  setSuccessModalOpen,
  setSuccessMessage,
  setanotationModal,
  setData,
  formData
) => {
  try {
    const response = await apiService.patch(
      `${UPDATE_DESIGNPOOL_IMAGE}${selectImageId}`,
      formData
      // {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }
    );
    if (checkApiStatus(response)) {
      all_Designs(setIsLoading, setData);
      setanotationModal(false);
      setSuccessModalOpen(true);
      setSuccessMessage("Image updated successfully");
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1000);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const deleteItemFromDesignPool = async (
  setIsLoading,
  SelectedIdsForDelet,
  setSuccessModalOpen,
  setSuccessMessage,
  setDeleteConfirmationOpen,
  setData,
  setSelectedDesigns,
  setShowRadioButtons,
  setSelectButtonLabel,
  setSelectedIdsForDelet,
  setUnvotedData
) => {
  
  try {
    const body = {
      design_id: SelectedIdsForDelet
    }

    setIsLoading(true);
    console.log(body,"bodyofDelteeee")
    const response = await apiService.patch(DELETE_ITEM_FROM_DESIGNPOOL,body);
    if (checkApiStatus(response)) {
      setSuccessMessage("item Deleted Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
        setDeleteConfirmationOpen(false);
      }, 1600);
      all_Designs(setIsLoading, setData);
      unvoted_design(setIsLoading,setUnvotedData)
      // setActiveCardId([]);
      setSelectedDesigns([])
      setShowRadioButtons(false)
      setSelectButtonLabel("Select")
      setSelectedIdsForDelet([])
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoading(false);
  }
};
