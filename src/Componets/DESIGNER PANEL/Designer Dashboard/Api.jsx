import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import {
  DESIGNER_CATEGORY_FILTER,
  DESIGNER_DASHBOARD_FILTER,
  LIST_ALL_CAD_DESIGNERS,
  LIST_ALL_USER,
  LIST_UPLOAD_DESIGN,
  UPLOAD_MULTIPLE_IMAGES,
} from "../../../Pages/Services/EndPoints";

export const list_uploaded_designs = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_UPLOAD_DESIGN);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const uplodedDesignPagination = async (
  setIsLoading,
  setData,
  currentPage
) => {
  setIsLoading(true);
  try {
    const response = await apiService.get(
      `${LIST_UPLOAD_DESIGN}?page=${currentPage}`
    );
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const upload_designs_items = async (
  setIsLoading,
  uploadImage,
  setData
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", uploadImage);
    const body = formData;
    const response = await apiService.post(LIST_UPLOAD_DESIGN, body);
    const res = response.data.results.status_code === 200;
    if (response.data.results.status_code === 200) {
      console.log(response.data.results.message, "success");
      list_uploaded_designs(setIsLoading, setData);
    }
    return res;
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoading(false);
  }
};

export const upload_multiple_designs_items = async (
  setIsLoading,
  fileList,
  upDateUploadImagesView,
  setSuccessModalOpen,
  setSuccessMessage,
  handleclose
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    fileList.forEach((file, index) => {
      formData.append(`image${index + 1}`, file.originFileObj);
      console.log(file.originFileObj, "uploaedImageweew");
    });
    const body = formData;
    console.log(body, "body==>Upload");
    const response = await apiService.post(UPLOAD_MULTIPLE_IMAGES, body);
    const res = response.data.results.status_code === 200;
    if (response.data.results.status_code === 200) {
      console.log(response.data.results.message, "success");
      upDateUploadImagesView();
      setSuccessMessage("Uploaded Successfully");
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      handleclose();
    }
    return res;
  } catch (error) {
    console.error("Error moving designs:", error);
  } finally {
    setIsLoading(false);
  }
};

export const list_all_cad_users = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_ALL_CAD_DESIGNERS);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const designerFilterBasedOnCategory = async (
  setIsLoading,
  id,
  formData,
  setCategoryFilter
) => {
  setIsLoading(true);
  try {
    const response = await apiService.get(
      `${DESIGNER_CATEGORY_FILTER}${id}/?category_ids=${formData.productCategory}`
    );
    if (checkApiStatus(response)) {
      setCategoryFilter(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
export const designerFilterBasedDate = async (
  setIsLoading,
  id,
  formData,
  setCategoryFilter
) => {
  setIsLoading(true);
  try {
    const response = await apiService.get(
      `${DESIGNER_CATEGORY_FILTER}${id}/?date_from=2024-08-10&date_to=2024-08-12`
    );
    if (checkApiStatus(response)) {
      setCategoryFilter(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const  designerFilter = async (
  setIsLoading,
  id,
  formData,
  setFolderDetails,
  startDate,
  endDate,
  setFilteredData
) => {
  try {
    setIsLoading(true);
    let apiUrl = `${DESIGNER_CATEGORY_FILTER}${id}?category_ids=${
      formData.productCategory
    }&date_from=${startDate ? startDate : ""}&date_to=${
      endDate ? endDate : ""
    }&tags=${ formData.tag ? formData.tag : "" }`;
    const response = await apiService.get(apiUrl);
    if (response.data.results.status_code === 200) {
      setFolderDetails(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const designerDashboradFilter = async (
  setIsLoading,
  id,
  formData,
  setFolderDetails,
  startDate,
  endDate,
  setFilteredData,
  setOpenFilterModal,
  sethide
) => {
  try {
    setIsLoading(true);
    let apiUrl = `${DESIGNER_DASHBOARD_FILTER}?category_type=${
      formData.productCategory
    }&date_from=${startDate ? startDate : ""}&date_to=${
      endDate ? endDate : ""
    }&tags=${ formData.tag ? formData.tag : "" }`;
    const response = await apiService.get(apiUrl);
    if (response.data.results.status_code === 200) {
      setFolderDetails(response.data.results.data);
      setOpenFilterModal(false)
      sethide(true)
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
