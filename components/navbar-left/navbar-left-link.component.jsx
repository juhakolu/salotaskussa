//Yksittäinen Linkki Vasemmassa Nav päävalikossa

import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const NavbarLeftLink = ({index, item}) => {
  return (
    <li key={index} className={item.cName}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </li>
  )
}

export default withRouter(NavbarLeftLink);
