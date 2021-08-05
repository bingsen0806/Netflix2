import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import "./newProduct.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

//TODO: Error checking for empty fields
//TODO: Duration not in Models
export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const history = useHistory();
  const { isFetching, dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "genre") {
      setMovie({ ...movie, [e.target.name]: value.toLowerCase() });
    } else {
      setMovie({ ...movie, [e.target.name]: value });
    }
  };

  const upload = (items) => {
    setIsUploading(true);
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setIsUploading(false);
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            if (uploaded === 4) {
              setIsUploading(true);
            }
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (img && imgTitle && imgSm) {
      //&& trailer && video
      upload([
        { file: img, label: "img" },
        { file: imgTitle, label: "imgTitle" },
        { file: imgSm, label: "imgSm" },
        // { file: trailer, label: "trailer" },
        // { file: video, label: "video" },
      ]);
    } else {
      alert("Please select all 5 videos and images!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const temp = {
      trailer:
        "https://firebasestorage.googleapis.com/v0/b/netflix2-e56ab.appspot.com/o/items%2F1628135146033trailer1541905617.mp4?alt=media&token=b0700633-507d-4b22-b1e2-e83e8e319ff8",
      video:
        "https://firebasestorage.googleapis.com/v0/b/netflix2-e56ab.appspot.com/o/items%2F1628135146033video1541905617.mp4?alt=media&token=64fd67bb-4387-4d8f-894c-35b717112470",
    };
    await createMovie({ ...movie, ...temp }, dispatch);
    history.push("/movies");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <select name="genre" onChange={handleChange}>
            <option disabled>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Age Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 3 ? (
          <button
            className="addProductButton"
            onClick={handleSubmit}
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Create"
            )}
          </button>
        ) : (
          <button
            className="addProductButton"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Upload"
            )}
          </button>
        )}
      </form>
    </div>
  );
}
