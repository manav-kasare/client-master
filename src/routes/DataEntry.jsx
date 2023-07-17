import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getClient, updateClient } from '../utils/firebase';

export default function DataEntry({ }) {
  let { id } = useParams();
  const [client, setClient] = useState({});

  const [scriptCode, setScriptCode] = useState('');
  const [buySell, setBuySell] = useState('');
  const [fAndO, setFAndO] = useState('');
  const [optionType, setOptionType] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [tradePrice, setTradePrice] = useState('');

  const handleGetClient = async () => {
    const response = await getClient(id);
    console.log('response', response)
    if (!response.error) setClient(response.data)
    if (response.data.tradeDetails) {
      const tradeDetails = response.data.tradeDetails;
      setScriptCode(tradeDetails.scriptCode)
      setBuySell(tradeDetails.buySell)
      setFAndO(tradeDetails.fAndO)
      setOptionType(tradeDetails.optionType)
      setStrikePrice(tradeDetails.strikePrice)
      setTradePrice(tradeDetails.tradePrice)
    }
  }

  useEffect(() => {
    handleGetClient();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      tradeDetails: {
        scriptCode,
        buySell,
        fAndO,
        optionType,
        strikePrice,
        tradePrice
      }
    }

    const response = await updateClient(id, payload)
    if (response.error) return toast(response.error, { type: 'error' });
    return toast('Updated Trade Details!');
  }

  return (
    <div className='py-4' style={{ height: '100vh' }}>
      {/* header */}
      <div className='mx-4 border d-flex align-items-center justify-content-center'>
        <div style={{ fontSize: 24 }}>Data Entry</div>
      </div>

      {/* client details */}
      <div className='my-4' style={{ arginTop: '4vw', }}>
        {/* small header */}
        <div className='mx-4 border d-flex align-items-center justify-content-center'>
          <div style={{ fontSize: 14 }}>Client Details</div>
        </div>

        {/* client details */}
        <div className='m-4 p-2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img alt={'avatar'} src={client.avatar} height="150" width="150" className='rounded-circle' />
            <div>{client.fullname}</div>
            <div className='text-body-secondary' style={{ fontSize: 12 }}>{client.email}</div>
          </div>

          <div>
            <div className='row gx-5'>
              <div className='col' >
                <div className='text-body-secondary'>Address</div>
                <div>{client.address}</div>
              </div>

              <div className='col' >
                <div className='text-body-secondary'>Phone number</div>
                <div>{client.phone}</div>
              </div>
            </div>

            <div className='row gx-5'>
              <div className='col' >
                <div className='text-body-secondary'>PAN number</div>
                <div>{client.pan}</div>
              </div>

              <div className='col'>
                <div className='text-body-secondary'>Deposit</div>
                <div>{client.deposit}</div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* trade details */}
      <form>
        <div className='mx-4' style={{ marginTop: '4vw', }}>
          <div className='border d-flex align-items-center justify-content-center'>
            <div style={{ fontSize: 14 }}>Trade Details</div>
          </div>

          <div className='row gx-5 my-3'>
            <div className='col'>
              <input type='text' className='form-control' for='scriptCode' placeholder='Script Code(ID)' value={scriptCode} onChange={e => setScriptCode(e.target.value)} />
            </div>
            <div className='col'>
              <input type='text' className='form-control' for='buySell' placeholder='Buy/Sell' value={buySell} onChange={e => setBuySell(e.target.value)} />
            </div>
            <div className='col'>
              <input type='text' className='form-control' for='fAndO' placeholder='F&O' value={fAndO} onChange={e => setFAndO(e.target.value)} />
            </div>
          </div>

          <div className='row gx-5'>
            <div className='col'>
              <select
                id="typeSelect"
                className="form-select"
                value={optionType}
                onChange={e => setOptionType(e.target.value)}
              >
                <option className='text-body-secondary' value="">Option Type</option>
                <option value="CE">CE</option>
                <option value="PE">PE</option>
              </select>
            </div>
            <div className='col'>
              <input type='text' className='form-control' for='strikePrice' placeholder='Strike Price' value={strikePrice} onChange={e => setStrikePrice(e.target.value)} />
            </div>
            <div className='col'>
              <input type='text' className='form-control' for='tradePrice' placeholder='Trade Price' value={tradePrice} onChange={e => setTradePrice(e.target.value)} />
            </div>

            <div className='mt-4'>
              <button className='btn btn-primary' onClick={handleSubmit} >Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
