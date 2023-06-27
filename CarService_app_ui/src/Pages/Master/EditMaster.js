import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Grid, Form, Button, Icon, Segment, Table, Modal, Divider, Input, Confirm, Dropdown } from "semantic-ui-react";
import { NavLink, useHref, useParams, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import axios from "axios";


export function EditMaster() {
  const params = useParams();
  const [error, setError] = useState();
  const [services, setServices] = useState([]);

  const [master, setMasters] = useState({
    firstname: "",
    lastname: "",
    specialization: "",
    city:"",
    rating:[],
  });


  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminFunctions, setShowAdminFunctions] = useState(false);
  const [showUserFunctions, setShowUserFunctions] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminFunctions(user.roles.includes("ROLE_ADMIN"));
      setShowUserFunctions(user.roles.includes("ROLE_USER"));
    }
  }, []);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

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

 
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/CarService/master/${params.id}`, { withCredentials: true })
      .then((response) => {
        const masterData = response.data;
        setMasters(masterData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);


  const updateMaster = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/CarService/master/update/${params.id}`,
        master, // Pass the updated service data in the request payload
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setError(null);
        setIsUpdateSuccessful(true); // Set the success status
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const serviceOptions = services.map((service) => ({
    key: service.id,
    text: service.title,
    value: service.id,
  }));



  const updateProperty = (property, value) => {
    setMasters((prevMaster) => ({ ...prevMaster, [property]: value }));
  };
  

  return (
    <div>
      <MainMenu />
      <Grid columns={2}>

        <Grid.Column width={2} id="main"></Grid.Column>
        <Grid.Column textAlign="left" verticalAlign="top" width={13}>
          <Segment id="segment" color="blue">
            <div>
              {isUpdateSuccessful && (
                <div className="ui success message">
                  <i className="close icon" onClick={() => setIsUpdateSuccessful(false)}></i>
                  <div className="header">Update Successful</div>
                  <p>The service has been updated successfully.</p>
                </div>
              )}
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell >Master firstname</Table.HeaderCell>
                    <Table.HeaderCell >Master lastname</Table.HeaderCell>
                    <Table.HeaderCell >Master specialization</Table.HeaderCell>
                    <Table.HeaderCell >Master city</Table.HeaderCell>
                    <Table.HeaderCell >Master carService</Table.HeaderCell>
                  
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                  <Table.Cell>
  {showAdminFunctions && (
    <Input value={master.firstname} onChange={(e) => updateProperty("firstname", e.target.value)} />
  )}
</Table.Cell>
<Table.Cell>
  {showAdminFunctions && (
    <Input value={master.lastname} onChange={(e) => updateProperty("lastname", e.target.value)} />
  )}
</Table.Cell>
<Table.Cell>
  {showAdminFunctions && (
    <Input value={master.specialization} onChange={(e) => updateProperty("specialization", e.target.value)} />
  )}
</Table.Cell>
<Table.Cell>
  {showAdminFunctions && (
    <Input value={master.city} onChange={(e) => updateProperty("city", e.target.value)} />
  )}
</Table.Cell>
                    <Table.Cell>
      {showAdminFunctions ? (
        <Dropdown
        placeholder="Select Car Service"
        fluid
        search
        selection
        options={serviceOptions}
        onChange={(e, { value }) => updateProperty("carService", value)}
        value={master.carService}
      />
      ) : (
        master.carService
      )}
    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>


              <Divider hidden />

              <Button primary className="controls" id="details" onClick={updateMaster}>Update</Button>
              <Button icon labelPosition="left" className="" href="#/master"><Icon name="arrow left" />Back</Button>

            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}