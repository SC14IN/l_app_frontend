import React from 'react';
const SideNav = (props) => {
    return (
    <div className='sidenav'>
        <a href='/register'>Dashboard</a>
        <a href='/login'>Tasks</a>
        <a href='/'>Users</a>
    </div> );
 };
 export default SideNav;