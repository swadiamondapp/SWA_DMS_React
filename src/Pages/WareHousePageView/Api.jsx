import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
//import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  CONFIRM_WAREHOUSE,
  CREATE_CUSTOMIZATION,
  CUSTOMIZATION_LIST_BY_ID_WAREHOUSE,
  DELETE_CUSTOMIZATION,
  EDIT_CUTOMIZATION,
 // EDIT_CUTOMIZATIONS_WAREHOUSE,
  EDIT_DETAIL_VIEW_WAREHOUSE,
  LIST_LAST_VOTED_DESIGN,
  LIST_WAREHOUSE_DESIGNS,
  REJECT_WAREHOUSE,
  SCAN_SLOT_LIST_GET,
  SCAN_TABLE_LIST,
  SCAN_TABLE_SLOTID_SEARCH,
  SCAN_TABLE_STATUS_CHANGE,
  SCAN_TABLE_STATUS_GET,
  VOTERS_CUSTOMIZATION_LIST,
  WORKDONE_ACTUAL_DETAIL_TABLE_UPDATE,
  WORKDONE_CUSTOMIZATION_APPROVE,
  WORKDONE_TABLE_LIST,
  WORKDONE_TABLE_PRODUCT_DETAIL,
  WORKDONE_TABLE_PRODUCT_SEARCH,
  //WORKDONE_TABLE_PRODUCT_UPDATE,
} from "../../Pages/Services/EndPoints";
import {
 // customization_details,
  voters_customization_list,
} from "../../Componets/VOTORS PANEL/Api";

