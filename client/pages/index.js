import { useState } from "react";
import { useRouter } from "next/router";
import {
  Page,
  Row,
  LoginScreenTitle,
  List,
  ListInput,
  Button,
  Link
} from "framework7-react";

export default function MainMenu(props) {
  const { f7router } = props;
  const [session, setSession] = useState("");

  const joinSession = (e) => {
    e.preventDefault();
    console.log(`Joining DotHidden session ${session}...`);
    console.log(props);
    f7router.navigate(`lobby/${session}`);
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

        <Button className="margin-horizontal" onClick={joinSession}>CREATE</Button>
        {/* <Button className="margin-horizontal" onClick={() => router.push(`/lobby/${encodeURIComponent(session)}`)}>JOIN</Button> */}
        {/* <Link href={`/lobby/${encodeURIComponent(session)}`} passHref>
          <Button className="margin-horizontal">JOIN</Button>
        </Link> */}

        <Row>
          <hr className="col-15" />
        </Row>

        <Button className="margin-horizontal" href="lobby/[session]" onClick={createSession}>CREATE</Button>
      </List>
    </Page>
  );
}
