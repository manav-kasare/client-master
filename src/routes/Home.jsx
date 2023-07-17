import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { getClients } from '../utils/firebase';


const ClientTile = ({ id, avatar, fullname, email }) => {
  const navigate = useNavigate();


  const handleNavigation = (e) => {
    e.preventDefault();

    navigate('/dataEntry/' + id)
  }

  return (
    <div className='mx-4 border d-flex flex-direction-row align-items-center p-2'>
      <div>
        <img alt={'avatar'} src={avatar} height="50" width="50" className='rounded-circle' />
      </div>
      <div className='mx-2' style={{ flex: 1 }}>
        <div>{fullname}</div>
        <div className='text-body-secondary' style={{ fontSize: 12 }}>{email}</div>
      </div>
      <div>
        <button onClick={handleNavigation} className='btn btn-primary'>Data Entry</button>
      </div>
    </div>
  )
}

export default function Home() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const handleGetClients = async () => {
    const response = await getClients();
    console.log('response', response)
    if (!response.error) setClients(response.data)
  }

  useEffect(() => {
    handleGetClients();
  }, [])

  const renderClient = (item, index) => <ClientTile key={index} {...item} />

  const handleNavigation = (e) => {
    e.preventDefault();

    navigate('/addClient')
  }

  return (
    <div className='p-5'>
      <div>
        <button onClick={handleNavigation} className='btn btn-primary' >Add Client</button>
      </div>

      <div className='container py-4'>
        {clients.map(renderClient)}
      </div>
    </div>
  )
}
