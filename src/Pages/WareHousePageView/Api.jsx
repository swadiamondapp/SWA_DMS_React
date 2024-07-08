import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  CONFIRM_WAREHOUSE,
  CREATE_CUSTOMIZATION,
  CUSTOMIZATION_LIST_BY_ID_WAREHOUSE,
  DELETE_CUSTOMIZATION,
  EDIT_CUTOMIZATIONS_WAREHOUSE,
  LIST_LAST_VOTED_DESIGN,
  LIST_WAREHOUSE_DESIGNS,
  REJECT_WAREHOUSE,
  SCAN_SLOT_LIST_GET,
  SCAN_SLOT_LIST_GET,
  SCAN_TABLE_LIST,
  SCAN_TABLE_SLOTID_SEARCH,
  SCAN_TABLE_STATUS_CHANGE,
  SCAN_TABLE_STATUS_GET,
  VOTERS_CUSTOMIZATION_LIST,
  WORKDONE_TABLE_LIST,
  WORKDONE_TABLE_PRODUCT_DETAIL,
  WORKDONE_TABLE_PRODUCT_SEARCH,
  WORKDONE_TABLE_PRODUCT_UPDATE,
  WORKDONE_TABLE_SLOTID_SEARCH,
} from "../../Pages/Services/EndPoints";
import {
  customization_details,
  voters_customization_list,
} from "../../Componets/VOTORS PANEL/Api";