export const list_warehouse_design = async (
  setIsLoading,
  setDesignWareHouse,
  setWarehouseStatus,
  SearchWithName
) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(
      `${LIST_WAREHOUSE_DESIGNS}?design_code=${SearchWithName}`
    );
    if (checkApiStatus(response)) {
      setDesignWareHouse(response.data.results.data);
      setWarehouseStatus(response.data.results.status_code);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
export const get_customization_tracking = async (
  setIsLoading,
  setTrackData,
  customizationId
) => {
  try {
    setIsLoading(true);

    const response = await apiService.get(
      `customization/${customizationId}/tracking/`
    );

    if (checkApiStatus(response)) {
      const apiData = response?.data?.results?.data || {};

      setTrackData({
        order_details: apiData.order_details || {},
        tracking: Array.isArray(apiData.tracking)
          ? apiData.tracking
          : [],
      });
    }
  } catch (error) {
    console.error("Tracking API error:", error);
  } finally {
    setIsLoading(false);
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
  setCustomizationListData,
  SearchWithName
) => {
  try {
    setIsLoading(true);

    const params = new URLSearchParams({
      orderstatus: "requested",
    });

    // add search only if present
    if (SearchWithName) {
      params.append("customization_code", SearchWithName);
    }

    const response = await apiService.get(
      `${VOTERS_CUSTOMIZATION_LIST}?${params.toString()}`
    );

    if (checkApiStatus(response)) {
      setCustomizationListData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};


export const customization_details_view_warehouse = async (
  setIsLoading,
  setCustomizationWareHouseData,
  userWareHouseId
) => {
  try {
    const response = await apiService.get(
      `${CUSTOMIZATION_LIST_BY_ID_WAREHOUSE}${userWareHouseId}/`
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
  images,
  setImages,
  votersSetData,
  customizationFunction
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
    formDataToSend.append("due_date", formData.due_date);

    // Append image files if they exist
if (images[0]) formDataToSend.append("image", images[0]);
if (images[1]) formDataToSend.append("image2", images[1]);
if (images[2]) formDataToSend.append("image3", images[2]);
if (images[3]) formDataToSend.append("image4", images[3]);
if (images[4]) formDataToSend.append("image5", images[4]);

    const response = await apiService.patch(
      `${EDIT_CUTOMIZATION}${displayEditDetailsById}/`,
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
      voters_customization_list(setIsLoading, votersSetData);
      customizationFunction();
      // customization_details(

      //   setIsLoading,
      //   setCustomization,
      //   displayEditDetailsById
      // );
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
    }
    setImages(Array(5).fill(""));
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
    const response = await apiService.patch(`${REJECT_WAREHOUSE}${dataById}/`);
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

    if (response?.data?.results?.status_code === 200) {
      onClose();
      setSuccessMessage("Confirmed successfully");
      setSuccessModalOpen(true);

      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
    }

  } catch (error) {
    console.error("Error confirming customization:", error);

    // ✅ READ API ERROR MESSAGE SAFELY
    const errorMessage =
      error?.response?.data?.results?.message ||
      "Something went wrong. Please try again.";

    setSuccessMessage(errorMessage);
    setSuccessModalOpen(true);

    setTimeout(() => {
      setSuccessModalOpen(false);
    }, 2500); // slightly longer for error
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
  onClose,
  setSuccessMessage,
  setSuccessModalOpen,
  setErrorMessage,
  images,
  votersSetData,
  setFormData,
  setImages
) => {
  try {
    setIsLoading(true);

    const body = new FormData();
    // Append form data fields to FormData
    body.append("salesman", formData.sallerName);
    body.append("mobile_number", formData.mobileNumber);
    body.append("customer_name", formData.customerName);
    body.append("customer_number", formData.customerMobile);
    body.append("received_advance", formData.receivedAdvance);
    body.append("customer_email", formData.customerEmail);
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
    body.append("due_date",formData.due_date);
    body.append("is_draft","true");
    // Append images to FormData
 if (images[0]) body.append("image", images[0]);
if (images[1]) body.append("image2", images[1]);
if (images[2]) body.append("image3", images[2]);
if (images[3]) body.append("image4", images[3]);
if (images[4]) body.append("image5", images[4]);

    const response = await apiService.post(CREATE_CUSTOMIZATION, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.results.status_code === 200) {
      // Update states upon successful response
      // await customization_details(setIsLoading, setCustomization, userId);
      voters_customization_list(setIsLoading, votersSetData, "");
      onClose();
      setSuccessMessage("Customization Created Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
      setErrorMessage("");
      setFormData({
        sallerName: "",
        mobileNumber: "",
        chooseOutlet: "",
        productType: "",
        modelPrevioslyMade: "",
        prevMadeSKU: "",
        metalType: "",
        weight: "",
        size: "",
        width: "",
        height: "",
        diamond_type: "",
        length_of_item: "",
        diamondWeight: "",
        numberOfDiamonds: "",
        diamondClarity: "",
        diamondColor: "",
        Budget: "",
        swaProductSKU: "",
        notes: "",
        due_date:"",
      });
      setImages(Array(5).fill(""));
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
  setIsLoading(true);
  try {
    const response = await apiService.get(SCAN_TABLE_LIST);
    if (checkApiStatus(response)) {
      setScanTableData(response.data.results.data);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const scanSearchFilter = async (searchListId, setTableData) => {
  try {
    let endpoint = `${SCAN_TABLE_LIST}`;

    if (searchListId !== "") {
      endpoint += `?designcode=${searchListId}`;
    } else if (searchListId === "") {
      scan_list_datas(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const scan_list_search = async (
  setIsLoading,
  searchListId,
  setScanTableData,
  setsearchListId,
  setError,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  try {
    const body = {
      finisheditem_id: searchListId,
    };
    const response = await apiService.post(SCAN_TABLE_SLOTID_SEARCH, body);
    if (checkApiStatus(response)) {
      scan_list_datas(setIsLoading, setScanTableData);
      setsearchListId("");
      setSuccessMessage("Scanned Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1700);
      // alert("Item Added");
      setError("");
    }
    if (response.data.results.status_code === 206) {
      setError(response.data.results.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    // alert("Already exists");
    setError("");
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
  setsearchListId,
  setError,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  try {
    const body = {
      product_id: searchListId,
    };

    const response = await apiService.post(WORKDONE_TABLE_PRODUCT_SEARCH, body);
    if (checkApiStatus(response)) {
      workDone_list_datas(setIsLoading, setworkTableData);
      setsearchListId("");
      setError("");
      setSuccessMessage("Product Added Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1700);
    }
    if (response.data.results.status_code === 206) {
      setError(response.data.results.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  } catch (error) {
    console.log(error);
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

export const workDone_table_product_detail_actual = async (
  clickedProductId,
  setclickedProducts
) => {
  try {
    const response = await apiService.get(
      `${WORKDONE_ACTUAL_DETAIL_TABLE_UPDATE}${clickedProductId}/detail/`
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
  setOpenLeftbar,
  setSuccessModalOpen,
  setSuccessMessage,
  refreshList
) => {
  debugger;
  try {
    // setIsLoading(true);
    const response = await apiService.post(
      `${WORKDONE_ACTUAL_DETAIL_TABLE_UPDATE}${pId}/create/`,
      formData
    );

    if (checkApiStatus(response)) {
      setSuccessModalOpen(true);
      setSuccessMessage("Data Updated Successfully");

      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1700);
      setOpenLeftbar(false);
      refreshList();
    }
  } catch (error) {
    console.error("Update Failed", error);
  }
};
export const customizationApprove = async (
  setIsLoading,
  approveId,
  setCustomizationListData,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  try {
    const response = await apiService.patch(
      `${WORKDONE_CUSTOMIZATION_APPROVE}${approveId}/`
    );
    if (checkApiStatus(response)) {
      customizaztion_list_wareHouse(setIsLoading, setCustomizationListData, "");
      setSuccessModalOpen(true);
      setSuccessMessage("Approved Successfully");
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1700);
    }
  } catch (error) {
    console.error("Update Failed", error);
  }
};

export const wareHouseEditBasicDetails = async (
  setIsLoading,
  setActualFormData,
  actualFormData,
  userWareHouseId,
  setSuccessMessage,
  setSuccessModalOpen,
  setErrorPriceMessage,
  setErrors,
  navigate
) => {
  try {
    const body = {
    //  metal_type: actualFormData.typeOfMetal,
    //  weight: actualFormData.approxWeight,
    //  width: actualFormData.width,
    //  height: actualFormData.height,
     // length_of_item: actualFormData.length,
     // diamond_type: actualFormData.diamondType,
     // diamond_weight: actualFormData.approxDiamondWeight,
      actual_price: actualFormData.actualPrice,
    //  notes: actualFormData.notes,
      due_date:actualFormData.due_date,
    };
    console.log(body, "formBody");
    const response = await apiService.patch(
      `${EDIT_DETAIL_VIEW_WAREHOUSE}${userWareHouseId}`,
      body
    );
    if (response.data.results.status_code === 200) {
      setSuccessMessage("Updated Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
        navigate(`/customRequestTable`);
      }, 1700);
      setErrors({});
      setActualFormData({
        length: "",
        width: "",
        height: "",
        notes: "",
        typeOfMetal: [],
        diamondType: [],
        approxDiamondWeight: "",
        approxWeight: "",
        actualPrice: "",
      });
    }
  } catch (error) {
    console.log(error);
    setErrorPriceMessage(error);
  }
};
