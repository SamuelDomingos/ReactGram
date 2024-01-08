import "./Search.css"

//hooks
import { useEffect } from "react"
import {useSelector, useDispatch} from "react-redux";
import {useResetComponentMessage} from "../../hooks/useResetCompontentMessage"
import {useQuery} from "../../hooks/useQuery"

//Components
import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"
import { Link } from "react-router-dom";

//redux
import { searchPhotos, LikePhoto } from "../../slices/photoSlice";

const Search = () => {
    const query = useQuery();
    const search = query.get("q")

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage();

    const {user} = useSelector(state => state.auth)
    const {photos, loading} = useSelector((state) => state.photo)

    // Loading photos
    useEffect(() => {

        dispatch(searchPhotos(search))

    }, [dispatch, search])

    // Like a photo
    const handleLike = (photo) => {
        dispatch(LikePhoto(photo._id))

        resetMessage();
    }

    if (loading) {
        return <p>carregando...</p>
    }


  return (
    <div id="search">
        <h2>Voce está buscando por: {search}</h2>
        {photos && Array.isArray(photos) && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
          <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram encontradas resultados para sua busca...
        </h2>
      )}
    </div>
  )
}

export default Search