export const list_warehouse_design = async (
  setIsLoading,
  setDesignWareHouse
) => {
  try {
    const response = await apiService.get(LIST_WAREHOUSE_DESIGNS);
    if (checkApiStatus(response)) {
      setDesignWareHouse(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const list_voted_designs = async (setIsLoading, setLastVotedDesigns) => {
  try {
    const response = await apiService.get(LIST_LAST_VOTED_DESIGN);
    if (checkApiStatus(response)) {
      setLastVotedDesigns(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const customizaztion_list_wareHouse = async (
  setIsLoading,
  setCustomizationListData
) => {
  try {
    const response = await apiService.get(VOTERS_CUSTOMIZATION_LIST);
    if (checkApiStatus(response)) {
      setCustomizationListData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const customization_details_view_warehouse = async (
  setIsLoading,
  setCustomizationWareHouseData,
  wareHouseuserId
) => {
  try {
    const response = await apiService.get(
      `${CUSTOMIZATION_LIST_BY_ID_WAREHOUSE}${wareHouseuserId}/`
    );
    if (response?.data?.results?.status_code === 200) {
      setCustomizationWareHouseData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const delete_customization_warehouse = async (
  setIsLoading,
  userId,
  setCustomizationListData,
  setDeleteConfirmationOpen,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  try {
    const response = await apiService.delete(
      `${DELETE_CUSTOMIZATION}${userId}/`
    );
    if (response?.data?.results?.status_code === 200) {
      customizaztion_list_wareHouse(setIsLoading, setCustomizationListData);
      setDeleteConfirmationOpen(false), setSuccessModalOpen(true);
      setSuccessMessage("Deleted Successfully");
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const edit_customizaion_warehouse = async (
//   setIsLoading,
//   formData,
//   displayEditDetailsById,
//   onClose,
//   setSuccessMessage,
//   setSuccessModalOpen,
//   imageFiles
// ) => {
//   try {
//     setIsLoading(true);
//     const body = {
//       salesman: formData.sallerName,
//       mobile_number: formData.mobileNumber,
//       outlet: formData.chooseOutlet,
//       productType: formData.productType,
//       previously_made: formData.modelPrevioslyMade,
//       sku: formData.prevMadeSKU,
//       metal_type: formData.metalType,
//       weight: formData.weight,
//       size: formData.size,
//       diamond_weight: formData.diamondWeight,
//       no_of_diamond: formData.numberOfDiamonds,
//       diamond_clarity: formData.diamondClarity,
//       diamond_colour: formData.diamondColor,
//       budget: formData.Budget,
//       sku_of_swa_product: formData.swaProductSKU,
//       notes: formData.notes,
//       image:
//       image2:
//       image3:
//     };
//     console.log(body, "bodyAssijjmm");
//     const response = await apiService.patch(
//       `${EDIT_CUTOMIZATIONS_WAREHOUSE}/${displayEditDetailsById}/`,
//       body
//     );
//     if (response.data.results.status_code === 200) {
//       onClose();
//       setSuccessMessage("Your form has been successfully updated.");
//       setSuccessModalOpen(true);
//       setTimeout(() => {
//         setSuccessModalOpen(false);
//       }, 1500);
//     }
//   } catch (error) {
//     console.error("Error moving designs:", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

export const edit_customizaion_warehouse = async (
  setIsLoading,
  formData,
  displayEditDetailsById,
  onClose,
  setSuccessMessage,
  setSuccessModalOpen,
  imageFiles,
  setData,
  setImageFiles,
  setCustomization
) => {
  try {
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("salesman", formData.sallerName);
    formDataToSend.append("mobile_number", formData.mobileNumber);
    formDataToSend.append("outlet", formData.chooseOutlet);
    formDataToSend.append("product_type", formData.productType);
    formDataToSend.append("previously_made", formData.modelPrevioslyMade);
    formDataToSend.append("sku", formData.prevMadeSKU);
    formDataToSend.append("metal_type", formData.metalType);
    formDataToSend.append("weight", formData.weight);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("width", formData.width);
    formDataToSend.append("height", formData.height);
    formDataToSend.append("length_of_item", formData.length_of_item);
    formDataToSend.append("diamond_type", formData.diamond_type);
    formDataToSend.append("diamond_weight", formData.diamondWeight);
    formDataToSend.append("no_of_diamond", formData.numberOfDiamonds);
    formDataToSend.append("diamond_clarity", formData.diamondClarity);
    formDataToSend.append("diamond_colour", formData.diamondColor);
    formDataToSend.append("budget", formData.Budget);
    formDataToSend.append("sku_of_swa_product", formData.swaProductSKU);
    formDataToSend.append("notes", formData.notes);

    // Append image files if they exist
    if (imageFiles.length > 0) {
      formDataToSend.append("image", imageFiles[0]);
    }
    if (imageFiles.length > 1) {
      formDataToSend.append("image2", imageFiles[1]);
    }
    if (imageFiles.length > 2) {
      formDataToSend.append("image3", imageFiles[2]);
    }
    if (imageFiles.length > 3) {
      formDataToSend.append("image4", imageFiles[3]);
    }
    if (imageFiles.length > 4) {
      formDataToSend.append("image5", imageFiles[4]);
    }

    const response = await apiService.patch(
      `${EDIT_CUTOMIZATIONS_WAREHOUSE}/${displayEditDetailsById}/`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.results.status_code === 200) {
      onClose();
      setSuccessMessage("Your form has been successfully updated.");
      setSuccessModalOpen(true);
      voters_customization_list(setIsLoading, setData);
      customization_details(
        setIsLoading,
        setCustomization,
        displayEditDetailsById
      );
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
    }
    setImageFiles([]);
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoading(false);
  }
};

export const reject_customization = async (
  setIsLoading,
  dataById,
  onClose,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${REJECT_WAREHOUSE}/${dataById}/`);
    if (response.data.results.status_code === 200) {
      onClose();
      setSuccessMessage("Rejected successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoading(false);
    // setSuccessMessage("null")
  }
};

export const confirm_customization = async (
  setIsLoading,
  dataById,
  onClose,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  try {
    setIsLoading(true);

    const response = await apiService.patch(
      `${CONFIRM_WAREHOUSE}/${dataById}/`
    );
    if (response.data.results.status_code === 200) {
      onClose();
      setSuccessMessage("Confirmed successfully");
      setSuccessModalOpen(true);
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

// export const create_customizaion_warehouse = async (
//   setIsLoading,
//   formData,
//   displayEditDetailsById,
//   onClose,
//   setSuccessMessage,
//   setSuccessModalOpen,
//   setErrorMessage,
//   imageFiles
// ) => {
//   try {
//     setIsLoading(true);

//     const body = {
//       salesman: formData.sallerName,
//       mobile_number: formData.mobileNumber,
//       outlet: formData.chooseOutlet,
//       product_type: formData.productType,
//       previously_made: formData.modelPrevioslyMade,
//       sku: formData.prevMadeSKU,
//       metal_type: formData.metalType,
//       weight: formData.weight,
//       size: formData.size,
//       diamond_weight: formData.diamondWeight,
//       no_of_diamond: formData.numberOfDiamonds,
//       diamond_clarity: formData.diamondClarity,
//       diamond_colour: formData.diamondColor,
//       budget: formData.Budget,
//       sku_of_swa_product: formData.swaProductSKU,
//       notes: formData.notes,
//       image:imageFiles[0],
//       image2:imageFiles[1],
//       image3:imageFiles[2],
//     };
//     console.log(body, "bodyCreation");
//     const response = await apiService.post(CREATE_CUSTOMIZATION, body);
//     if (response.data.results.status_code === 200) {
//       onClose();
//       setSuccessMessage("Customization Created Successfully");
//       setSuccessModalOpen(true);
//       setTimeout(() => {
//         setSuccessModalOpen(false);
//       }, 1500);
//       setErrorMessage("")
//     }
//   } catch (error) {
//     console.error("Error moving designs:", error);
//     const errorReason =
//     error?.response?.data?.mobile_number;
//     const errorReasonString = errorReason
//     ? Object.values(errorReason).flat().join(", ")
//     : "";
//     console.log(errorReasonString, "errrstring");
//     setErrorMessage(errorReason)
//   } finally {
//     setIsLoading(false);

//   }
// };
export const create_customizaion_warehouse = async (
  setIsLoading,
  formData,
  displayEditDetailsById,
  onClose,
  setSuccessMessage,
  setSuccessModalOpen,
  setErrorMessage,
  imageFiles,
  setImageFiles,
  setCustomization,
  setData,
  userId
) => {
  try {
    setIsLoading(true);

    const body = new FormData();
    // Append form data fields to FormData
    body.append("salesman", formData.sallerName);
    body.append("mobile_number", formData.mobileNumber);
    body.append("outlet", formData.chooseOutlet);
    body.append("product_type", formData.productType);
    body.append("previously_made", formData.modelPrevioslyMade);
    body.append("sku", formData.prevMadeSKU);
    body.append("metal_type", formData.metalType);
    body.append("weight", formData.weight);
    body.append("size", formData.size);
    body.append("width", formData.width);
    body.append("length_of_item", formData.length_of_item);
    body.append("height", formData.height);
    body.append("diamond_type", formData.diamond_type);
    body.append("diamond_weight", formData.diamondWeight);
    body.append("no_of_diamond", formData.numberOfDiamonds);
    body.append("diamond_clarity", formData.diamondClarity);
    body.append("diamond_colour", formData.diamondColor);
    body.append("budget", formData.Budget);
    body.append("sku_of_swa_product", formData.swaProductSKU);
    body.append("notes", formData.notes);

    // Append images to FormData
    if (imageFiles.length > 0) body.append("image", imageFiles[0]);
    if (imageFiles.length > 1) body.append("image2", imageFiles[1]);
    if (imageFiles.length > 2) body.append("image3", imageFiles[2]);
    if (imageFiles.length > 3) body.append("image4", imageFiles[3]);
    if (imageFiles.length > 4) body.append("image5", imageFiles[4]);

    const response = await apiService.post(CREATE_CUSTOMIZATION, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.results.status_code === 200) {
      // Update states upon successful response
      await customization_details(setIsLoading, setCustomization, userId);
      await voters_customization_list(setIsLoading, setData);
      onClose();
      setSuccessMessage("Customization Created Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
      setErrorMessage("");
      setImageFiles([]);
      // Ensure refresh state update if needed
      // setRefresh((prev) => !prev);
    } else {
      throw new Error("Failed to create customization"); // Optional: handle specific error cases
    }
  } catch (error) {
    console.error("Error creating customization:", error);
    const errorReason = error?.response?.data?.mobile_number;
    const errorReasonString = errorReason
      ? Object.values(errorReason).flat().join(", ")
      : "";
    console.log(errorReasonString, "errorReasonString");
    setErrorMessage(errorReasonString);
  } finally {
    setIsLoading(false);
  }
};

// ....WREHOUSE scan table..

export const scan_list_datas = async (setIsLoading, setScanTableData) => {
  try {
    const response = await apiService.get(SCAN_TABLE_LIST);
    if (checkApiStatus(response)) {
      setScanTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const scan_list_search = async (
  setIsLoading,
  searchListId,
  setScanTableData,
  setsearchListId
) => {
  try {
    const body = {
      slot_id: searchListId,
    };

    const response = await apiService.post(SCAN_TABLE_SLOTID_SEARCH, body);
    if (response.data.results.status_code === 200) {
      scan_list_datas(setIsLoading, setScanTableData);
      setsearchListId("");
      alert("Item Added");
    }
  } catch (error) {
    console.log(error);
    alert("Already exists");
    setsearchListId("");
  }
};

export const scan_table_status_get = async (setIsLoading, setstatus) => {
  try {
    const response = await apiService.get(SCAN_TABLE_STATUS_GET);
    if (checkApiStatus(response)) {
      setstatus(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const scan_table_status_change = async (slotId, selectedStatusId) => {
  try {
    const body = {
      status_id: selectedStatusId,
    };
    const response = await apiService.put(
      `${SCAN_TABLE_STATUS_CHANGE}${slotId}/`,
      body
    );
    if (response.data.results.status_code === 200) {
      console.log("Status Updated Successfully");
      alert("updated Successfully");
    } else {
      console.error("Failed to update status");
    }
  } catch (error) {
    console.log("error on updating", error);
    console.log("error on updating", error);
  }
};

export const scan_table_item_products = async (
  clickedProductId,
  setclickedProducts
) => {
  try {
    const response = await apiService.get(
      `${SCAN_SLOT_LIST_GET}${clickedProductId}/`
    );
    if (checkApiStatus(response)) {
      setclickedProducts(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// ....WREHOUSE Workdone table..

export const workDone_list_datas = async (setIsLoading, setworkTableData) => {
  try {
    const response = await apiService.get(WORKDONE_TABLE_LIST);
    if (checkApiStatus(response)) {
      setworkTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const workDone_list_search = async (
  setIsLoading,
  searchListId,
  setworkTableData,
  setsearchListId
) => {
  try {
    const body = {
      product_id: searchListId,
    };

    const response = await apiService.post(WORKDONE_TABLE_PRODUCT_SEARCH, body);
    if (response.data.results.status_code === 200) {
      workDone_list_datas(setIsLoading, setworkTableData);
      setsearchListId("");
      alert("Product Added");
    }
  } catch (error) {
    console.log(error);
    alert("Product Already exists");
    setsearchListId("");
  }
};

export const workDone_table_product_detail = async (
  clickedProductId,
  setclickedProducts
) => {
  try {
    const response = await apiService.get(
      `${WORKDONE_TABLE_PRODUCT_DETAIL}${clickedProductId}/`
    );
    if (checkApiStatus(response)) {
      setclickedProducts(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const workDone_table_product_update = async (
  pId,
  formData,
  setOpenLeftbar
) => {
  try {
    // setIsLoading(true);
    const response = await apiService.patch(
      `${WORKDONE_TABLE_PRODUCT_UPDATE}/${pId}/update/`,
      formData
    );

    if (response.data.results.status_code === 200) {
      alert("Data Updated Successfully");
      setOpenLeftbar(false);
    }
  } catch (error) {
    console.error("Update Failed", error);
  }
};
