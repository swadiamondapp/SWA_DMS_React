import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import { CHOOSE_OUTLET_DROPDOWN, METAL_TYPE_DROPDOWN, PRODUCT_TYPE_DROPDOWN } from "../../Pages/Services/EndPoints";

export const metal_type_drop_down = async (
    setMetalTypeDropDown
  ) => {
    try {
      const response = await apiService.get(METAL_TYPE_DROPDOWN);
      if (checkApiStatus(response)) {
        setMetalTypeDropDown(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const product_type_drop_down = async (
    setProductTypeDropDown
  ) => {
    try {
      const response = await apiService.get(PRODUCT_TYPE_DROPDOWN);
      if (checkApiStatus(response)) {
        setProductTypeDropDown(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const choose_outlet_drop_down = async (
    setOutLetDropDown
  ) => {
    try {
      const response = await apiService.get(CHOOSE_OUTLET_DROPDOWN);
      if (checkApiStatus(response)) {
        setOutLetDropDown(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

