import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Grid, Form, Button, Icon, Segment, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

export function CreateMaster() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");
  const [carService, setCarService] = useState("");
  const [rating, setRating] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/CarService/service/all`, { withCredentials: true });
        setServices(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServices();
  }, []);

  const createMaster = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/CarService/master?carServiceId=${carService}`,
        {
          firstname,
          lastname,
          specialization,
          city,
          rating,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleServiceChange = (event, { value }) => {
    setCarService(value);
  };

  const serviceOptions = services.map((service) => ({
    key: service.id,
    text: service.title,
    value: service.id,
  }));

  return (
    <div>
      <MainMenu />

      <Grid columns={2}>
        <Grid.Column width={2} id='main'>
        </Grid.Column>

        <Grid.Column floated='left' textAlign='left' verticalAlign='top' width={13}>
          <Segment id='segment' color='teal'>
            <Form>
              <Form.Field>
                <label>Master firstname</label>
                <input name="firstname" placeholder="First name" onChange={(e) => setFirstname(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Master lastname</label>
                <input name="lastname" placeholder="Last name" onChange={(e) => setLastname(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Specialization</label>
                <input name="specialization" placeholder="Specialization" onChange={(e) => setSpecialization(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <input name="city" placeholder="City" onChange={(e) => setCity(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Car Service</label>
                <Dropdown
                  placeholder="Select Car Service"
                  fluid
                  search
                  selection
                  options={serviceOptions}
                  onChange={handleServiceChange}
                  value={carService}
                />
              </Form.Field>
              <div>
                <Button class="ui blue button" id='details' type='submit' as={Link} to="#/master" className="controls" primary onClick={createMaster}>
                  Create master
                </Button>
                <Button class="ui red button" icon labelPosition="left" className="" href='#/master'>
                  <Icon name="arrow left" />
                  Back
                </Button>
              </div>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
