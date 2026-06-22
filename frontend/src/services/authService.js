import axios from "axios";

export const loginUser = (formData) => {
    return axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
            email: formData.email,
            password: formData.password
        }
    );
}

export const registerUser = (formData) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
    )
}
