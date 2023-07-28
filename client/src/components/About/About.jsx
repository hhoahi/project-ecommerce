import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import ServicesList from "./Services/ServicesList";
import Testimonial from "./Testimonial/Testimonial";
import BlogList from "./Blog/BlogList";

import { Container, Row, Col } from "reactstrap";
import ReactPlayer from "react-player";
import "./About.scss";

function About() {
  return (
    <div className="main-content">
      <div className="layout">
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

        <div className="Layout-choose-us">
          <div className="video-container">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=Szgcckuib7I"
              controls
              width="60%"
              height="520px"
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
