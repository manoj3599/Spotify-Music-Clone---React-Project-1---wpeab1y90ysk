import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Albumitem from "../List_album_artist/AlbumItem";
import ArtistItem from "../List_album_artist/ArtistItem";
import Slider from "react-slick";
import SongItem from "../List_album_artist/SongItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useUser } from "../UserProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../NavbarNavigation/Footer";

const DisplayHome = () => {
  const navigate = useNavigate();
  const [getList, setList] = useState([]);
  const [getList1, setList1] = useState([]); // For the Top 50 of this month
  const [getArtist, setArtist] = useState([]);

  const { setCurrentPlaying, setAlbumData, setArtistData } = useUser();

  // Function to fetch album data
  const AlbumSize = async () => {
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/music/album?limit=50"
      );
      setList(response.data.data);
    } catch (error) {
      console.log("Error fetching the albums:", error);
    }
  };

  const handleAlbumClick = async (albumId) => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/album/${albumId}`
      );
      setAlbumData(response.data.data);
      navigate(`/album/${albumId}`);
    } catch (error) {
      console.log("Error fetching the album:", error);
    }
  };

  //artist

  const onArtistClick = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/artist?limit=50")
      .then((response) => {
        console.log(response.data.data);
        setArtist(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleArtistClick = async (artistId) => {
    axios
      .get(`https://academics.newtonschool.co/api/v1/music/artist/${artistId}`)
      .then((response) => {
        console.log(response.data.data);
        setArtistData(response.data.data);
        navigate(`/artist/${artistId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to fetch top 50 songs of the month
  const NormalSongs = async () => {
    let queryString = {
      featured: "Top 50 of this month",
    };
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/music/song?",
        {
          params: {
            filter: JSON.stringify(queryString),
          },
        }
      );
      setList1(response.data.data);
    } catch (error) {
      console.log("Error fetching the songs:", error);
    }
  };

  const handlePlaySongs =(songs)=>{
    setCurrentPlaying(songs)
  }

  useEffect(() => {
    AlbumSize();
    NormalSongs(); // Fetch the top 50 songs when component mounts
    onArtistClick();
  }, []);

  // Slider settings for Top 50 songs
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      {/*aLBUM*/}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Songs</h1>

        <Slider {...settings}>
          {getList.map((obj, index) => (
            <div key={index} onClick={() => handleAlbumClick(obj._id)}>
              <Albumitem name={obj.title} image={obj.image} id={obj._id} />
            </div>
          ))}
        </Slider>
      </div>

      {/*ARTIST*/}

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Artist</h1>

        <Slider {...settings}>
          {getArtist.map((obj, index) => (
            <div key={index} onClick={() => handleArtistClick(obj._id)}>
              <ArtistItem name={obj.name} image={obj.image} id={obj._id} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Top 50 of this month */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Top 50 of this month</h1>
        <Slider {...settings}>
          {getList1.map((obj, index) => (
            <div key={index} onClick={()=>handlePlaySongs(obj)}>
              <SongItem name={obj.title} image={obj.thumbnail} id={obj._id} />
            </div>
          ))}
        </Slider>
      </div>
      <Footer/>
    </>
  );
};

export default DisplayHome;
