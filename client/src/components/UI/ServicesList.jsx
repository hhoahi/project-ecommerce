import React from "react";
import { Row, Col } from "reactstrap";
import "../../styles/ServicesList.scss";
import servicesData from "../../assets/data/serviceData";

const ServiceItem = ({ item }) => (
  <Col lg="3" md="4" sm="12" className="mb-3">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <i className={item.icon} />
      </span>
      <h6>{item.title}</h6>
      <p className="section__description">{item.desc}</p>
    </div>
  </Col>
);

function ServicesList() {
  return (
    <Row>
      {servicesData.map((item) => (
        <ServiceItem item={item} key={item.id} />
      ))}
    </Row>
  );
}

export default ServicesList;
