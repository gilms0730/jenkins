import { defineStore } from "pinia";
import axios from "axios";

// const backend = "http://13.125.229.218:8080";
// const backend = "http://192.168.0.115:8080";
const backend = "http://52.78.9.103:9999/api"; 

export const useHouseStore = defineStore("house", {
  state: () => ({
    houseList: [],
    houseDetails: null,
    currentPage: 1,
    totalPages: 1,
  }),
  actions: {
    async getHouseList(page, size) {
      try {
        let response = await axios.get(
          backend + "/house/list?page=" + page + "&size=" + size
        );

        console.log("Total items in response:", response.data.length);

        const totalCountHeader = response.headers["x-total-count"];
        this.totalPages = totalCountHeader
          ? Math.ceil(totalCountHeader / size)
          : 1;

        if (page > this.totalPages) {
          page = this.totalPages;
          this.currentPage = page;
        } else {
          this.currentPage = page;
        }

        this.houseList = response.data;

        console.log("Current page:", this.currentPage);
        console.log("Total pages:", this.totalPages);
        console.log(response);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getHouseDetails(id) {
      try {
        const response = await axios.get(backend + "/house/find/" + id);
        this.houseDetails = response.data;
        console.log(this.houseDetails);
      } catch (error) {
        console.error(error);
      }
    },
    async getHouseListByName(page, size, name) {
      try {
        let response = await axios.get(
          backend +
            "/house/find/name?page=" +
            page +
            "&size=" +
            size +
            "&name=" +
            name
        );
        this.houseList = response.data;

        console.log(response);
        return response.data;
      } catch (error) {
        console.error("해당 이름의 숙소들이 존재하지 않습니다");
      }
    },
    async getHouseListByAddr(page, size, addr) {
      try {
        let response = await axios.get(
          backend +
            "/house/find/address?page=" +
            page +
            "&size=" +
            size +
            "&address=" +
            addr
        );
        this.houseList = response.data;

        console.log(response);
        return response.data;
      } catch (error) {
        console.error("해당 이름의 숙소들이 존재하지 않습니다");
      }
    },
    async getHouseListOrderByPriceDesc(page, size) {
      try {
        let response = await axios.get(
          backend + "/house/find/pricedesc?page=" + page + "&size=" + size
        );
        this.houseList = response.data;

        console.log(response);
        return response.data;
      } catch (error) {
        console.error("해당 이름의 숙소들이 존재하지 않습니다");
      }
    },
    async getHouseListOrderByPriceAsc(page, size) {
      try {
        let response = await axios.get(
          backend + "/house/find/priceasc?page=" + page + "&size=" + size
        );
        this.houseList = response.data;

        console.log(response);
        return response.data;
      } catch (error) {
        console.error("해당 이름의 숙소들이 존재하지 않습니다");
      }
    },
    async getHouseListOrderByLikeCntDesc(page, size) {
      try {
        let response = await axios.get(
          backend + "/house/find/likeCntDesc?page=" + page + "&size=" + size
        );
        this.houseList = response.data;

        console.log(response);
        return response.data;
      } catch (error) {
        console.error("해당 이름의 숙소들이 존재하지 않습니다");
      }
    },
    async createHouse(postCreateHouseDtoReq) {
      try {
        const formData = new FormData();
    
        // Append JSON data as a blob
        const jsonBlob = new Blob([JSON.stringify(postCreateHouseDtoReq)], {
          type: 'application/json',
        });
        formData.append('postCreateHouseDtoReq', jsonBlob);
    
        // Append files
        postCreateHouseDtoReq.uploadFiles.forEach((file) => {
          formData.append('uploadFiles', file);
        });
    
        const token = localStorage.getItem('token');
    
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        };
    
        const response = await axios.post(backend + '/house/create', formData, {
          headers,
        });
    
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    
  },
});
