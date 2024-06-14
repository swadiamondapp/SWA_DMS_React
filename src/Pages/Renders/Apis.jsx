import {
  DESIGN_LIST_CAD,
  FINISHED_PROJECTS,
  FOLDER_ITEM,
  CREATE_FINISHED_PROJECTS,
} from "../Services/EndPoints";
import { apiService, checkApiStatus } from "../Services/ApiInstants";

export const cadDesignList = async (setIsLoading, setData) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(DESIGN_LIST_CAD);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const finishedProjectList = async (setIsLoading, setData) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(FINISHED_PROJECTS);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const folderItemList = async (setIsLoading, setData, id) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(`${FOLDER_ITEM}${id}`);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const createFinsishedProjects = async (setIsLoading, data) => {
  try {
    setIsLoading(true);
    const response = await apiService.post(CREATE_FINISHED_PROJECTS, data);
    if (checkApiStatus(response)) {
      console.log(response);
      console.log("response----------123456", response);
      //  setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
