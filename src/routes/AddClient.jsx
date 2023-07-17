import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useRef, useState } from 'react';

import { toast } from 'react-toastify';
import { createClient, storage } from '../utils/firebase';

export default function AddClient() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [address, setAddress] = useState('');
  const [deposit, setDeposit] = useState('');
  const [scheme, setScheme] = useState('');
  const [avatar, setAvatar] = useState('');
  let avatarFile = useRef(null);

  const handleFileUpload = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('file', file)
      avatarFile.current = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);

    }
  };

  const resetState = () => {
    setFullname('');
    setEmail('');
    setPhone('');
    setPan('');
    setAddress('');
    setDeposit('');
    setScheme('');
    setAvatar('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a storage reference with a unique filename
    const storageRef = ref(storage, `avatars/${fullname.toLowerCase().replace(/\s/g, "")}-${avatarFile.current.name}`);

    // Upload the image file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, avatarFile.current, { contentType: avatarFile.current.type });

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('defalut cse');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        resetState()
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          // Get the download URL of the uploaded image

          const payload = {
            fullname,
            email,
            phone,
            pan,
            address,
            deposit,
            scheme,
            avatar: downloadURL
          };

          const response = await createClient(payload);
          console.log('createClient response', response)
          if (response.error) return toast(response.error, { type: 'error' })
          toast('Client Created!');

          resetState()
        });
      })
  }

  return (
    <div className='py-4' style={{ height: '100vh' }}>
      {/* header */}
      <div className='mx-4 border d-flex align-items-center justify-content-center'>
        <div style={{ fontSize: 24 }}>Add Client</div>
      </div>

      <form>
        <div className='my-4 container overflow-hidden'>
          {/* outer cols */}
          <div className="row gy-5">
            {/* left */}
            <div className="col-6">
              <div className="row gy-5 mb-4">
                <div className="col-6">
                  <label for="fullname" class="form-label">Full Name</label>
                  <input type='text' className='form-control' for='fullname' placeholder='Full Name' value={fullname} onChange={e => setFullname(e.target.value)} />
                </div>

                <div className="col-6">
                  <label for="email" class="form-label">Email address</label>
                  <input type='email' className='form-control' for='email' placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="row gy-5 mb-4">
                <div className="col-6">
                  <label for="phone" class="form-label">Phone number</label>
                  <input type="tel" className='form-control' for='phone' placeholder='Phone number' value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                <div className="col-6">
                  <label for="pan" class="form-label">PAN number</label>
                  <input type='text' className='form-control' for='pan' placeholder='PAN number' value={pan} onChange={e => setPan(e.target.value)} />
                </div>
              </div>

              <div className="gy-5 mb-4">
                <label for="address" class="form-label">Address</label>
                <textarea type="text" className='form-control' for='address' placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} />
              </div>

              <div className="row gy-5">
                <div className="col-6">
                  <label for="deposit" class="form-label">Depsoit</label>
                  <input type="text" className='form-control' for='deposit' placeholder='Deposit' value={deposit} onChange={e => setDeposit(e.target.value)} />
                </div>

                <div className="col-6">
                  <label for="scheme" class="form-label">Scheme</label>
                  <input type='text' className='form-control' for='scheme' placeholder='Scheme' value={scheme} onChange={e => setScheme(e.target.value)} />
                </div>
              </div>
            </div>
            {/* right */}
            <div className="col-6" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {/* avatar */}
              <div className="d-flex justify-content-center text-center mb-4">
                <label htmlFor="upload-input">
                  <div
                    className="rounded-circle overflow-hidden"
                    style={{
                      width: '300px',
                      height: '300px',
                    }}
                  >
                    <img
                      id="preview-image"
                      className="img-fluid rounded-circle"
                      src={avatar ? avatar : '/images/avatar-placeholder.jpg'}
                      alt="Preview Image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {!avatar && <p style={{ fontSize: 10 }} className='mt-2'>Click image to upload</p>}
                </label>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />


              </div>

              <div>
                <button className='btn btn-primary' onClick={handleSubmit} >Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
