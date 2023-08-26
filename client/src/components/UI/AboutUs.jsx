import React from "react";
import "../../styles/AboutUs.scss";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assets/store/blog_banner_1_grande.webp";
import CountUp from "react-countup";

function AboutUs() {
  return (
    <div>
      <Container className="layout-container">
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>
                Adam Store was born in 2012, starting at a small store on Lo Duc
                Street. Adam Store in the early days was built by 3 young men,
                embracing the ambition to change Vietnamese fashion trends. With
                a passion for vests and with persistent efforts in every moment,
                Adam Store has pioneered in the fashion industry, changed
                customers' mindsets, and become the largest Vietnamese brand in
                the ready-to-wear market. Prestigious brand of European clothes
                for men.
              </p>

              <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={25} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title">Products Sold</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={12} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title">Customers</p>
                  </div>
                </div>

                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={95} duration={2} suffix="M" />
                    </span>

                    <p className="counter__title">Ideas Raised Funds</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={5} duration={2} suffix="K" />
                    </span>

                    <p className="counter__title">Categories Served</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUs;
