import React from "react";

const Profile = () => {
  // Get the user from localStorage
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  // If no user is found, show a message
  if (!user) {
    return <h1>Please log in to view your profile.</h1>;
  }

  return (
    <div className="h-screen flex justify-center items-center text-5xl bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-3xl font-semibold mb-4">Welcome, {user.name || "User"}</h1>
        <div className="text-center mb-4">
          {user.profilePic && (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <h2 className="text-xl font-medium">{user.email}</h2>
        </div>
        <div className="text-center">
          <p className="text-lg">Bio: {user.bio || "No bio available."}</p>
        </div>
        <div className="text-center">
          <p className="text-lg">Currently we are working on profile section </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
