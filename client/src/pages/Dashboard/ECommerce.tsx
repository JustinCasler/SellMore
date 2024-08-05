import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardDataStats from '../../components/SiteCard';
import DefaultLayout from '../../layout/DefaultLayout';
import CreateSiteCard from '../../components/CreateSiteCard';
import { fetchSites, postUser, Site } from '../../api/index';

const ECommerce: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSites = async () => {
      try {
        const response = await fetchSites();
        const sitesData: Site[] = response.data.map((site: any) => ({
          name: site.name,
          url: site.url,
          user: site.user,
          id: site._id 
        }));
        setSites(sitesData);
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    getSites();
  }, []);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      showError("Please make sure passwords match.");
      return;
    }

    try {
      const newUser = {
        name: `${firstName} ${lastName}`,
        email,
        password
      };
      const result = await postUser(newUser);
      if (result.data.token) {
        localStorage.setItem("profile", JSON.stringify({ ...result.data }));
        localStorage.setItem("isLoggedIn", "true");
        setRedirect(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Email is already taken"
      ) {
        showError("Email is already taken");
      } else {
        showError("Something went wrong. Please try again.");
      }
    }
  };

  if (redirect) {
    // Redirect logic here (e.g., using react-router)
  }

  return (
    <DefaultLayout>
      <div className="relative">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5" style={{ marginRight: '25%' }}>
          {sites.map((site) => (
            <Link to={`/create-popup/${site.id}`} key={site.id}>
              <CardDataStats title={site.name} stat="# of users this week" rate="110">
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                    fill=""
                  />
                  <path
                    d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </Link>
          ))}
        </div>
        <div className="fixed top-21 right-1 h-full w-1/4 p-6">
          <CreateSiteCard/>
        </div>
        <div className="signup-form">
          <h2>Signup</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
