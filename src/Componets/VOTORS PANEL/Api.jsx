import {
    apiService,
    checkApiStatus,
  } from "../../Pages/Services/ApiInstants";
  import { setToLocalstorage } from "../../Pages/Utils/Common";
  import {VOTERS_CUSTOMIZATION_LIST } from "../../Pages/Services/EndPoints";
  import { useNavigate } from "react-router-dom";

  export const voters_customization_list = async (setIsLoading, setData) => {
    try {
      const response = await apiService.get(VOTERS_CUSTOMIZATION_LIST);
      if (checkApiStatus(response)) {
        setData(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const create_customization = async (setIsLoading, formData, setCustomizationList) => {
    try {
      const response = await apiService.post(USER_CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the content type is correct
        },
      });
      console.log("responces", response.data.results.status_code);
      if (response?.data?.results?.status_code === 200) {
        list_all_users(setIsLoading, setUserList);
      }
      if (checkApiStatus(response)) {
        //   setData(response.data.results.data);
        message.success("User created successfully!");
      } else {
        // Handle failure based on your API structure
        message.error("Failed to create user. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

