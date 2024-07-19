import React from 'react';
import type { Profile } from '../types/profileTypes';
import './ProfileMyAdress.css'

type ProfileMyAdressProps={
    isProfile: Profile
}
function ProfileMyAdress({isProfile}: ProfileMyAdressProps): JSX.Element {
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
export default ProfileMyAdress
