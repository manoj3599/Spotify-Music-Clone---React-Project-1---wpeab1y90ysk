import React from 'react';
import Navbar from '../Components/Navbar';
import SongItem from '../List_album_artist/SongItem';
import { useEffect, useState } from "react";
import { useUser } from '../UserProvider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'; // Make sure to import axios
import Footer from '../NavbarNavigation/Footer';

const DisplaySongs = () => {
  const [getSongs, setSongs] = useState([]);
  const [getList1, setList1] = useState([]); // For the Top 50 of this month
  const [getList2, setList2] = useState([]); // For the Top 20 of this week
  const { setCurrentPlaying } = useUser();

  const allSongs = async () =>{
    axios.get("https://academics.newtonschool.co/api/v1/music/song").then((response)=>{
      setSongs(response.data.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

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

  const Top20 = async () => {
    let queryString = {
      featured: "Top 20 of this week",
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
      setList2(response.data.data);
    } catch (error) {
      console.log("Error fetching the songs:", error);
    }
  };

  const handlePlaySongs = (songs) => {
    setCurrentPlaying(songs);
  };

  useEffect(() => {
    NormalSongs(); // Fetch the top 50 songs when component mounts
    allSongs()
    Top20()
  }, []);

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

      {/*normal Songs*/ }
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">All Songs</h1>
        <Slider {...settings}>
          {getSongs.map((obj, index) => (
            <div key={index} onClick={() => handlePlaySongs(obj)}>
              <SongItem name={obj.title} image={obj.thumbnail} id={obj._id} />
            </div>
          ))}
        </Slider>
      </div>


      {/*top 50 songs*/}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Top 50 of this month</h1>
        <Slider {...settings}>
          {getList1.map((obj, index) => (
            <div key={index} onClick={() => handlePlaySongs(obj)}>
              <SongItem name={obj.title} image={obj.thumbnail} id={obj._id} />
            </div>
          ))}
        </Slider>
      </div>

       {/*top 20 songs*/}
       <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Top 20 of this week</h1>
        <Slider {...settings}>
          {getList2.map((obj, index) => (
            <div key={index} onClick={() => handlePlaySongs(obj)}>
              <SongItem name={obj.title} image={obj.thumbnail} id={obj._id} />
            </div>
          ))}
        </Slider>
      </div>

      <Footer/>
    </>
  );
};

export default DisplaySongs;
