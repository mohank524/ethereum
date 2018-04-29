import React from 'react';
import {Menu} from 'semantic-ui-react';
import { Link } from "../routes";


export default () => {
     return (
         <Menu style={{ marginTop: '20px' }}>
             <Link route='/' >
                 <Menu.Item> <a className="Item" >CrowdCoin </a></Menu.Item>
             </Link>
             <Menu.Menu position="right">
                 <Link route='/' >
                     <Menu.Item> <a className="Item" >Campaign </a></Menu.Item>
                 </Link>
                 <Link route='/campaigns/new' >
                     <Menu.Item> <a className="Item" >+</a></Menu.Item>
                 </Link>
             </Menu.Menu>
         </Menu>
     )
}

