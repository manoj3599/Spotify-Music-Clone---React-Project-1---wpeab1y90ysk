import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios'; // Import axios
import Albumitem from './AlbumItem';

const DisplayHome = () => {
  const [getList, setList] = useState([]);
  const [getList1, setList1] = useState([]);

  // Function to fetch song data from the API
  const listOfDetails = async () => {
    try {
      const response = await axios.get('https://academics.newtonschool.co/api/v1/music/song');
      // Check if the API response structure is correct
      if (response.data && Array.isArray(response.data.data)) {
        setList(response.data.data); // Update state with fetched data
      } else {
        console.error('Unexpected API response structure:', response.data);
      }
    } catch (error) {
      console.log('Error fetching the songs:', error);
    }
  };

  // Fetch the song list when the component mounts
  useEffect(() => {
    listOfDetails();
  }, []);


  //sONGS

  const onFilterSelection = async ()=>{
    let queryString = {
      featured: "Top 50 of this month"
    }
    axios.get("https://academics.newtonschool.co/api/v1/music/song?", {
      params: {
        filter: JSON.stringify(queryString),
      }
    }).then((response)=>{
      setList1(response.data.data)
    }).catch((error)=>{
      console.log(error)
    })

  }

  useEffect(() => {
    onFilterSelection();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Songs</h1>
        <div className="flex overflow-auto">
           {
            getList.map((obj,index) => (
              <Albumitem key={index}
                name={obj.title}
                image={obj.thumbnail}
              />
            ))
           }
        </div>
      </div>



      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Top 50 of this month</h1>
        <div className="flex overflow-auto">
           {
            getList1.map((obj,index) => (
              <Albumitem key={index}
                name={obj.title}
                image={obj.thumbnail}
              />
            ))
           }
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
