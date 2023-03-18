import React from "react";
import "../AboutUs/AboutUs.css";
import { Container, Card, CardMedia, Typography, Link } from "@mui/material";

const AboutUs = () => {
  return (
    <>
      <div className="about-section">
        <h1 style={{ marginBottom: 20 + "px" }}>About Us</h1>
        <p>Get to know the team behind this page</p>
        <p>
          So far it's only me, the admin, running the site but as the community
          grows I'd like to incorporate more people
        </p>
      </div>
      <Container maxWidth="lg" className="aboutUs-container">
        <Card className="aboutUs-card">
          <CardMedia
            className="aboutUs-pic mb-3"
            component="img"
            src="https://ae01.alicdn.com/kf/S94b76572c70c4d0a946f82fd270ee517T/Stray-Kids-Bang-Chan-Avatar-Persona-Soft-Button-Pin-Customizable-Women-Gift-Metal-Lapel-Pin-Cartoon.jpg_Q90.jpg_.webp"
            alt="placeholder image"
          />
          <Typography variant="h4" className="aboutUs-titles mb-3">
            Mauricio Segovia
          </Typography>
          <Typography variant="body1" className="aboutUs-text mb-3">
            <ul>
              <li>Paraguayan with big dreams</li>
              <li>Student of Computer Systems Analysis</li>
              <li>Full Stack MERN developer.</li>
              <li>Fall Guys aficionado</li>
            </ul>
          </Typography>
          <div className="links-container">
            <Link href="https://github.com/segmauricio" underline="hover">
              <img
                src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
                width={30 + "px"}
              />
            </Link>
            <Link href="#" underline="hover">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png"
                width={30 + "px"}
              />
            </Link>
            <Link
              href="https://www.last.fm/user/HateRagePain"
              underline="hover"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1051/1051265.png"
                width={30 + "px"}
              />
            </Link>
            <Link
              href="https://open.spotify.com/user/hqdtmwg3xvlmz2qvai3w4his3"
              underline="hover"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png"
                width={30 + "px"}
              />
            </Link>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default AboutUs;
