import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.vipairassist.com/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default instance;