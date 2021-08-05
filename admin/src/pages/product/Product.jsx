import { Link, useLocation, useParams } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Product() {
  // const location = useLocation();
  // const movie2 = location.movie2;

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        if (movieId && movieId !== "") {
          const res = await axios.get("/movies/find/" + movieId, {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          setMovie(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie?.img} alt="" className="productInfoImg" />
            <span className="productName">{movie?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie?.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie?.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie?.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie?.title} />
            <label>Year</label>
            <input type="text" placeholder={movie?.year} />
            <label>Genre</label>
            <input type="text" placeholder={movie?.genre} />
            <label>Limit</label>
            <input type="text" placeholder={movie?.limit} />
            <label>Duration</label>
            <input type="text" placeholder={movie?.duration} />
            <label>Trailer</label>
            <input type="file" placeholder={movie?.trailer} />
            <label>Video</label>
            <input type="file" placeholder={movie?.video} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie?.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
