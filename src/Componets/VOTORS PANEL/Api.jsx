import { apiService, checkApiStatus } from "../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../Pages/Utils/Common";
import {
  CREATE_CUSTOMIZATION,
  CUSTOMIZATION_DETAILS,
  DELETE_CUSTOMIZATION,
  LIKE_DESIGN,
  VOTERS_CUSTOMIZATION_LIST,
} from "../../Pages/Services/EndPoints";
import { ALL_DESIGNS, VOTED_DESIGN_LIST } from "../../Pages/Services/EndPoints";

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

export const create_customization = async (
  setIsLoading,
  formData,
  setCustomizationList
) => {
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

export const delete_customization = async (
  setIsLoading,
  setData,
  userId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    setIsLoading(true);
    const response = await apiService.delete(
      `${DELETE_CUSTOMIZATION}${userId}/`
    );
    if (response?.data?.results?.status_code === 200) {
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully");
      setSuccessModalOpen(true);
      voters_customization_list(setIsLoading, setData);
      setIsLoading(false);
      setTimeout(() => {
        setSuccessModalOpen(false);
        voters_customization_list(setIsLoading, setData);
      }, 1600);
    }
  } catch (error) {
    console.log(error);
  }
};

export const customization_details = async (
  setIsLoading,
  setCustomization,
  userId
) => {
  try {
    const response = await apiService.get(`${CUSTOMIZATION_DETAILS}${userId}/`);
    if (response?.data?.results?.status_code === 200) {
      setCustomization(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const like_design = async (setIsLoading, id, setData) => {
  try {
    const response = await apiService.post(`${LIKE_DESIGN}/${id}/like/`);
    console.log("responces", response.data.results.status_code);
    if (response?.data?.results?.status_code === 200) {
    }
    if (checkApiStatus(response)) {
      all_Designs_items(setIsLoading, setData);
      message.success("User created successfully!");
    } else {
      message.error("Failed to create user. Please try again.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const order_customization = async (setIsLoading, Data) => {
  try {
    const body = {
      salesman: "",
      mobile_number: "",
      outlet: "",
      product_type: "",
      previously_made: "",
      metal_type: "",
      sku: "",
      image: "",
      weight: "",
      size: "",
      diamond_weight: "",
      no_of_diamond: "",
      diamond_clarity: "",
      diamond_colour: "",
      budget: "",
      sku_of_swa_product: "",
      notes: "",
      image2: "",
      image3: "",
    };
    const response = await apiService.post(CREATE_CUSTOMIZATION, body);
    console.log("responces", response.data.results.status_code);
    if (response?.data?.results?.status_code === 200) {
    }
    if (checkApiStatus(response)) {
      all_Designs_items(setIsLoading, setData);
      message.success("User created successfully!");
    } else {
      message.error("Failed to create user. Please try again.");
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
