// import React from 'react';

// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';


//     function NavBar()
//     {
//         return (
//             <SideNav
//                 onSelect={(selected) => {
//                     // Add your code here
//                 }}>
//                 <SideNav.Toggle />
//                 <SideNav.Nav defaultSelected="home">
//                     <NavItem eventKey="home">
//                         <NavIcon>
//                             <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
//                         </NavIcon>
//                         <NavText>
//                             Home
//                         </NavText>
//                     </NavItem>
//                     <NavItem eventKey="charts">
//                         <NavIcon>
//                             <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
//                         </NavIcon>
//                         <NavText>
//                             Charts
//                         </NavText>
//                         <NavItem eventKey="charts/linechart">
//                             <NavText>
//                                 Line Chart
//                             </NavText>
//                         </NavItem>
//                         <NavItem eventKey="charts/barchart">
//                             <NavText>
//                                 Bar Chart
//                             </NavText>
//                         </NavItem>
//                     </NavItem>
//                 </SideNav.Nav>
//             </SideNav>

//         );
//     }


//  export default NavBar;
import React from 'react';
const SideNav = (props) => {
    return (
    <div className='sidenav'>
        <a href='/dashboard'>Dashboard</a><br></br>
        <a href='/login'>Tasks</a><br></br>
        <a href='/'>Users</a><br></br>
    </div> );
 };
 export default SideNav;