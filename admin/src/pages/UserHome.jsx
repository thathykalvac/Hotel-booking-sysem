import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Carousel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import { Icon, LatLngBounds } from "leaflet";
import { motion } from "framer-motion";

import "../Styles/UserHome.scss";
import "leaflet/dist/leaflet.css";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";

import h6 from "../images/h6.jpg";
import h5 from "../images/h5.jpeg";
import h7 from "../images/h7.jpg";
import boston from "../images/boston.avif";

// Custom icons for map markers
const icons = {
  default: new Icon({
    iconUrl: "https://via.placeholder.com/38",
    iconSize: [38, 38],
  }),
  city: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
  }),
  park: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
    iconSize: [38, 38],
  }),
  history: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3347/3347485.png",
    iconSize: [38, 38],
  }),
};

// Famous places in Boston
const markers = [
  { geocode: [42.3601, -71.0589], popUp: "Boston City Center", type: "city" },
  { geocode: [42.3554, -71.0656], popUp: "Boston Common", type: "park" },
  { geocode: [42.3467, -71.0972], popUp: "Fenway Park", type: "history" },
];

// Top hotels in Boston
const hotels = [
  { geocode: [42.3519, -71.0775], popUp: "Fairmont Copley Plaza", type: "city" },
  { geocode: [42.3512, -71.0674], popUp: "Boston Marriott Copley", type: "city" },
];

const promotions = [
  { id: 1, image: h6 },
  { id: 2, image: h5 },
  { id: 3, image: h7 },
];

// Combine all map markers
const allMarkers = [...markers, ...hotels];

// Fit map bounds
function FitToBounds({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = new LatLngBounds(markers.map((marker) => marker.geocode));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero-section text-white text-center py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${boston})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="display-4 fw-bold mb-4">Welcome to LivinBoston</h1>
        <p className="lead mb-4">Experience luxury and comfort in the heart of Boston</p>
        <Button
          variant="primary"
          size="lg"
          className="px-5 py-3 fw-bold"
          onClick={() => navigate("/user/bookings")}
        >
          Book Now
        </Button>
      </motion.div>

      {/* Promotions Section */}
      <Container className="my-5">
        <Carousel className="mb-5 shadow-lg rounded">
          {promotions.map((promo) => (
            <Carousel.Item key={promo.id}>
              <img
                className="d-block w-100"
                src={promo.image}
                alt={`Promotion ${promo.id}`}
                style={{ height: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3 className="display-6 fw-bold">Exclusive Offer</h3>
                <p className="lead">Limited time promotion. Book now!</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Map Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Explore Boston</h2>
        <div className="map-container shadow-lg rounded">
          <MapContainer
            center={[42.3601, -71.0589]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FitToBounds markers={allMarkers} />
            <MarkerClusterGroup chunkedLoading>
              {allMarkers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.geocode}
                  icon={icons[marker.type] || icons.default}
                >
                  <Popup>
                    <strong>{marker.popUp}</strong>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </Container>

      {/* Featured Amenities */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Featured Amenities</h2>
        <Row className="g-4">
          {['Spa & Wellness', 'Fine Dining', 'Fitness Center', 'Concierge Service'].map((amenity, index) => (
            <Col key={index} md={3}>
              <motion.div 
                className="bg-light p-4 text-center rounded shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h5>{amenity}</h5>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;