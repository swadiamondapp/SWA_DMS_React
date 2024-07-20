import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import {
  CATEGORY_ITEM_CREATE,
  CATEGORY_ITEM_DELETE,
  CATEGORY_ITEM_SEARCH,
  CATEGORY_ITEM_UPDATE,
  CENTRAL_ITEM_CREATE,
  CENTRAL_ITEM_DELETE,
  CENTRAL_ITEM_SEARCH,
  CENTRAL_ITEM_UPDATE,
  DIAMOND_ITEM_CREATE,
  DIAMOND_ITEM_DELETE,
  DIAMOND_ITEM_SEARCH,
  DIAMOND_ITEM_UPDATE,
  FINDING_ITEM_DELETE,
  FINDING_ITEM_SEARCH_PRIORITY,
  FINDING_ITEM_UPDATE,
  MASTERS_CATEGORY_DATAS,
  MASTERS_CENTRAL_DATAS,
  MASTERS_DIAMOND_DATAS,
  MASTERS_FINDING_CREATE,
  MASTERS_FINDING_DATAS,
  MASTERS_METAL_DATAS,
  MASTERS_OUTLET_DATAS,
  MASTERS_TAG_DATAS,
  MASTERS_VALUEADD_DATAS,
  MASTERS_WHSTATUS_DATAS,
  METAL_ITEM_CREATE,
  METAL_ITEM_DELETE,
  METAL_ITEM_SEARCH,
  METAL_ITEM_UPDATE,
  OUTLET_ITEM_CREATE,
  OUTLET_ITEM_DELETE,
  OUTLET_ITEM_SEARCH,
  OUTLET_ITEM_UPDATE,
  TAG_ITEM_CREATE,
  TAG_ITEM_DELETE,
  TAG_ITEM_SEARCH,
  TAG_ITEM_UPDATE,
  VALUEADD_ITEM_CREATE,
  VALUEADD_ITEM_DELETE,
  VALUEADD_ITEM_SEARCH,
  VALUEADD_ITEM_UPDATE,
  WHSTATUS_ITEM_CREATE,
  WHSTATUS_ITEM_DELETE,
  WHSTATUS_ITEM_SEARCH,
  WHSTATUS_ITEM_UPDATE,
} from "../../../Pages/Services/EndPoints";

