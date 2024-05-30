import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  CUSTOMIZATION_LIST_BY_ID_WAREHOUSE,
  DELETE_CUSTOMIZATION,
  LIST_LAST_VOTED_DESIGN,
  LIST_WAREHOUSE_DESIGNS,
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
