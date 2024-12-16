import React from "react";
import BookSocialTitle from "../components/BookSocialTitle";
import userImage from "../assets/no_image_available.png";

const WelcomeSection = ({ profile }) => {
    return (
        <div
            style={{
                width: "100%", // Mantener el 100% para responsividad
                maxWidth: "1480px", // Limitar el ancho máximo
                textAlign: "center",
                padding: "30px 20px",
                color: "white",
                margin: "30px auto", // Centrar horizontalmente
                position: "relative",
            }}
        >

            {/* Contenido principal */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    gap: "10px",
                }}
            >
                <img
                    src={localStorage.getItem("profileImage") || userImage}
                    alt="User Avatar"
                    style={{
                        width: "90px",
                        height: "90px",
                        marginBottom: "15px",
                        borderRadius: "50%",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                />
                <BookSocialTitle
                    level={1}
                    text={`Welcome, ${profile.name}`}
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        color: "#FFD700", // Color dorado para destacar
                    }}
                />
            </div>
        </div>
    );
};

export default WelcomeSection;
