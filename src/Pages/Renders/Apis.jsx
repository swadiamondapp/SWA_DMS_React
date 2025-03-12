import {
  DESIGN_LIST_CAD,
  FINISHED_PROJECTS,
  FOLDER_ITEM,
  CREATE_FINISHED_PROJECTS,
  RENDESR_ALL_FINISHED_PROJECTS,
  RENDERS_REUPLOAD,
  LIST_CENTRAL_FOLDERS,
  APPROVE_CAD_DESIGNS,
  DOWNLOAD_BY_FILETYPE,
  CAD_UPLOADED_LIST,
  CAD_UPLOADED_CATEGORIES_LIST,
  CAD_UPLOADED_IMAGEFOLDERS_LIST,
} from "../Services/EndPoints";
import { apiService, checkApiStatus } from "../Services/ApiInstants";

export const cadDesignList = async (setData, SearchWithName) => {
  try {
    const response = await apiService.get(
      `${DESIGN_LIST_CAD}?name=${SearchWithName}`
    );
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const cadUpLoadedList = async (setData, setIsLoading) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(CAD_UPLOADED_LIST);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const cadUpLoadedCategoriesList = async (
  setData,
  cadName,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(
      `${CAD_UPLOADED_CATEGORIES_LIST}?cad_name=${cadName}`
    );
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const cadUpLoadedImgeFoldersList = async (
  setData,
  selectedCadName,
  category,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(
      `${CAD_UPLOADED_IMAGEFOLDERS_LIST}?cad_name=${selectedCadName}&product_category=${category}`
    );
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const downloadCadByFileType = async (
  setIsLoading,
  setData,
  fileType,
  selectedCadFolder
) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(
      `${DESIGN_LIST_CAD}?filetype=${fileType}&folder_ids=${selectedCadFolder}`
    );
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const cadDesignListApproved = async (setIsLoading, setData) => {
  try {
    setIsLoading(true);
    const response = await apiService.get(LIST_CENTRAL_FOLDERS);
    if (checkApiStatus(response)) {
      setData(response?.data?.results?.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const finishedProjectList = async (setData, setIsLoading) => {
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
      finishedProjectList(setFinishedProjectData, setIsLoading);
      setSuccess(true);
      onClose();
      setTimeout(() => {
        setSuccess(false);
      }, 1600);
    } else if (response.data) {
      setErrors(response.data.name);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const rendersAllFinishedProjectList = async (
  setData,
  SearchWithName
) => {
  try {
    const response = await apiService.get(
      `${RENDESR_ALL_FINISHED_PROJECTS}?designcode=${SearchWithName}`
    );
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
      folderItemList(setIsLoading, setFolderItem, fId);
      onClose();
      setTimeout(() => {
        setSuccess(false);
      }, 1600);
    } else if (response.data) {
      setErrors(response.data.name);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const cadApprovalByDesinger = async (setIsLoading, status) => {
  const body = {
    img1_status: status,
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(
      `${APPROVE_CAD_DESIGNS}/${"SWAD0028"}`,
      body
    );
    if (checkApiStatus(response)) {
      // setSuccess(true);
      // folderItemList(setIsLoading, setFolderItem, fId);
      // onClose();
      // setTimeout(() => {
      //   setSuccess(false);
      // }, 1600);
    } else if (response.data) {
      setErrors(response.data.name);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
