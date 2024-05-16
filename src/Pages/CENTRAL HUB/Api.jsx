import {
    apiService,
    checkApiStatus,
  } from "../../Pages/Services/ApiInstants";
  import { setToLocalstorage } from "../../Pages/Utils/Common";
  import { LIST_FROM_DESIGN_CAD, LIST_SLOT_HUB, } from "../../Pages/Services/EndPoints";

  
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
