import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const TouristGuideArticle = () => {
  const attractions = [
    {
      id: 1,
      name: "Freedom Trail",
      description:
        "The Freedom Trail is a 2.5-mile-long path through downtown Boston that passes by 16 locations significant to the history of the United States. This historic journey takes you through churches, burial grounds, and meeting houses, offering a glimpse into the American Revolution.",
      image: "https://source.unsplash.com/random/1600x900/?boston-freedom-trail",
    },
    {
      id: 2,
      name: "Fenway Park",
      description:
        "Fenway Park, home of the Boston Red Sox, is one of the most iconic baseball stadiums in the world. Built in 1912, it offers guided tours where you can explore the Green Monster and learn about the stadium's rich history.",
      image: "https://source.unsplash.com/random/1600x900/?fenway-park",
    },
    {
      id: 3,
      name: "Boston Common",
      description:
        "Boston Common, established in 1634, is the oldest public park in America. It's a peaceful retreat in the heart of the city, perfect for a stroll or a picnic. In winter, enjoy ice skating at the Frog Pond.",
      image: "https://source.unsplash.com/random/1600x900/?boston-common",
    },
    {
      id: 4,
      name: "Harvard Square",
      description:
        "Harvard Square, located in Cambridge, is a vibrant area filled with shops, restaurants, and street performances. It's the perfect place to explore local culture and the historic Harvard University campus.",
      image: "https://source.unsplash.com/random/1600x900/?harvard-square",
    },
  ];

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">A Tourist's Guide to Boston</h1>
      <p className="lead text-center mb-5">
        Discover the best attractions and hidden gems in Boston. From historic landmarks to scenic parks, this guide covers it all.
      </p>
      {attractions.map((attraction, index) => (
        <Row
          key={attraction.id}
          className={`align-items-center ${index % 2 === 0 ? "" : "flex-row-reverse"} mb-5`}
        >
          <Col md={6}>
            <Image
              src={attraction.image}
              alt={attraction.name}
              fluid
              rounded
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <h2>{attraction.name}</h2>
            <p>{attraction.description}</p>
            <Button variant="primary" className="mt-3">
              Learn More
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default TouristGuideArticle;