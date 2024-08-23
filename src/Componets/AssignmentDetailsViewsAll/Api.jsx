import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import {
  ALL_ITEMS_DETAILS_VIEW,
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
