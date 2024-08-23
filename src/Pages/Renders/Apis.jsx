import {
  DESIGN_LIST_CAD,
  FINISHED_PROJECTS,
  FOLDER_ITEM,
  CREATE_FINISHED_PROJECTS,
  RENDESR_ALL_FINISHED_PROJECTS,
  RENDERS_REUPLOAD,
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

export const finishedProjectList = async (setData,setIsLoading) => {
  try {
    setIsLoading(true)
    const response = await apiService.get(FINISHED_PROJECTS);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } finally{
    setIsLoading(false)
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
  setFinishedProjectData,
  setErrors
) => {
  try {
    setIsLoading(true);
    const response = await apiService.post(CREATE_FINISHED_PROJECTS, data);
    if (checkApiStatus(response)) {
      finishedProjectList(setFinishedProjectData,setIsLoading);
      setSuccess(true);
      onClose();
      setTimeout(() => {
        setSuccess(false);
      }, 1600);   
  }  else if (
    response.data
  ) {
    setErrors(response.data.name);
  }
}
  catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const rendersAllFinishedProjectList = async (setData) => {
  try {
    const response = await apiService.get(RENDESR_ALL_FINISHED_PROJECTS);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } 
};

export const reuploadFinishedProject = async (
  setIsLoading,
  data,
  setSuccess,
  onClose,
  setFinishedProjectData,
  setErrors,
  fId,
  setFolderItem
) => {
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${RENDERS_REUPLOAD}${fId}`, data);
    if (checkApiStatus(response)) {
      setSuccess(true);
      folderItemList(setIsLoading,setFolderItem,fId)
      onClose();
      setTimeout(() => {
        setSuccess(false);
      }, 1600);   
  }  else if (
    response.data
  ) {
    setErrors(response.data.name);
  }
}
  catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};