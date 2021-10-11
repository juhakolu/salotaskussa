//Vasen Päänavigointi valikko ja Yläpalkki

import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {IoBusinessOutline} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './navbar-left.style.css';
import { IconContext } from 'react-icons';
import NavbarLeftLink from './navbar-left-link.component';
import CurrentPageInfo from '../currentpagename/currentpagename.component';
import { useLocation } from 'react-router-dom';
import TopRightLogo from '../toprightlogo/toprightlogo.component';
import middleLogo from '../../assets/pictures/etusivulogo.png';


const Navbar = (props) => {
  const [currentLoc, setCurrentLoc] = useState();
  const location = useLocation();

  //Ottaa endpointin ja muuttaa sen Nimeksi
  const convertName = (name) => {
    switch(name){
      case "/":
        return "";
        // break;
      case "/tiedotteet":
        return "Tiedotteet";
        // break;
      case "/tapahtumat":
        return "Tapahtumat";
        // break;
      case "/liveinfo":
        return "Liveinfo";
        // break;
      case "/liikuntapaikat":
        return "Liikuntapaikat";
        //break;
      case "/liikenne":
        return "Liikenne";
        // break;
      case "/retkeily":
        return "Luonto ja aktiviteetit";
        // break;
      case "/nahtavyydet":
        return "Kulttuuri ja nähtävyydet";
        // break;
      case "/ruokajajuoma":
        return "Ruoka ja juoma";
        // break;
      case "/ostokset":
        return "Ostokset";
        // break;
      case "/majoitus":
        return "Majoitus";
        // break;
      case "/kokousjajuhla":
        return "Kokous- ja juhlapalvelut";
        // break;
      case "/yritykset":
        return "Yritykset";
        // break;
      case "/kyselyt":
        return "Kyselyt";
        // break;
      case "/vikailmoitukset":
        return "Vikailmoitukset"
      case "/tietoasovelluksesta":
        return "Tietoa sovelluksesta"
      default:
        return "";
        // break;
      }
  } 

  useEffect(() => {
    let name = location.pathname;
    let newname = convertName(name);
    setCurrentLoc(newname);
  }, [location]);

  return (
    <>
      <CurrentPageInfo title={currentLoc}/>
      <IconContext.Provider value={{color: '#fff' }}>
        <div className='navbar' 
          style={{
            position: "fixed",
            width: "100%",
          }}>
          <Link to='#' className='menu-bars'>
            {props.isSidebar
            ? <AiIcons.AiOutlineClose onClick={props.toggleSidebar}/>
            : <FaIcons.FaBars onClick={props.toggleSidebar} />
            }
          </Link>
          
          <Link to="/">
            <TopRightLogo />
          </Link>

          {location.pathname === "/" ? <img src={middleLogo} style={{position: "relative", margin: "-5px auto", width: 180, right: 15}}></img> : null}
        </div>
        <nav className={props.isSidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={props.toggleSidebar}>
            {/* <li className='navbar-toggle'>
        
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose  onClick={props.toggleSidebar}/>
              </Link>
            </li> */}
            {SidebarData.map((item, index) => {
              return (
                <NavbarLeftLink key={index} item={item} index={index} />
              );
            })}
            <div className="external-link">
              <IoBusinessOutline />
              <a href="https://visitsalo.fi/yhteistyokumppaneille/#ac_visitsalo.fi+-sivusto" target="_blank">Yrittäjät, liity mukaan</a>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;