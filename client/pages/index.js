import { useState } from 'react'
import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
} from 'framework7-react'

export default function MainMenu() {
  const [username, setUsername] = useState('')
  
  const joinSession = () => {
    console.log("Joining DotHidden session...")
  };

  const createSession = () => {
    console.log("Creating DotHidden session...")
  }
  
  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
      <List>
        <img src="/vercel.svg" alt="" className="page-content display-flex flex-direction-column justify-content-center" />
        <LoginScreenTitle>
          DotHidden
        </LoginScreenTitle>
      </List>
      <List form>
        <ListInput
          className="padding-bottom"
          type="text"
          placeholder="Session ID"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
        <ListButton onClick={joinSession}>JOIN</ListButton>
      </List>

      <div className="row margin-horizontal">
        <hr className="col-33" />
      </div>

      <List>
        <ListButton onClick={createSession}>CREATE</ListButton>
      </List>
    </Page>
  );
}
