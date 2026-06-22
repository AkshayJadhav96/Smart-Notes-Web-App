import axios from "axios";

export const getNotes = (token,page) => {
    return axios.get(
        `${import.meta.env.VITE_API_URL}/notes?page=${page}&limit=10`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
    );
}

export const writeNote = (token,noteData) => {
    return axios.post(
        `${import.meta.env.VITE_API_URL}/notes`,
        noteData,
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
    );
}

export const removeNote = (token,noteId) => {
    return axios.delete(
          `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
      );
}

export const editNote = (token,noteId,noteData) => {
    return axios.put(
        `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
        noteData,
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
      );
}
