import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../app/features/userSlice";
const MainHeader = ({ user }) => {
  const [showMoreSetting, setShowMoreSetting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout(user._id));
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/lesus");
    }
  };
  console.log(user);

  return (
    <div className="user-header">
      <div className="logo">
        <img src="/images/logo.svg" alt="Logo" />
        <p>LESUS</p>
      </div>

      {/* put uri in the "to" attr of Link */}
      <div className="navigation">
        <Link>Home</Link>
        <Link>Shop</Link>
        <Link>Cart</Link>
        {!user._id && <Link to={"/lesus"}>Login</Link>}
        {user?._id && (
          <div className="icon">
            <img
              src="/images/user-icon.png"
              alt="User"
              onClick={() => setShowMoreSetting(!showMoreSetting)}
            />
            <img
              src="/images/down.png"
              alt="Arrow"
              id="down-arrow"
              onClick={() => setShowMoreSetting(!showMoreSetting)}
            />

            {showMoreSetting && (
              <div className="settings">
                <Link>
                  <img src="/images/profile.png" alt="Logout" />
                  <p>{user.username}</p>
                </Link>
                <span onClick={handleLogout}>
                  <img src="/images/logout.png" alt="Logout" />
                  <p>Logout</p>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
