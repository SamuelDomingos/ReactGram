import "./Home.css"

//componets
import { Link } from "react-router-dom";

//Hooks
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import {useResetComponentMessage} from "../../hooks/useResetCompontentMessage"

//redux
import { getphotos, LikePhoto } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const {user} = useSelector((state) => state.auth);
  const {photos, loading} = useSelector((state) => state.photo);

  //Load all photos
  useEffect(() => {

    dispatch(getphotos());

  }, [dispatch])

  // Like a photo
  const handleLike = (photo) => {
    dispatch(LikePhoto(photo._id))

    resetMessage();
  }

  if (loading) {
    return <p>carregando...</p>
  }

  return (
    <div id="home">
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
          <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>Clique aqui</Link>
        </h2>
      )}
    </div>
  )
}

export default Home