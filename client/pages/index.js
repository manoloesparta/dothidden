import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Row,
  Col,
  Page,
  LoginScreenTitle,
  Button,
  List,
  ListInput,
} from 'framework7-react';

export default function MainMenu() {
  const [username, setUsername] = useState('');
  const [session, setSession] = useState('');
  const router = useRouter();

  const joinSession = (e) => {
    e.preventDefault();
    console.log("Joining DotHidden session...");
    console.log(router);
    router.push('/lobby');

  };

  const createSession = (e) => {
    e.preventDefault();
    console.log(username);
    console.log("Creating DotHidden session...");
    router.push('/lobby');
  };

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
      <List>
        <img src="/vercel.svg" alt="" className="page-content display-flex flex-direction-column justify-content-center" />
        <LoginScreenTitle>
          DotHidden
        </LoginScreenTitle>
      </List>

      <List form>
        <ListInput outline
          type="text"
          placeholder="Nickname"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
        <ListInput outline
          type="text"
          placeholder="Session"
          value={session}
          onInput={(e) => {
            setSession(e.target.value);
          }}
        />

        <Row className="padding-horizontal margin-horizontal">
          <Col>
            <Button onClick={joinSession}>JOIN</Button>
          </Col>
          <Col>
            <Button onClick={createSession}>CREATE</Button>
          </Col>
        </Row>
      </List>
    </Page>
  );
}
