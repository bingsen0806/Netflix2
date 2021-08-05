import { Link, useLocation, useParams } from "react-router-dom";
import "./list.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const location = useLocation();
  const list = location.list;

  //TODO: Implement API to get List by ID and use ID instead of location
  // const { movieId } = useParams();
  // const [movie, setMovie] = useState(null);

  // useEffect(() => {
  //   const getMovie = async () => {
  //     try {
  //       if (movieId && movieId !== "") {
  //         const res = await axios.get("/movies/find/" + movieId, {
  //           headers: {
  //             token:
  //               "Bearer " +
  //               JSON.parse(localStorage.getItem("user")).accessToken,
  //           },
  //         });
  //         setMovie(res.data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getMovie();
  // }, [movieId]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list?.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list?.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input type="text" placeholder={list?.title} />
            <label>Type</label>
            <input type="text" placeholder={list?.type} />
            <label>Genre</label>
            <input type="text" placeholder={list?.genre} />
          </div>
          <div className="productFormRight">
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
