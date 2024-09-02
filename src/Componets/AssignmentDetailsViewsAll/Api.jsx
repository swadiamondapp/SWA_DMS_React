import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import {
  ALL_ITEMS_DETAILS_VIEW,
  CAD_IMAGE_SATUS_UPDATE,
  DEATAILS_CAD_SATUS_UPDATE,
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
  setFolderDetailsView,
  detailsViewFolderName,
  setRendesrDetail,
  setSuccessModalOpen
) => {
  const body = {
    ...status,
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${DEATAILS_SATUS_UPDATE}${detailsViewFolderName}`, body);
    if (checkApiStatus(response)) {
      setSuccessModalOpen(true)
      rendersDetailByCode(setIsLoading,setFolderDetailsView,detailsViewFolderName)
      // setRendesrDetail(response.data.results.data);
      setTimeout(() => {
        setSuccessModalOpen(false)
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const addRenderRemark = async (
  setIsLoading,
  renderRemark,
  setSuccessModalOpen,
  detailsViewFolderName,
  setOpenmodal
) => {
  const body = {
    remark:renderRemark 
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${DEATAILS_SATUS_UPDATE}${detailsViewFolderName}`, body);
    if (checkApiStatus(response)) {
      setOpenmodal(false)
      setSuccessModalOpen(true)
      setTimeout(() => {
        setSuccessModalOpen(false)
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
 
export const addCadRemark = async (
  setIsLoading,
  cadRemark,
  setSuccessModalOpen,
  detailsViewFolderName,
  setOpenmodal
) => {
  const body = {
    remark:cadRemark 
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${DEATAILS_CAD_SATUS_UPDATE}${detailsViewFolderName}`, body);
    if (checkApiStatus(response)) {
      setOpenmodal(false)
      setSuccessModalOpen(true)
      setTimeout(() => {
        setSuccessModalOpen(false)
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const updateCadImageStatuses = async (
  setIsLoading,
  status,
  remark,
  setFolderDetailsView,
  detailsViewFolderName
) => {
  const body = {
    ...status,
    remark: "" 
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${DEATAILS_CAD_SATUS_UPDATE}${detailsViewFolderName}`, body);
    if (checkApiStatus(response)) {
      setFolderDetailsView(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const Cad2DUpdateImage = async (
  setIsLoading,
  status,
  designcode,
  setSuccessModalOpen
) => {
  const body = {
    file2d_status:status
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${CAD_IMAGE_SATUS_UPDATE}${designcode}`, body);
    if (checkApiStatus(response)) {
      setSuccessModalOpen(true)
      setTimeout(() => {
        setSuccessModalOpen(false)
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const Cad3DUpdateImage = async (
  setIsLoading,
  status,
  designcode,
  setSuccessModalOpen
) => {
  const body = {
    file3d_status:status
  };
  try {
    setIsLoading(true);
    const response = await apiService.patch(`${CAD_IMAGE_SATUS_UPDATE}${designcode}`, body);
    if (checkApiStatus(response)) {
      setSuccessModalOpen(true)
      setTimeout(() => {
        setSuccessModalOpen(false)
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};