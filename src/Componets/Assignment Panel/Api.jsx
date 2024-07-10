import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  ASSIGNMENT_MOVE,
  ASSIGN_UNASSIGN_DESIGNERS,
  CALCULATION,
  DIAMOND_TYPE_DROPDOWN,
  EDIT_BASIC_DETAILS,
  FINDINGS_LIST,
  FOLDER_DETAIL_API,
  LIST_ALL_DESIGNERS,
  LIST_ASSIGNMENT_PANEL,
  METAL_TYPE,
  MOVE_TO_FOLDER,
  PRODUCT_CATEGORY_LIST,
  TAG_LIST,
  UPLOAD_ADMIN_IMAGE_ASSIGNMENT,
} from "../../Pages/Services/EndPoints";
import {
  all_Designs,
  list_assignment_folder,
} from "../ADMIN PANEL/Design Pool/Api";

export const list_assignment_panel = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_ASSIGNMENT_PANEL);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const list_folderDetails = async (
  setIsLoading,
  setFolderDetails,
  selectedId
) => {
  try {
    const response = await apiService.get(
      `${FOLDER_DETAIL_API}/${selectedId}/`
    );
    if (response.data.results.status_code === 200) {
      setFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export const listFolderDetailVeiwAssignmentPanel = async (
  setIsLoading,
  setFolderDetailsView,
  id,
  designId
) => {
  try {
    const response = await apiService.get(
      `${FOLDER_DETAIL_API}${id}/item/${designId}/`
    );
    if (checkApiStatus(response)) {
      setFolderDetailsView(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const move_to_folder = async (
  setIsLoading,
  folderName,
  setAssignmentFolder,
  onClose,
  setSuccessMessage,
  setSuccessModalOpen,
  setSelectedAssignment,
  ItemMovedToAssignment,
  handleClose,
  setFolderName,
  setItemMovedToAssignment,
  selectedAssignment,
  setError
) => {
  debugger
  try {
    const body = {
      folder_data: {
        name: folderName,
      },
      items: selectedAssignment,
    };
    console.log(body, "itemMovirddd");

    const response = await apiService.post(MOVE_TO_FOLDER, body);
    if (response.data.results.status_code === 200) {
      list_assignment_folder(setIsLoading, setAssignmentFolder,setData);
      onClose();
      setError("")
      setSuccessMessage("Assignment Folder Created SuccessFully");
      setSuccessModalOpen(true);
      ToCloseCreatefolder(false)
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      setItemMovedToAssignment([]);
      setFolderName("");
      setSelectedAssignment([]);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const metal_type_dropdown_basicDetails = async (
  setMetalTypeDropDown
) => {
  try {
    const response = await apiService.get(METAL_TYPE);
    if (checkApiStatus(response)) {
      setMetalTypeDropDown(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export const diamond_type_dropdown_basicDetails = async (setDiamondType) => {
  try {
    const response = await apiService.get(DIAMOND_TYPE_DROPDOWN);
    if (checkApiStatus(response)) {
      setDiamondType(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const tag_List_basicDetails = async (setSelected) => {
  try {
    const response = await apiService.get(TAG_LIST);
    if (checkApiStatus(response)) {
      setSelected(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const findings_List_basicDetails = async (setFindingsList) => {
  try {
    const response = await apiService.get(FINDINGS_LIST);
    if (checkApiStatus(response)) {
      setFindingsList(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const product_category_basicDetails = async (setListProductCategory) => {
  try {
    const response = await apiService.get(PRODUCT_CATEGORY_LIST);
    if (checkApiStatus(response)) {
      setListProductCategory(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const move_to_assignment = async (
  formData,
  onClose,
  setSuccessModalOpen,
  setSuccessMessage,
  setIsLoading,
  setSelectedDesigns,
  setData,
  setShowRadioButtons,
  setSelectButtonLabel,
  // setShowAssignmentModal,
  setMovedItemsId,
  setFormData,
  getSelectedDesign
) => {
  console.log(getSelectedDesign, "move_TO_ASSINGG");
  try {
    const body = {
      design_codes: getSelectedDesign ? getSelectedDesign : formData.SKU,
      assignment_data: {
        length: formData.length,
        width: formData.width,
        height: formData.height,
        approx_diamond_weight: formData.approxDiamondWeight,
        approx_metal_weight: formData.approxMetalWeights,
        approx_price: formData.approxMRP,
        note: formData.notes,
        product_category: formData.productCategory,
        type_of_metal: formData.typeOfMetal,
        diamond_type: formData.diamondType,
        findings: formData.findings,
        tag: formData.tag,
      },
    };
    const response = body && (await apiService.post(ASSIGNMENT_MOVE, body));
    if (response?.data?.results?.status_code === 200) {
      all_Designs(setIsLoading, setData);
      onClose();
      setSuccessMessage("Moved to Assignment Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      setSelectedDesigns([]);
      setShowRadioButtons(false);
      setSelectButtonLabel("Select");
      // setShowAssignmentModal(true);
      setMovedItemsId(response?.data?.results.data);
      setFormData({
        SKU: "",
        productCategory: "",
        length: "",
        width: "",
        height: "",
        typeOfMetal: "",
        diamondType: "",
        approxDiamondWeight: "",
        findings: "",
        approxMetalWeights: "",
        approxMRP: "",
        tag: "",
        notes: "",
      });
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

export const editBasicDetails = async (
  formData,
  folderIdA,
  designId,
  setSuccessMessage,
  setSuccessModalOpen,
  onClose
) => {
  try {
    const body = {
      design_codes: formData.SKU,
      assignment_data: {
        length: formData.length,
        width: formData.width,
        height: formData.height,
        approx_diamond_weight: formData.approxDiamondWeight,
        approx_metal_weight: formData.approxMetalWeights,
        approx_price: formData.approxMRP,
        note: formData.notes,
        product_category: formData.productCategory,
        type_of_metal: formData.typeOfMetal,
        diamond_type: formData.diamondType,
        findings: formData.findings,
        tag: formData.tag,
      },
    };
    console.log(body, "move_TO_ASSINGG");
    const response = await apiService.patch(
      `${EDIT_BASIC_DETAILS}${folderIdA}/items/${designId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      // all_Designs(setIsLoading, setData);
      onClose();
      setSuccessMessage("Basic Details Edited SuccessFully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// export const move_to_assignment_from_admin = async (
//   formData,
//   onClose,
//   setSuccessModalOpen,
//   setAssignDesignerModalOpen,
//   setSuccessMessage,
//   setAdminBasicDetailsOpen,
//   setAdminUploadedItemId,

//   // setIsLoading,
//   // setSelectedDesigns,
//   // setData,
//   // setShowRadioButtons,
//   // setSelectButtonLabel,
//   // setShowAssignmentModal,
//   // setMovedItemsId,
//   // setFormData
// ) => {
//   try {
//     const body = {
//       design_codes: formData.SKU,
//       assignment_data: {
//         length: formData.length,
//         width: formData.width,
//         height: formData.height,
//         approx_diamond_weight: formData.approxDiamondWeight,
//         approx_metal_weight: formData.approxMetalWeights,
//         approx_price: formData.approxMRP,
//         note: formData.notes,
//         product_category: formData.productCategory,
//         type_of_metal: formData.typeOfMetal,
//         diamond_type: formData.diamondType,
//         findings: formData.findings,
//         tag: formData.tag,
//       },
//     };
//     console.log(body, "move_TO_ASSINGG");
//     const response = await apiService.post(ASSIGNMENT_MOVE, body);
//     if (response?.data?.results?.status_code === 200) {
//     debugger
//       setAdminUploadedItemId(response.data.results.data);
//       setSuccessMessage("Moved to Assignment Successfully");
//       setSuccessModalOpen(true);
//       setAssignDesignerModalOpen(true);
//       setTimeout(() => {
//         setSuccessModalOpen(false);
//         setAdminBasicDetailsOpen(false);
//       }, 1600);
//       // setSelectedDesigns([]);
//       // setShowRadioButtons(false);
//       // setSelectButtonLabel("Select");
//       // setShowAssignmentModal(true);
//       // setMovedItemsId(response?.data?.results.data);
//       // setFormData({
//       //   SKU: "",
//       //   productCategory: "",
//       //   length: "",
//       //   width: "",
//       //   height: "",
//       //   typeOfMetal: "",
//       //   diamondType: "",
//       //   approxDiamondWeight: "",
//       //   findings: "",
//       //   approxMetalWeights: "",
//       //   approxMRP: "",
//       //   tag: "",
//       //   notes: "",
//       // });
//     }
//   } catch (error) {
//     console.error("Error moving designs:", error);
//   }
// };
export const move_to_assignment_from_admin = async (
  formData,
  setSuccessModalOpen,
  setAssignDesignerModalOpen,
  setSuccessMessage,
  setAdminBasicDetailsOpen,
  setAdminBasicItemId,
  setFormData
) => {
  try {
    const body = {
      design_codes: formData.SKU,
      assignment_data: {
        length: formData.length,
        width: formData.width,
        height: formData.height,
        approx_diamond_weight: formData.approxDiamondWeight,
        approx_metal_weight: formData.approxMetalWeights,
        approx_price: formData.approxMRP,
        note: formData.notes,
        product_category: formData.productCategory,
        type_of_metal: formData.typeOfMetal,
        diamond_type: formData.diamondType,
        findings: formData.findings,
        tag: formData.tag,
      },
    };
    console.log(body, "move_TO_ASSIGN");
    const response = await apiService.post(ASSIGNMENT_MOVE, body);
    if (response.data.results.status_code === 200) {
      setAdminBasicItemId(response.data.results.data[0].item_id); // Update the new state with the response data
      setSuccessMessage("Moved to Assignment Successfully");
      setSuccessModalOpen(true);
      setAssignDesignerModalOpen(true);
      setFormData({
        SKU: [],
        productCategory: "",
        length: "",
        width: "",
        height: "",
        typeOfMetal: "",
        diamondType: "",
        approxDiamondWeight: "",
        findings: "",
        approxMetalWeights: "",
        approxMRP: "",
        tag: "",
        notes: "",
      });
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// export const upload_admin_image_assignment = async (
// setAdminUploadedImageIds,
// uploadedImage,
// setAdminBasicDetailsOpen
// ) => {
//   try {
//     const body = {
//       image : uploadedImage
//     };
//     console.log(body, "move_TO_ASSINGG");
//     const response = await apiService.post(UPLOAD_ADMIN_IMAGE_ASSIGNMENT, body);
//     if (response.data.results.status_code === 200) {
//       setAdminUploadedImageIds(response.data.results.data)
//       setAdminBasicDetailsOpen(true)
//     }
//   } catch (error) {
//     console.error("Error moving designs:", error);
//   }
// };

export const upload_admin_image_assignment = async (
  setAdminUploadedImageIds,
  uploadedImage,
  setAdminBasicDetailsOpen,
  setAdminUploadedIds
) => {
  try {
    // Ensure uploadedImage is a File or Blob
    const formData = new FormData();
    formData.append("image", uploadedImage);

    const response = await apiService.post(
      UPLOAD_ADMIN_IMAGE_ASSIGNMENT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response?.data?.results?.status_code === 200) {
      const responseData = response?.data?.results?.data;
      setAdminUploadedImageIds(responseData); // Set the entire response data to state
      setAdminBasicDetailsOpen(true);
      setAdminUploadedIds(responseData.id);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const basic_calculation = async (
  setIsLoadingCalculation,
  formData,
  SelectedDiamondId,
  SelectedMetalId,
  setCalculationData
) => {
  try {
    setIsLoadingCalculation(true);
    const body = {
      metal_weight: formData.approxMetalWeights,
      diamond_weight: formData.approxDiamondWeight,
      metal_id: SelectedMetalId,
      diamond_id: SelectedDiamondId,
    };
    console.log(body, "move_TO_ASSINGG");
    const response = await apiService.post(CALCULATION, body);
    if (response.data.results.status_code === 200) {
      setCalculationData(response?.data?.results?.data);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoadingCalculation(false);
  }
};

export const list_all_designers = async (setAllDesigners) => {
  try {
    const response = await apiService.get(LIST_ALL_DESIGNERS);
    if (checkApiStatus(response)) {
      setAllDesigners(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const assign_to_designers = async (
  assignedDesignerId,
  AdminUploadedIds,
  onClose,
  setSuccessModalOpen,
  setSuccessMessage,
  setOpenAdminFolder
) => {
  try {
    const body = {
      paper_design_id: AdminUploadedIds,
      user: assignedDesignerId,
    };
    console.log(body, "bodyDeesiners");
    const response = await apiService.post(ASSIGN_UNASSIGN_DESIGNERS, body);
    if (response.data.results.status_code === 200) {
      setSuccessMessage("Item Assigned SuccessFully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setOpenAdminFolder(true);
        setSuccessModalOpen(false);
        onClose();
      }, 1600);
    }
  } catch (error) {
    // setSelectedAssignment([])
    console.error("Error moving designs:", error);
    alert(error);
  }
};
export const move_to_folder_admin_user = async (
  adminBasicItemIdsArray,
  folderName,
  setSuccessMessage,
  setSuccessModalOpen,
  setFolderName,
  onClose,
  setAssignDesignerModalOpen,
  setAdminBasicDetailsOpen,
  setUploadedImage,
  setAssignedDesignerId
) => {
  try {
    const body = {
      folder_data: {
        name: folderName,
      },
      items: adminBasicItemIdsArray,
    };
    console.log(body, "itemMovirddd");
    const response = await apiService.post(MOVE_TO_FOLDER, body);
    if (response.data.results.status_code === 200) {
      console.log("successfully created");
      // list_assignment_folder(setIsLoading, setAssignmentFolder);
      onClose();
      setSuccessMessage("Assignment Folder Created SuccessFully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
        setAssignDesignerModalOpen(false);
        setAdminBasicDetailsOpen(false);
        setUploadedImage(null);
      }, 1600);
      setAssignedDesignerId(null);
      setFolderName("");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
