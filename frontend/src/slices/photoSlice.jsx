import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Publish user photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
  "photo/userphotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);
    return data;
  }
);

// Delete a photo
export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.deletePhoto(id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );
  }
);

// Get photo by id
export const getPhoto = createAsyncThunk(
  "photo/getphoto",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getPhoto(id, token);
    return data;
  }
);

// Like a photo
export const LikePhoto = createAsyncThunk(
  "photo/like",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.likePhoto(id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const Comments = createAsyncThunk(
  "photo/comments",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.comment(
      { comment: commentData.comment },
      commentData.id,
      token
    );

       // Check for errors
       if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }

    return data;
  }
);

// Get all photos
export const getphotos = createAsyncThunk("photo/getall", async(_, thunkAPI) => {

  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.getPhotos(token);

  return data;
  
})

// Seacrh photo by title
export const searchPhotos = createAsyncThunk("photo/search", async(query, thunkAPI) => {

  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.searchPhotos(query, token);

  return data;

})

// functions
export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;

        // Certifique-se de que state.photos seja uma array antes de usar unshift
        if (!Array.isArray(state.photos)) {
          state.photos = [];
        }

        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })

      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos.map((photo) => {
          if (
            photo &&
            action.payload.photo &&
            photo._id === action.payload.photo._id
          ) {
            return { ...photo, title: action.payload.photo.title };
          }
          state.photos = state.photos.filter(
            (photo) => photo._id !== action.payload.id
          );
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        const updatedPhoto = action.payload.photo;

        state.photos = state.photos.map((photo) => {
          if (photo._id === updatedPhoto._id) {
            return { ...photo, title: updatedPhoto.title };
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      })
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = !action.payload.error; // Defina success com base na presença de erro
        state.error = action.payload.error || null;
        state.photo = action.payload;
      })
      .addCase(LikePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos.map((photo) => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(LikePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Comments.pending, (state) => {
        state.error = null; // Limpar o erro ao iniciar a solicitação
      })
      .addCase(Comments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo.comments.push(action.payload.comment);
        state.message = action.payload.message;
      })
      .addCase(Comments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getphotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getphotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
