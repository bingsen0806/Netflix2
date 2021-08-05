import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import "./watch.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Watch() {
  // const location = useLocation();
  // const movie = location.movie;

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
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        autoPlay
        // progress
        controls
        className="video"
        // src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
        src={movie?.video}
        alt="cannot be played"
      ></video>
    </div>
  );
}
