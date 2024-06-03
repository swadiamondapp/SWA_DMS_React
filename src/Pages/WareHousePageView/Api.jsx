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
  VOTERS_CUSTOMIZATION_LIST,
} from "../../Pages/Services/EndPoints";

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
  setCustomizationListData
) => {
  try {
    const response = await apiService.delete(
      `${DELETE_CUSTOMIZATION}${userId}/`
    );
    if (response?.data?.results?.status_code === 200) {
      customizaztion_list_wareHouse(setIsLoading, setCustomizationListData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const edit_customizaion_warehouse = async (
  setIsLoading,
  formData,
  displayEditDetailsById,
  onClose,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    setIsLoading(true);
    const body = {
      salesman: formData.sallerName,
      mobile_number: formData.mobileNumber,
      outlet: formData.chooseOutlet,
      productType: formData.productType,
      previously_made: formData.modelPrevioslyMade,
      sku: formData.prevMadeSKU,
      metal_type: formData.metalType,
      weight: formData.weight,
      size: formData.size,
      diamond_weight: formData.diamondWeight,
      no_of_diamond: formData.numberOfDiamonds,
      diamond_clarity: formData.diamondClarity,
      diamond_colour: formData.diamondColor,
      budget: formData.Budget,
      sku_of_swa_product: formData.swaProductSKU,
      notes: formData.notes,
    };
    console.log(body, "bodyAssijjmm");
    const response = await apiService.patch(
      `${EDIT_CUTOMIZATIONS_WAREHOUSE}/${displayEditDetailsById}/`,
      body
    );
    if (response.data.results.status_code === 200) {
      onClose();
      setSuccessMessage("Your form has been successfully updated.");
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

export const create_customizaion_warehouse = async (
  setIsLoading,
  formData,
  displayEditDetailsById,
  onClose,
  setSuccessMessage,
  setSuccessModalOpen,
  setErrorMessage
) => {
  try {
    setIsLoading(true);
    const body = {
      salesman: formData.sallerName,
      mobile_number: formData.mobileNumber,
      outlet: formData.chooseOutlet,
      product_type: formData.productType,
      previously_made: formData.modelPrevioslyMade,
      sku: formData.prevMadeSKU,
      metal_type: formData.metalType,
      weight: formData.weight,
      size: formData.size,
      diamond_weight: formData.diamondWeight,
      no_of_diamond: formData.numberOfDiamonds,
      diamond_clarity: formData.diamondClarity,
      diamond_colour: formData.diamondColor,
      budget: formData.Budget,
      sku_of_swa_product: formData.swaProductSKU,
      notes: formData.notes,
    };
    console.log(body, "bodyCreation");
    const response = await apiService.post(CREATE_CUSTOMIZATION, body);
    if (response.data.results.status_code === 200) {
      onClose();
      setSuccessMessage("Customization Created Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
      setErrorMessage(null)
    }
  } catch (error) {
    console.error("Error moving designs:", error);
    const errorReason =
    error?.response?.data?.mobile_number;
    const errorReasonString = errorReason
    ? Object.values(errorReason).flat().join(", ")
    : "";
    console.log(errorReasonString, "errrstring");
    setErrorMessage(errorReason)
  } finally {
    setIsLoading(false);

  }
};
