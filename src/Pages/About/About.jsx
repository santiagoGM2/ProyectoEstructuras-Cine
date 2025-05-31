import React from "react";
import './About.css'

import Imga from "../../assets/Imagensota.png";

export const About = () => {
    const teamMembers = [
        {
            name: "David Penagos",
            role: "Desarrollador De Proyectos A Ultima Hora",
            description: "23 horas, youtube, una bendicion y esta hecho",
            image: Imga,
        },
    ];

    return (
        <div className="about-container">
            <h1>About Me</h1>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <img src={member.image} alt={member.name} className="team-member-image" />
                        <h2>{member.name}</h2>
                        <h3>{member.role}</h3>
                        <p>{member.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
