import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Grid, Form, Button, Icon, Segment, Table, Modal, Divider, Input, Confirm } from "semantic-ui-react";
import { NavLink, useHref, useParams, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import axios from "axios";


export function EditService() {
  const params = useParams();
  const [error, setError] = useState();

  const [service, setServices] = useState({
    title: "",
    address: "",
    owner: "",
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

  // Fetch menu
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/CarService/service/${params.id}`, { withCredentials: true })
      .then((response) => {
        const servicesData = response.data;
        setServices(servicesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);


  const updateService = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/CarService/service/update/${params.id}`,
        service, // Pass the updated service data in the request payload
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



  const updateProperty = (property, event) => {
    if (event.target.value === "") {
      setServices((prevMenus) => ({ ...prevMenus, [property]: "" }));
    } else {
      setServices((prevMenus) => ({ ...prevMenus, [property]: event.target.value }));
    }
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
                    <Table.HeaderCell >Service title</Table.HeaderCell>
                    <Table.HeaderCell >Service address</Table.HeaderCell>
                    <Table.HeaderCell >Service owner</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell >
                      {showAdminFunctions && <Input value={service.title} onChange={(e) => updateProperty("title", e)} />}
                      {showUserFunctions && <div>{service.title}</div>}
                    </Table.Cell>
                    <Table.Cell >
                      {showAdminFunctions && <Input value={service.address} onChange={(e) => updateProperty("address", e)} />}
                      {showUserFunctions && <div>{service.address}</div>}
                    </Table.Cell>
                    <Table.Cell >
                      {showAdminFunctions && <Input value={service.owner} onChange={(e) => updateProperty("owner", e)} />}
                      {showUserFunctions && <div>{service.owner}</div>}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>


              <Divider hidden />

              <Button primary className="controls" id="details" onClick={updateService}>Update</Button>
              <Button icon labelPosition="left" className="" href="#/services"><Icon name="arrow left" />Back</Button>

            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}