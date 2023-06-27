import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Table, Button, Icon, Confirm } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";




export function ViewService() {
  axios.defaults.withCredentials = true;
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

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
  
  const fetchServices = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/CarService/service/all`, { withCredentials: true });
      setServices(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const DeleteService = async (id) => {
    axios.delete("http://localhost:8080/api/CarService/service/delete/" + id, { withCredentials: true })
      .then(fetchServices)
      .then(setOpen(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (

    <div>
      <MainMenu />
      
      <div style={{ padding: "30px" }}>

      {showAdminFunctions && (
             <Button
          id="details"
          title="Create new service"
          icon
          labelPosition="left"
          className="controls"
          as={NavLink}
          exact
          to="/services/create"
        >
          <Icon name="plus" />
          Create new service
        </Button> 
            )}
        

        <Table selectable>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Service Title</Table.HeaderCell>
              <Table.HeaderCell>Service Address</Table.HeaderCell>
              <Table.HeaderCell>Service Owner</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {services.map((service) => (
              <Table.Row key={service.id}>
                <Table.Cell>{service.title}</Table.Cell>
                <Table.Cell>{service.address}</Table.Cell>
                <Table.Cell>{service.owner}</Table.Cell>
                <Table.Cell collapsing>
                  {showAdminFunctions && (
                    <Link to={`/services/edit/${service.id}`}>
                    <Button
                      id="icocolor"
                      basic
                      compact
                      icon="edit"
                      title="Edit"
                    ></Button>
                  </Link>
                  )}

                  {showAdminFunctions && (
                    <Button
                    id="icocolor"
                    basic
                    compact
                    title="Delete"
                    icon="trash"
                    onClick={() => setOpen(service.id)}
                  ></Button>
                  )}
                  
                  <Confirm
                    open={open}
                    header="Attention!"
                    content="Are you sure you want to delete this service?"
                    confirmButton="Yes"
                    cancelButton="Cancel"
                    onConfirm={() => DeleteService(open)}
                    onCancel={() => setOpen(false)}
                    size="small"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );

}
