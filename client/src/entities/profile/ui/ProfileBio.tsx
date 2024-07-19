import React from 'react';
import type { Profile } from '../types/profileTypes';
import './ProfileBio.css'



type ProfileBioProps={
    isProfile: Profile
}
function ProfileBio({isProfile}: ProfileBioProps): JSX.Element {
   

return (
            <div className=' ProfileBio'>
                <div className="div-biograf">
                    <div className='div-map-bio_but'>
                        <h1>Биография</h1>
                            <div className='profile-p-div'>
                                <p className='profile-p'>{isProfile?.biography}</p>
                            </div>
                    </div>
                    <div className="div-map-bio">
                        <h1>Псевдоним</h1>
                            <div className='profile-p-div'>
                                <p className='profile-p'>{isProfile?.pseudonym}</p>
                            </div>
                    </div>
                </div>
            </div>
 );

}

export default ProfileBio;
