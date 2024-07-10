import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import { CHOOSE_OUTLET_DROPDOWN, DIAMONDS_COLOR, DIAMOND_CLARITY, METAL_TYPE_DROPDOWN, OUTLET_DROP_DOWN_MASTER, PRODUCT_TYPE_DROPDOWN } from "../../Pages/Services/EndPoints";

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
      const response = await apiService.get(OUTLET_DROP_DOWN_MASTER);
      if (checkApiStatus(response)) {
        setOutLetDropDown(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const diamond_colours = async (
    setSelectDiamondColor
  ) => {
    try {
      const response = await apiService.get(DIAMONDS_COLOR);
      if (checkApiStatus(response)) {
        setSelectDiamondColor(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const diamond_clarity_choice = async (
    setSelectDiamondClarity
  ) => {
    try {
      const response = await apiService.get(DIAMOND_CLARITY);
      if (checkApiStatus(response)) {
        setSelectDiamondClarity(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

