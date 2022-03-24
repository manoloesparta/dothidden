import { useState } from "react";
import {
  Row,
  Col,
  Page,
  LoginScreenTitle,
  Button,
  List,
  Input,
  ListInput,
} from "framework7-react";

export default function MainMenu() {
  const [session, setSession] = useState("");

  const joinSession = (e) => {
    e.preventDefault();
    console.log(`Joining DotHidden session ${session}...`);
  };

  const createSession = (e) => {
    e.preventDefault();
    console.log("Creating DotHidden session...");
  };

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen className="padding">
      <List className="padding">
        <img src="/vercel.svg" alt="" className="page-content display-flex flex-direction-column justify-content-center" />
        <LoginScreenTitle>
          DotHidden
        </LoginScreenTitle>
      </List>

      <List form className="padding-horizontal">
        <ListInput outline
          value={session}
          onInput={(e) => {
            setSession(e.target.value);
          }}
          input={false}
        >
          <input slot="input" type="text" placeholder="Game PIN" className="text-align-center" value={session} onChange={e => setSession(e.target.value)} />
        </ListInput>


        <Button className="margin-horizontal" href="lobby/" onClick={joinSession}>JOIN</Button>

        <Row>
          <hr className="col-15" />
        </Row>

        <Button className="margin-horizontal" href="lobby/" onClick={createSession}>CREATE</Button>
      </List>
    </Page>
  );
}
