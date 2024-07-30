import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPopups, updatePopup, Popup } from '../../api/index'; // Import your API functions
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import PopupPreview from '../../components/PopupPreview';
import { FaCopy } from 'react-icons/fa';

const PopupForm: React.FC = () => {
  const { websiteId } = useParams<{ websiteId: string }>();
  const [popupId, setPopupId] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupColor, setPopupColor] = useState('#ffffff');
  const [popupCorner, setPopupCorner] = useState('top-right');
  const [popupPublished, setPopupPublished] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState('');

  useEffect(() => {
    const loadPopup = async () => {
      try {
        const response = await fetchPopups(websiteId!);
        if (response.data.length > 0) {
          const popup = response.data[0];
          console.log(popup._id);
          setPopupId(popup._id); // Use id if available
          setPopupMessage(popup.message || '');
          setPopupColor(popup.color || '#ffffff');
          setPopupCorner(popup.corner || 'top-right');
          setPopupPublished(popup.published || false);
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      }
    };

    if (websiteId) {
      loadPopup();
      setCodeSnippet(`<script>
        (function(w, r) {
          w[r] = w[r] || function() {
            (w[r].q = w[r].q || []).push(arguments);
          };
        })(window, 'customConfig');
        
        customConfig({
          siteId: '${websiteId}'
        });
      </script>
      <!-- Main script -->
      <script src="script.js" async></script>`);
    }
  }, [websiteId]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedPopup: Popup = {
      message: popupMessage,
      color: popupColor,
      corner: popupCorner,
      user: "669af0ea9de184888dc2d2fd", // Replace with actual user ID or info
      website: websiteId!,
      published: false, // Replace with actual status if needed
    };

    try {
      const response = await updatePopup(popupId, updatedPopup);
      // Update local state with the new published status if necessary
      setPopupPublished(response.data.published || false);
    } catch (error) {
      console.error('Error updating popup:', error);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet).then(
      () => alert('Code copied to clipboard!'),
      (err) => console.error('Could not copy text: ', err)
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Form Layout" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark rounded-t-lg">
              <h3 className="font-medium text-black dark:text-white">
                Design Your Popup!
              </h3>
            </div>
            <form id="popupForm" onSubmit={handleFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Popup Message <span className="text-meta-1">*</span>
                  </label>
                  <input
                    id="popupMessage"
                    type="text"
                    placeholder="Enter your message"
                    value={popupMessage}
                    onChange={(e) => setPopupMessage(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Popup Color
                  </label>
                  <input
                    id="popupColor"
                    type="color"
                    value={popupColor}
                    onChange={(e) => setPopupColor(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Popup Corner
                  </label>
                  <select
                    id="popupCorner"
                    value={popupCorner}
                    onChange={(e) => setPopupCorner(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>

                <button
                  className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Generate Popup
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark rounded-t-lg">
              <h3 className="font-medium text-black dark:text-white">
                Popup Preview
              </h3>
            </div>
            <div
              className="flex items-center justify-center p-6.5"
              style={{ height: '200px' }}
            >
              <PopupPreview message={popupMessage} color={popupColor} />
            </div>
          </div>

          <div className={`rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${!popupPublished ? 'opacity-50' : ''}`}>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark rounded-t-lg">
              <h3 className="font-medium text-black dark:text-white">
                You're Almost Done! Paste this code in the head tag of your site.
              </h3>
            </div>
            <div className="p-6.5 relative">
              {popupPublished && <> {codeSnippet} </>}
              <button
                className="absolute bottom-4 right-4 rounded-full bg-primary p-2 text-gray hover:bg-opacity-90"
                onClick={handleCopyClick}
                disabled={!popupPublished}
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PopupForm;
