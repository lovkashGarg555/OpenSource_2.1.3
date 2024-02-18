import React, { useEffect, useState } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';

const Verify = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const navigate=useNavigate();
  console.log("ID from URL:", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/verify?id=${id}`);
        const result = await response.json();
        console.log(result);
        if(result.success){
          navigate('/myaccount');
          return;
        }
        else {

        }
      } catch (error) {
        console.error('Error fetching verification:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className='Verify'>
      {id ? (
        <>
          <p>You are verified</p>
          <p>ID: {id}</p>
        </>
      ) : (
        <p>No ID found in the URL</p>
      )}
    </div>
  );
};

export default Verify;