export const finding_table_data = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_FINDING_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const finding_table_data_create = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(MASTERS_FINDING_CREATE, inputData);
    if (checkApiStatus(response)) {
      finding_table_data(setTableData);
      handleClose();
      setInputData({});
      alert("Item added successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

export const delete_finding_data = async (
  // setIsLoading,
  setTableData,
  userId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${FINDING_ITEM_DELETE}${userId}/delete/`
    );

    if (checkApiStatus(response)) {
      // setData(response.data.results.data);
      finding_table_data(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const search_finding_data = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${FINDING_ITEM_SEARCH_PRIORITY}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      finding_table_data(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const finding_data_upadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      find_name: inputData.find_name,
      priority: inputData.priority,
    };
    console.log(body, "finding update");
    const response = await apiService.patch(
      `${FINDING_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      finding_table_data(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ....tag...

export const tag_table_data = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_TAG_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const delete_tag_data = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${TAG_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      tag_table_data(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const search_tag_data = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${TAG_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      tag_table_data(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const tag_table_data_create = async (
  formData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  setSelectedImage
) => {
  try {
    console.log("api formData", formData);
    const response = await apiService.post(TAG_ITEM_CREATE, formData);
    // console.log("gfghf/",response.data.results)
    if (checkApiStatus(response)) {
      tag_table_data(setTableData);
      handleClose();
      setInputData({});
      setSelectedImage(null);
      alert("Item added successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.error("Error adding item:", error);
    setErrors("If any of the field alredy exist");
  }
};

export const tag_data_upadate = async (
  formData,
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId,
  selectedImage
) => {
  try {
    // const body = {
    //   name: inputData.name,
    //   priority: inputData.priority,
    //   image:selectedImage
    // };
    // console.log(body, "TAG update");
    const response = await apiService.patch(
      `${TAG_ITEM_UPDATE}${itemId}/edit/`,
      formData
    );
    if (checkApiStatus(response)) {
      tag_table_data(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ../metal..

export const metalTableData = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_METAL_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const metalDataCreate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(METAL_ITEM_CREATE, inputData);
    if (checkApiStatus(response)) {
      metalTableData(setTableData);
      handleClose();
      setInputData({});
      alert("item added Successfully");
    }
  } catch (error) {
    console.log(error);
    setErrors(error);
  }
};

export const deleteMetalData = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${METAL_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      metalTableData(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchMetalItems = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${METAL_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      metalTableData(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const metalDataUpadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      metal_name: inputData.metal_name,
      price: inputData.price,
      making_cost: inputData.making_cost,
    };
    console.log(body, "finding update");
    const response = await apiService.patch(
      `${METAL_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      metalTableData(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ../diamondtype..

export const diamondTableData = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_DIAMOND_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const diamondDataCreate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(DIAMOND_ITEM_CREATE, inputData);
    if (checkApiStatus(response)) {
      diamondTableData(setTableData);
      handleClose();
      setInputData({});
      alert("item added Successfully");
    }
  } catch (error) {
    console.log(error);
    setErrors(error);
  }
};

export const deleteDiamondData = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${DIAMOND_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      diamondTableData(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchDiamondItems = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${DIAMOND_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      diamondTableData(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const diamondDataUpadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      name: inputData.name,
      price: inputData.price,
    };
    console.log(body, "finding update");
    const response = await apiService.patch(
      `${DIAMOND_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      diamondTableData(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ../Valueaddition..

export const valueaddTableData = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_VALUEADD_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const valueaddDataCreate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(VALUEADD_ITEM_CREATE, inputData);
    if (checkApiStatus(response)) {
      valueaddTableData(setTableData);
      handleClose();
      setInputData({});
      alert("item added Successfully");
    }
  } catch (error) {
    console.log(error);
    setErrors(error);
  }
};

export const deleteValueaddData = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${VALUEADD_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      valueaddTableData(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchValueaddItems = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${VALUEADD_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      valueaddTableData(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const valueaddDataUpadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      slab_number: inputData.slab_number,
      min_value: inputData.min_value,
      max_value: inputData.max_value,
      value: inputData.value,
    };
    console.log(body, "finding update");
    const response = await apiService.patch(
      `${VALUEADD_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      valueaddTableData(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ../Warehouse status..

export const whstatusTableData = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_WHSTATUS_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const whstatusDataCreate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(WHSTATUS_ITEM_CREATE, inputData);
    if (checkApiStatus(response)) {
      whstatusTableData(setTableData);
      handleClose();
      setInputData({});
      alert("item added Successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteWhsatusData = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${WHSTATUS_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      whstatusTableData(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchWhsatusItems = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${WHSTATUS_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      whstatusTableData(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const whstatusDataUpadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      name: inputData.name,
      order: inputData.order,
    };
    const response = await apiService.patch(
      `${WHSTATUS_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      whstatusTableData(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ../central hub status..

export const centralStatusTableData = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_CENTRAL_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const centralStatusDataCreate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(CENTRAL_ITEM_CREATE, inputData);
    if (checkApiStatus(response)) {
      centralStatusTableData(setTableData);
      handleClose();
      setInputData({});
      alert("item added Successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.log(error);
    setErrors(error);
  }
};

export const deleteCentralData = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${CENTRAL_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      centralStatusTableData(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchCentralItems = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${CENTRAL_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      centralStatusTableData(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const centralStatusDataUpadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      name: inputData.name,
      order: inputData.order,
      status: inputData.order,
    };
    console.log(body, "finding update");
    const response = await apiService.patch(
      `${CENTRAL_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      centralStatusTableData(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ../category status..

export const categoryTableData = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_CATEGORY_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const categoryDataCreate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(CATEGORY_ITEM_CREATE, inputData);
    if (checkApiStatus(response)) {
      categoryTableData(setTableData);
      handleClose();
      setInputData({});
      alert("item added Successfully");
    } else if (
      response.data.results &&
      response.data.results.status_code === 206
    ) {
      setErrors(response.data.results.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryData = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${CATEGORY_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      categoryTableData(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchCategoryItems = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${CATEGORY_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      categoryTableData(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const categoryDataUpadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      name: inputData.name,
    };
    console.log(body, "finding update");
    const response = await apiService.patch(
      `${CATEGORY_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      categoryTableData(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};

// ../OUTLET..

export const outletTableData = async (setTableData) => {
  try {
    const response = await apiService.get(MASTERS_OUTLET_DATAS);
    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const outletDataCreate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData
) => {
  try {
    const response = await apiService.post(OUTLET_ITEM_CREATE, inputData);
    if (checkApiStatus(response)) {
      outletTableData(setTableData);
      handleClose();
      setInputData({});
      alert("item added Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteOutletData = async (
  // setIsLoading,
  setTableData,
  tagId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(
      `${OUTLET_ITEM_DELETE}${tagId}/delete/`
    );

    if (checkApiStatus(response)) {
      outletTableData(setTableData);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchOutletItems = async (
  searchListId,
  setTableData,
  setErrors
) => {
  try {
    let endpoint = `${OUTLET_ITEM_SEARCH}`;

    if (searchListId !== "") {
      endpoint += `&search_param=${searchListId}`;
    } else if (searchListId === "") {
      outletTableData(setTableData);
    }

    const response = await apiService.get(endpoint);

    if (checkApiStatus(response)) {
      setTableData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const outletDataUpadate = async (
  inputData,
  setErrors,
  setTableData,
  handleClose,
  setInputData,
  itemId
) => {
  try {
    const body = {
      name: inputData.name,
      place: inputData.place,
    };
    console.log(body, "finding update");
    const response = await apiService.patch(
      `${OUTLET_ITEM_UPDATE}${itemId}/edit/`,
      body
    );
    if (response.data.results.status_code === 200) {
      outletTableData(setTableData);
      // onClose();
      // setSuccessMessage("Edited SuccessFully");
      // setSuccessModalOpen(true);
      // setTimeout(() => {
      //   setSuccessModalOpen(false);
      // }, 1600);
      handleClose();
      setInputData({});
      alert("Item Updated Successfully");
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
