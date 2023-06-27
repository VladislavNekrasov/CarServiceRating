import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Table, Button, Icon, Confirm } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";




export function ViewMaster() {
  axios.defaults.withCredentials = true;
  const [masters, setMasters] = useState([]);
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
  
  const fetchMasters = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/CarService/master/all`, { withCredentials: true });
      setMasters(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const DeleteMaster = async (id) => {
    axios.delete("http://localhost:8080/api/CarService/master/delete/" + id, { withCredentials: true })
      .then(fetchMasters)
      .then(setOpen(false));
  };

  useEffect(() => {
    fetchMasters();
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
          to="/master/create"
        >
          <Icon name="plus" />
          Create new Master
        </Button> 
            )}
        

        <Table selectable>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Master firstname</Table.HeaderCell>
              <Table.HeaderCell>Master lastname</Table.HeaderCell>
              <Table.HeaderCell>Master specialization</Table.HeaderCell>
              <Table.HeaderCell>Master city</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masters.map((master) => (
              <Table.Row key={master.id}>
                <Table.Cell>{master.firstname}</Table.Cell>
                <Table.Cell>{master.lastname}</Table.Cell>
                <Table.Cell>{master.specialization}</Table.Cell>
                <Table.Cell>{master.city}</Table.Cell>
                <Table.Cell collapsing>
                  {showAdminFunctions && (
                    <Link to={`/master/edit/${master.id}`}>
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
                    onClick={() => setOpen(master.id)}
                  ></Button>
                  )}
                  
                  <Confirm
                    open={open}
                    header="Attention!"
                    content="Are you sure you want to delete this master?"
                    confirmButton="Yes"
                    cancelButton="Cancel"
                    onConfirm={() => DeleteMaster(open)}
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
