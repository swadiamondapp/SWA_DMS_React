import {
    apiService,
    checkApiStatus,
  } from "../../Pages/Services/ApiInstants";
import { LIST_FROM_DESIGN_CAD, LIST_SLOT_HUB, SLOT_VIEW_BY_ID } from "../Services/EndPoints";
  // import { LIST_FROM_DESIGN_CAD, LIST_SLOT_HUB, SLOT_VIEW_BY_ID, } from "../../Pages/Services/EndPoints";

  
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


  export const slot_view_by_id = async (Id, setSloteView) => {
    try {
      const response = await apiService.get(`${SLOT_VIEW_BY_ID}${Id}/`);
      if (checkApiStatus(response)) {
        setSloteView(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };