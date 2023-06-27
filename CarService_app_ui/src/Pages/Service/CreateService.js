import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Grid, Form, Button, Icon, Segment, Table, Modal } from "semantic-ui-react";
import axios from "axios";

export function CreateService() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [owner, setOwner] = useState("");

  const createService = async () => {
    axios.post(
      'http://localhost:8080/api/CarService/service',
      {
        title,
        address,
        owner,

      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  };

  return (
    <div>
      <MainMenu />

      <Grid columns={2} >
        <Grid.Column width={2} id='main'>
        </Grid.Column>

        <Grid.Column floated='left' textAlign='left' verticalAlign='top' width={13}>
          <Segment id='segment' color='teal'>

            <Form >
              <Form.Field>
                <label>Service Title</label>
                <input name="name" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Address</label>
                <input name="address" placeholder="Adress" onChange={(e) => setAddress(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Owner</label>
                <input name="owner" placeholder="Owner" onChange={(e) => setOwner(e.target.value)} />
              </Form.Field>

              <div >
                <Button class="ui blue button" id='details' type='submit' href='#/services' className="controls" primary onClick={createService}>Create Service</Button>
                <Button class="ui red button" icon labelPosition="left" className="" href='#/services'><Icon name="arrow left" />Back</Button>
              </div>
            </Form>
          </Segment>
        </Grid.Column>

      </Grid>
    </div>
  );
}