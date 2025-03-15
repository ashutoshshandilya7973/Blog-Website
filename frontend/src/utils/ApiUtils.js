import axios from 'axios'
import { error } from 'console';

class ApiUtils {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }

    });

    this.api.interceptors.request.use((context) => {
      const token = localStorage.getItem('token');
      if (token) {
        context.headers.Authorization = `bearer ${token}`
      }
      return context;
    },
      (error) => Promise.reject(error)
    )
  }


  async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      

      return response.data;
    } catch (error) {
      this.handleError(error)
    }
  }

  async get(endpoint, param = {}) {
    try {
      const response = await this.api.get(endpoint, {params:param});
      return response.data

    } catch (error) {
      console.log(error);
      this.handleError(error)
    }
  }
   
  async put(endpoint,data){
    try {
      const response=await this.api.put(endpoint,data);
      return response.data;
      
    } catch (error) {
      console.log(error);
      this.handleError(error)
      
    }
  }

  handleError(error) {
    console.log(error)
    throw error;
  }
}

const apiUtils= new ApiUtils("");
export default apiUtils;