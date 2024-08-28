import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import {
  ALL_ITEMS_DETAILS_VIEW,
  DEATAILS_SATUS_UPDATE,
  REDNERS_DETAILS_VIEW,
  REDNERS_FOLDER_ITEM,
} from "../../Pages/Services/EndPoints";
import { setToLocalstorage } from "../../Pages/Utils/Common";

export const detailsViewOfItems = async (setIsLoading, setDetailsData, id) => {
  try {
    const response = await apiService.get(`${ALL_ITEMS_DETAILS_VIEW}${id}/`);
    if (checkApiStatus(response)) {
      setDetailsData(response.data.results);
    }
  } catch (error) {
    console.log(error);
  }
};

export const detailsViewOfItemsRenders = async (
  setIsLoading,
  setFolderDetailsView,
  id
) => {
  try {
    const response = await apiService.get(`${REDNERS_DETAILS_VIEW}${id}`);
    if (checkApiStatus(response)) {
      setFolderDetailsView(response.data.results);
    }
  } catch (error) {
    console.log(error);
  }
};

export const rendersDetailByCode = async (
  setIsLoading,
  setFolderDetailsView,
  id
) => {
  try {
    const response = await apiService.get(`${REDNERS_FOLDER_ITEM}${id}`);
    if (checkApiStatus(response)) {
      setFolderDetailsView(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateImageStatuses = async (
  setIsLoading,
  status,
  remark,
  setFolderDetailsView,
  detailsViewFolderName
) => {
  debugger
  const body = {
    status,
    remark: "" 
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${DEATAILS_SATUS_UPDATE}${detailsViewFolderName}`, body);
    if (checkApiStatus(response)) {
      setFolderDetailsView(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
 