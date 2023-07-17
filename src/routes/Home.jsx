import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clientsMock = [{
  fullname: 'Manav Kasare',
  email: 'test@test.com',
  avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
  phone: '0987654321',
  pan: '12345567',
  address: '1981-84, Cappar Walan, Bank Street, Karol Bagh, Delhi, India',
  deposit: 1000,
},
{
  fullname: 'Manav Kasare',
  email: 'test@test.com',
  avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
  phone: '0987654321',
  pan: '12345567',
  address: '1981-84, Cappar Walan, Bank Street, Karol Bagh, Delhi, India',
  deposit: 1000,
},
{
  fullname: 'Manav Kasare',
  email: 'test@test.com',
  avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
  phone: '0987654321',
  pan: '12345567',
  address: '1981-84, Cappar Walan, Bank Street, Karol Bagh, Delhi, India',
  deposit: 1000,
},
{
  fullname: 'Manav Kasare',
  email: 'test@test.com',
  avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
  phone: '0987654321',
  pan: '12345567',
  address: '1981-84, Cappar Walan, Bank Street, Karol Bagh, Delhi, India',
  deposit: 1000,
}]

const ClientTile = ({ avatar, fullname, email, phone, pan, address, deposit }) => {
  const navigate = useNavigate();


  const handleNavigation = (e) => {
    e.preventDefault();

    navigate('/dataEntry')
  }

  return (
    <div className='mx-4 border d-flex flex-direction-row align-items-center p-2'>
      <div>
        <img alt={'avatar' + fullname} src={avatar} height="50" width="50" className='rounded-circle' />
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
  const [clients, setClients] = useState(clientsMock);
  const navigate = useNavigate();

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
