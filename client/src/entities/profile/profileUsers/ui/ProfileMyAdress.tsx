import React from 'react';

import './ProfileMyAdress.css'
import { Profile } from '../../types/profileTypes';

type ProfileMyAdressProps={
    isProfile: Profile
}
const ProfileUserAdress = ({isProfile}: ProfileMyAdressProps): JSX.Element =>{
return (
<div className=' ProfileMyAdress'>
    <h1 style={{marginTop: '50px'}}>Контактные данные</h1>
    <div className='colort'>
        <p>Номер: {isProfile.conDan}</p>
        <p>Роль: {isProfile.activity}</p>
    </div>
 </div>
 );

}
export default ProfileUserAdress
