import {
    apiService,
    checkApiStatus,
  } from "../../Pages/Services/ApiInstants";
  import { setToLocalstorage } from "../../Pages/Utils/Common";
  import { LIST_FROM_DESIGN_CAD, LIST_SLOT_HUB, SLOT_VIEW_BY_ID, } from "../../Pages/Services/EndPoints";

  
export const list_slot_central_hub = async (setIsLoading, setData) => {
    try {
      const response = await apiService.get(LIST_SLOT_HUB);
      if (checkApiStatus(response)) {
        setData(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const list_all_designs_from_cad = async (setIsLoading, setData) => {
    try {
      const response = await apiService.get(LIST_FROM_DESIGN_CAD);
      if (checkApiStatus(response)) {
        setData(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  export const slot_view_by_id = async (setIsLoading,setSloteView,userId) => {
    try {
      const response = await apiService.get(`${SLOT_VIEW_BY_ID}${userId}/`);
      if (response?.data?.results?.status_code === 200) {
        // list_slot_central_hub(setIsLoading, setData)
        setSloteView(response.data.results.data)
      }
    } catch (error) {
      console.log(error);
    }
  };