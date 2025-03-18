import axios from 'axios'


class ApiUtils {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials:true,

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
      this.handleError(error);
      return { success: false, message: "An error occurred" }; // Return an object instead of throwing
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

const apiUtils= new ApiUtils("http://localhost:3005/api");
export default apiUtils;