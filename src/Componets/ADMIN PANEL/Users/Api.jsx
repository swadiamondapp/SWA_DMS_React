import {
  apiService,
  checkApiStatus,
} from "../../../Pages/Services/ApiInstants";
import { setToLocalstorage } from "../../../Pages/Utils/Common";
import {
  EDIT_USER,
  LIST_ALL_USER,
  SEND_MAIL,
  USER_ACTIVATING,
  USER_CREATE,
  USER_DELETE,
} from "../../../Pages/Services/EndPoints";

export const list_all_users = async (setIsLoading, setUserList) => {
  setIsLoading(true);
  try {
    setIsLoading(true)
    const response = await apiService.get(LIST_ALL_USER);
    if (checkApiStatus(response)) {
      setUserList(response.data.results.data);
    }
  } catch (error) {
    console.log(error);
}finally {
    setIsLoading(false)
  }
};

export const user_create = async (
  setIsLoading,
  formData,
  setUserList,
  setIsModalOpen,
  setSuccessModalOpen,
  setSuccessMessage,
  setErrorMessages,
  setFormData
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
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        selectedRole: "",
      });
      setIsModalOpen(false);
      setSuccessMessage("User Created successfully");
      //   setData(response.data.results.data);
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
      message.success("User created successfully!");
    } else {
      message.error("Failed to create user. Please try again.");
    }
  } catch (error) {
    console.log(error, "erreree");
    const errorReason = error?.response?.data?.results;
    const errorReasonString = errorReason
      ? Object.values(errorReason).flat().join(", ")
      : "";
    console.log(errorReasonString, "errrstring");
    setErrorMessages(errorReason);
  }
};

export const user_delete = async (
  setIsLoading,
  setUserList,
  userId,
  setDeleteConfirmationOpen,
  setSuccessMessage,
  setSuccessModalOpen
) => {
  try {
    const response = await apiService.delete(`${USER_DELETE}${userId}/`);
    if (checkApiStatus(response)) {
      list_all_users(setIsLoading, setUserList);
      setDeleteConfirmationOpen(false);
      setSuccessMessage("Deleted Successfully"), setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
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
  userId,
  setIsModalOpen,
  setSuccessModalOpen,
  setSuccessMessage
) => {
  try {
    const response = await apiService.put(`${EDIT_USER}${userId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure the content type is correct
      },
    });
    console.log("responces", response.data.results.status_code);
    if (response?.data?.results?.status_code === 200) {
      setIsModalOpen(false);
      list_all_users(setIsLoading, setUserList);
      setSuccessModalOpen(true);
      setSuccessMessage("updated Successfully");
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 1600);
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

export const send_mail = async (
  setLoadingStates,
  usersId,
  setSuccessModalOpen
) => {
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

export const user_activating = async (
  setIsLoading,
  usersId,
  statusPayload,
  setUserList
) => {
  try {
    const body = { status: statusPayload };
    console.log(body, "userActi");
    const response = await apiService.put(
      `${USER_ACTIVATING}/${usersId}/status/`,
      body
    );
    if (response.data.results.status_code === 200) {
      console.log(response, "respposUserA");
      list_all_users(setIsLoading, setUserList);
    }
  } catch (error) {
    console.error("Error moving designs:", error);
  }
};
