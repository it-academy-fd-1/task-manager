const { default: axios } = require("axios");

class ApiService {
  constructor() {
    this.apiInstance = axios.create({
      baseURL:
        "https://task-manager-students-default-rtdb.europe-west1.firebasedatabase.app",
    });
  }

  post(url, data = {}, headers = {}) {
    return this.apiInstance.post(url.concat(".json"), data, headers);
  }

  get(url, headers = {}) {
    return this.apiInstance.get(url.concat(".json"), headers);
  }

  put(url, data, headers = {}) {
    return this.apiInstance.put(url.concat(".json"), data, headers);
  }

  delete(url, headers = {}) {
    return this.apiInstance.delete(url.concat(".json"), headers);
  }
}

export const apiService = new ApiService();
