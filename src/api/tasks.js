import { API_URLS } from "../constants/api-urls";
import { apiService } from "../services/Api";

export const createTaskAPI = ({ uid, boardId, data }) => {
  return apiService.post(`${uid}/${API_URLS.tasks}/${boardId}`, data);
};

export const getAllTasksAPI = (uid, boardId) => {
  return apiService.get(`${uid}/${API_URLS.tasks}/${boardId}`);
};

export const updateTaskAPI = ({ uid, boardId, taskId, data }) => {
  return apiService.patch(
    `${uid}/${API_URLS.tasks}/${boardId}/${taskId}`,
    data
  );
};

export const getTaskByIdAPI = ({ uid, boardId, taskId }) => {
  return apiService.get(`${uid}/${API_URLS.tasks}/${boardId}/${taskId}`);
};
