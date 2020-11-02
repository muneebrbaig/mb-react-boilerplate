import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Popover } from "antd";
import { Link } from "react-router-dom";

import { userSignOut } from "appRedux/actions/auth.actions";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userImage } = useSelector(({ auth }) => auth);
  const logout = () => {
    dispatch(userSignOut());
    window.location = "/portal-web";
  };
  const userMenuOptions = (
    <ul className="gx-user-popover">
      {/* <li>My Profile</li>
        <li>Settings</li> */}
      <li>
        <Link to="/ChangePassword">
          <i className="reset-password" />
          Change Password
        </Link>
      </li>
      <li onClick={logout}>Logout</li>
    </ul>
  );

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="click"
    >
      <Avatar
        src={userImage || "https://via.placeholder.com/150x150"}
        className="gx-avatar gx-pointer"
        alt="..."
        // title={this.props.authUser.name}
      />
    </Popover>
  );
};
export default UserInfo;
