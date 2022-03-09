import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "bootstrap-4-react";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const title = {
  fontSize: "35px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "center",
  textTransform: "capitalize",
  overflow: "hidden",
};
const shape = {
  position: "absolute",
  width: "150px",
  top: ".5rem",
  left: ".5rem",
};
const contentCenter = {
  height: "100vh",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};
const cs = {
  width: "25rem",
  border: "0px",
  margin: "25px",
  borderRadius: "10px",
  boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
  background: " rgba(255, 255, 255, .7)",
  backdropFilter: "blur(10px)",
};
export default function Cardc() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Surat");
  
  useEffect(() => {
    /// ASYNC Await Using API Call
    // const fetchApi = async ()=> {
    //   const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b36d38b366e62b7ce3c598f283b78a2b`);
    //   const fres = await res.json();
    //   console.log(fres);
    //   setCity(fres.main);
    // };
    // fetchApi();

    /// by Using fetch() API Call

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b36d38b366e62b7ce3c598f283b78a2b`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setCity(result.main);
        },
        (error) => {
          setCity(null);
        }
      );
  }, [search]);

  return (
    <>
      <Container style={contentCenter}>
        <div>
          <Row>
            <Col style={{ textAlign: "center" }} col="4" alignSelf="center">
              <Card display="inline-block" align="top" mr="3" style={cs}>
                <Card.Header style={{ borderBottom: "0px" }}>
                  <Form.LabelCol htmlFor="search">
                    Search City Here
                  </Form.LabelCol>
                  <Form.Input
                    type="text"
                    value={search}
                    autoComplete="off"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    autoFocus
                    placeholder="Enter City"
                    id="search"
                  />
                </Card.Header>
                <Card.Body>
                  {!city ? (
                    <Card.Text style={title}>No Data Found</Card.Text>
                  ) : (
                    <>
                      <Card.Text style={title}>
                        <WbSunnyIcon /> {search}
                      </Card.Text>
                      <Card.Text>
                        <Button danger outline>
                          <WbSunnyIcon /> {city.temp} °C
                        </Button>
                      </Card.Text>
                      <Card.Text
                        style={{
                          justifyContent: "space-around",
                          display: "flex",
                        }}
                      >
                        <Button primary>Min. Temp : {city.temp_min} °C</Button>
                        <Button primary>Max. Temp : {city.temp_max} °C</Button>
                      </Card.Text>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
