// import MenuIcon from "@material-ui/icons/Menu";

import { IconButton } from "@material-ui/core";

// import { FaWpforms } from "react-icons/fa";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
// import AppsIcon from "@material-ui/icons/Apps";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "../drawer/Drawer";
import avatarimage from "../../images/avatar.jpg";
// import avatarimage from "./2.jpg"
// import TemporaryDrawer from "./Drawer"
// import formimage from "./forms_2020q4_48dp.png"
// import PollTwoToneIcon from "@material-ui/icons/PollTwoTone";
function Header() {
  return (
    <div className="header">
      <div className="header_info">
        {/* <IconButton>
          <MenuIcon />
        </IconButton> */}
        <Drawer />

        {/* <PollTwoToneIcon className="sheet" /> */}
        <i className="fa-regular fa-file-lines sheet"></i>
        {/* <FaWpforms className="sheet" /> */}

        {/* <TemporaryDrawer />
        <img
            src={formimage}
          style={{ height: "40px", width: "40px" }}
          className="form_image"
        />
        <div className="info">Forms</div> */}
      </div>

      <div className="header_search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder="Search" className="search" />
      </div>

      <div className="header_right">
        {/* <IconButton style={{ margin: "0px" }}>
          <AppsIcon style={{ fontSize: "22px" }} />
        </IconButton> */}

        <IconButton>
          <Avatar style={{ height: "30px", width: "30px" }} src={avatarimage} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
