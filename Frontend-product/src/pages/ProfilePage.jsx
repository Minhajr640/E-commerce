import ProfileC from "../components/profile/ProfileC"

function ProfilePage({profile, refreshProfile}) {

    return (
        <>
        <ProfileC profile={profile} refreshProfile={refreshProfile}/>
        </>
    )
}
export default ProfilePage