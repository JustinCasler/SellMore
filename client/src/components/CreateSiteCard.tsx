import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSite, createPopup } from '../api/index'; // Adjust the path to your API file

const CardCreateSite: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateSite = async () => {
    const userId = '669af0ea9de184888dc2d2fd';
    const newSite = {
      name,
      url,
      user: userId,
    };

    try {
      const siteResponse = await createSite(newSite);
      console.log(siteResponse)
      const siteId = siteResponse.data._id;
      console.log('siteId, ', siteId)

      if (!siteId) {
        throw new Error('Failed to retrieve site ID.');
      }

      const newPopup = {
        message: "",
        color: "",
        corner: "",
        user: userId,
        website: siteId,
        published: false
      };

      const popupResponse = await createPopup(newPopup);
      console.log('Site created successfully:', siteResponse.data);
      console.log('Popup created successfully:', popupResponse.data);
      navigate(`/create-popup/${siteId}`); // Navigate to the new site's page or another appropriate route
    } catch (error) {
      console.error('Error creating site or popup:', error);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-lg border border-stroke bg-white py-6 px-4 shadow-default dark:border-strokedark dark:bg-boxdark h-96">  {/* Adjusted height */}
      <h3 className="text-title-md font-bold text-black dark:text-white mb-4">Create New Site</h3>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Name <span className="text-meta-1">*</span>
        </label>
        <input
          type="text"
          value={name}
          placeholder="Enter your companies name"
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <div>
        <div className="mb-4">
          <label className="mb-2.5 block text-black dark:text-white">
            URL <span className="text-meta-1">*</span>
            </label>
          <input
            type="text"
            value={url}
            placeholder="Paste the link to your site"
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
      <button
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        onClick={handleCreateSite}
      >
        Create New Site
      </button>
    </div>
  );
};

export default CardCreateSite;