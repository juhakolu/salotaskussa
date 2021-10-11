//Vasemman navigointivalikon nimet, pathit ja iconit

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io5';
import * as FiIcons from 'react-icons/fi';

export const SidebarData = [
  {
    title: 'Etusivu',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Tiedotteet',
    path: '/tiedotteet',
    icon: <AiIcons.AiOutlineInfoCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Tapahtumat',
    path: '/tapahtumat',
    icon: <BiIcons.BiCalendarEvent />,
    cName: 'nav-text'
  },
  // {
  //   title: 'LiveInfo',
  //   path: '/liveinfo',
  //   icon: <RiIcons.RiLiveLine />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Liikenne',
    path: '/liikenne',
    icon: <FaIcons.FaCarSide />,
    cName: 'nav-text'
  },
  {
    title: 'Liikuntapaikat',
    path: '/liikuntapaikat',
    icon: <BiIcons.BiFootball />,
    cName: 'nav-text'
  },
  {
    title: 'Luonto ja aktiviteetit',
    path: '/retkeily',
    icon: <FaIcons.FaCampground />,
    cName: 'nav-text'
  },
  {
    title: 'Kulttuuri ja nähtävyydet',
    path: '/nahtavyydet',
    icon: <AiIcons.AiOutlineEye />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Yritykset',
  //   path: '/yritykset',
  //   icon: <GiIcons.GiFactory />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Ruoka ja juoma',
    path: '/ruokajajuoma',
    icon: <IoIcons.IoFastFoodOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Ostokset',
    path: '/ostokset',
    icon: <FiIcons.FiShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Majoitus',
    path: '/majoitus',
    icon: <BiIcons.BiHotel />,
    cName: 'nav-text'
  },
  {
    title: 'Kokous- ja juhlapalvelut',
    path: '/kokousjajuhla',
    icon: <GiIcons.GiFactory />,
    cName: 'nav-text'
  },
  {
    title: 'Kyselyt',
    path: '/kyselyt',
    icon: <AiIcons.AiOutlineQuestionCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Vikailmoitukset',
    path: '/vikailmoitukset',
    icon: <AiIcons.AiOutlineWarning />,
    cName: 'nav-text'
  },
  {
    title: 'Tietoa sovelluksesta',
    path: '/tietoasovelluksesta',
    icon: <AiIcons.AiOutlineInfoCircle />,
    cName: 'nav-text'
  },

];