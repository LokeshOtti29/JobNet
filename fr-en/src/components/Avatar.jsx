// Avatar.js
import React from "react";

function Avatar({ name, imageUrl, size = 50 }) {
  // Function to get initials from the name
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className="avatar cursor-pointer"
      style={{
        width: size,
        height: size,
        cursor: "pointer",
        position: "relative",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#6c757d", // Fallback background color if image is not available
      }}
    >
      {/* Conditionally render the image or initials */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="User Avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          className="avatar-initials"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            color: "white",
            fontSize: "1.2rem",
          }}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}

export default Avatar;
