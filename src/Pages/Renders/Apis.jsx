import {
  DESIGN_LIST_CAD,
  FINISHED_PROJECTS,
  FOLDER_ITEM,
  CREATE_FINISHED_PROJECTS,
} from "../Services/EndPoints";
import { apiService, checkApiStatus } from "../Services/ApiInstants";

export const cadDesignList = async (setData) => {
  try {
    const response = await apiService.get(DESIGN_LIST_CAD);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const finishedProjectList = async (setData) => {
  try {
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

export const createFinsishedProjects = async (
  setIsLoading,
  data,
  setSuccess,
  onClose,
  setFinishedProjectData
) => {
  try {
    setIsLoading(true);
    const response = await apiService.post(CREATE_FINISHED_PROJECTS, data);
    if (checkApiStatus(response)) {
      finishedProjectList(setIsLoading, setFinishedProjectData);
      setSuccess(true);
      onClose();
      setTimeout(() => {
        setSuccess(false);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
