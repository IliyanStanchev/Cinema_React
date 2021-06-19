import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as DiIcons from 'react-icons/di';
import { TiTicket } from "react-icons/ti";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { BiCameraMovie } from 'react-icons/bi';
import { GiDramaMasks }   from 'react-icons/gi';
import { MdEventSeat }    from 'react-icons/md';
import { Gi3DGlasses }    from 'react-icons/gi';




export const SidebarData = [
  {
    title: 'My Profile',
    path: '/admin/profile',
    icon: <IoIcons.IoMdPerson />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Producers',
    path: '/admin/producers',
    icon: <DiIcons.DiYeoman />,
    cName: 'nav-text'
  },
  {
    title: 'Tickets',
    path: '/admin/tickets',
    icon: <TiTicket />,
    cName: 'nav-text'
  },
  {
    title: 'Showtimes',
    path: '/admin/showtimes',
    icon: <BsFillCollectionPlayFill />,
    cName: 'nav-text'
  },
  {
    title: 'Movies',
    path: '/admin/movies',
    icon: <BiCameraMovie/>,
    cName: 'nav-text'
  },
  {
    title: 'Genres',
    path: '/admin/genres',
    icon: <GiDramaMasks />,
    cName: 'nav-text'
  },
  {
    title: 'Halls',
    path: '/admin/halls',
    icon: <MdEventSeat />,
    cName: 'nav-text'
  },
  {
    title: 'Movie types',
    path: '/admin/types',
    icon: <Gi3DGlasses />,
    cName: 'nav-text'
  },
 
];
