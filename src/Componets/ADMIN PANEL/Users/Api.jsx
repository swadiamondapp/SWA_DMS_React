import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import {
  EDIT_USER,
  LIST_ALL_USER,
  SEND_MAIL,
  USER_CREATE,
  USER_DELETE,
} from "../../../Pages/Services/EndPoints";

export const list_all_users = async (setIsLoading, setData) => {
  try {
    const response = await apiService.get(LIST_ALL_USER);
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const user_create = async (setIsLoading, formData, setUserList) => {
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

export const user_delete = async (setIsLoading, setData, userId) => {
  try {
    const response = await apiService.delete(`${USER_DELETE}${userId}/`);
    if (response?.data?.results?.status_code === 200) {
      list_all_users(setIsLoading, setData);
    }
    if (checkApiStatus(response)) {
      setData(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const update_user = async (
  setIsLoading,
  formData,
  setUserList,
  userId
) => {
  try {
    const response = await apiService.put(`${EDIT_USER}${userId}/`, formData, {
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

export const send_mail = async (setLoadingStates,usersId,setSuccessModalOpen) => {
  setLoadingStates((prev) => ({ ...prev, [usersId]: true }));
  try {
    const body = { user_id: usersId };
    console.log(body, "bodyAssi");
    const response = await apiService.post(SEND_MAIL, body);
    if (response.data.results.status_code === 200) {
      setLoadingStates((prev) => ({ ...prev, [usersId]: false }));
      // Open modal and close it after 1.5 seconds
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1500);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
    setLoadingStates((prev) => ({ ...prev, [usersId]: false }));
  }
};
