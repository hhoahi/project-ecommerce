import React from "react";
import AboutUs from "../components/UI/AboutUs";
import ServicesList from "../components/UI/ServicesList";
import Testimonial from "../components/UI/Testimonial";
import BlogList from "../components/UI/BlogList";

import { Container, Row, Col } from "reactstrap";
import ReactPlayer from "react-player";
import "../styles/About.scss";

function About() {
  return (
    <div className="main-home">
      <div className="layout">
        <div className="banner">
          <p>Home/Introduction</p>
          <h2>ADAMSTORE ABOUT</h2>
        </div>

        <div className="layout-about-us">
          <AboutUs />
        </div>

        <div className="layout-service">
          <div className="service-container">
            <Container>
              <Row>
                <Col lg="12" className="mb-4 text-center">
                  <h6 className="section__subtitle">See our</h6>
                  <h2 className="section__title">Popular Services</h2>
                </Col>
                <ServicesList />
              </Row>
            </Container>
          </div>
        </div>

        <div className="layout-choose-us">
          <h6 className="section__subtitle">ADAM STORE</h6>
          <h2 className="section__title">ADAM STORE I THE BEAT OF SEOUL</h2>
          <div className="video-container">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=7euAFwjg0-Q"
              controls
              playing
              loop
              width="80%"
              height="100%"
            />
          </div>
        </div>

        <div className="Layout-testimonial">
          <Container>
            <Row>
              <Col lg="12" className="mb-4 text-center">
                <h6 className="section__subtitle">Our clients says</h6>
                <h2 className="section__title">Testimonials</h2>

                <Testimonial />
              </Col>
            </Row>
          </Container>
        </div>

        <div className="Layout-blog">
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">Explore our blogs</h6>
                <h2 className="section__title">Latest Blogs</h2>
              </Col>
              <BlogList />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default About;
