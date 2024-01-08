import { api, requestConfig } from "../utils/config";

// Publish an user photo
const publishPhoto = async(data, token) => {

    const config = requestConfig("POST", data, token, true)

    try {
        
        const res = await fetch(api + "/photos/", config)
                        .then((res) => res.json())
                        .catch((err) => err)

            return res;

    } catch (error) {
        console.log(error);
    }

}

// Get user photos
const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token)
    
    try {
        const res = await fetch(api + "/photos/user/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
 
}

// Delete photo
const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(api + "/photos/" + id, config);

        if (!res.ok) {
            const errorData = await res.text();
            console.error("Erro na exclusão:", errorData);
            // Adicione aqui a lógica para lidar com o erro
            return;
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};

// Update photo
const updatePhoto = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);
  
    try {
      const res = await fetch(api + "/photos/" + id, config);
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.errors[0]);
      }
  
      const updatedPhoto = await res.json();
      return updatedPhoto;  // Certifique-se de que a resposta contém _id
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Get a photo by id
  const getPhoto = async(id, token) => {

    const config = requestConfig("GET", null, token);

    try {
    
        const res = await fetch(api + "/photos/" + id, config)
        .then((res) => res.json())
        .catch((err) => {
          console.error("Failed to fetch:", err);
          return { error: "Failed to fetch" };
        });
      
      return res;
      

    } catch (error) {
        console.log(error);
    }

  }

  // Like a photo
  const likePhoto = async(id, token) => {
    const config = requestConfig("PUT", null, token);

    try {
      const res = await fetch(api + "/photos/like/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }

  }

  // Comment to a photo
  const comment = async(data, id, token) => {

    const config = requestConfig("PUT", data, token)

    try {

      const res = await fetch(api + "/photos/comment/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)

            return res;
    } catch (error) {
      console.log(error);
    }

  }
  
  const getPhotos = async(token) => {

    const config = requestConfig("GET", null, token)
  
    try {
      
      const res = await fetch(api + "/photos", config)
                        .then((res) => res.json())
                        .catch((err) => err)

            return res;
    } catch (error) {
      console.log(error);
    }

  }

  // Search photo by title
  const searchPhotos = async(query, token) => {

    const config = requestConfig("GET", null, token);

    try {
      
      const res = await fetch(api + "/photos/search?q=" + query, config)
                              .then((res) => res.json())
                              .catch((err) => err)

          return res;

    } catch (error) {
      console.log(error);
    }

  }

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    likePhoto,
    comment,
    getPhotos,
    searchPhotos
};

export default photoService;