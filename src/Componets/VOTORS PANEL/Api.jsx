import {
    apiService,
    checkApiStatus,
  } from "../../Pages/Services/ApiInstants";
  import { setToLocalstorage } from "../../Pages/Utils/Common";
  import {CUSTOMIZATION_DETAILS, DELETE_CUSTOMIZATION, VOTERS_CUSTOMIZATION_LIST } from "../../Pages/Services/EndPoints";
  import { ALL_DESIGNS,VOTED_DESIGN_LIST } from "../../Pages/Services/EndPoints";

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

  export const all_Designs_items = async (setIsLoading, setData) => {
    try {
      const response = await apiService.get(ALL_DESIGNS);
      if (checkApiStatus(response)) {
        setData(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const voted_design_list = async (setIsLoading, setVotedList) => {
    try {
      const response = await apiService.get(VOTED_DESIGN_LIST);
      if (checkApiStatus(response)) {
        setVotedList(response.data.results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const delete_customization = async (setIsLoading, setData, userId,setDeleteConfirmationOpen) => {
    try {
      const response = await apiService.delete(`${DELETE_CUSTOMIZATION}${userId}/`);
      if (response?.data?.results?.status_code === 200) {
        voters_customization_list(setIsLoading, setData);
        setDeleteConfirmationOpen(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const customization_details = async (setIsLoading, setCustomization,userId) => {
    try {
      const response = await apiService.get(`${CUSTOMIZATION_DETAILS}${userId}/`);
      if (response?.data?.results?.status_code === 200) {
        setCustomization(response.data.results.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  




  // export const edit_customizaion= async (
  //   setIsLoading,
  //   formData,
  //   setUserList,
  //   userId
  // ) => {
  //   try {
  //     const response = await apiService.put(`${EDIT_USER}${userId}/`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data", // Ensure the content type is correct
  //       },
  //     });
  //     console.log("responces", response.data.results.status_code);
  //     if (response?.data?.results?.status_code === 200) {
  //       list_all_users(setIsLoading, setUserList);
  //     }
  //     if (checkApiStatus(response)) {
  //       //   setData(response.data.results.data);
  //       message.success("User created successfully!");
  //     } else {
  //       // Handle failure based on your API structure
  //       message.error("Failed to create user. Please try again.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };






  


