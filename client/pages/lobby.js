import { useState } from "react";
import {
    Page,
    Button,
    List,
    Fab,
    Navbar,
    NavTitle,
    ListItem,
} from "framework7-react";

export default function MainMenu() {
    const [isHost, setIsHost] = useState(false);

    const [username, setUsername] = useState("");
    const [session, setSession] = useState("123");

    const [users, setUsers] = useState(Array.from(Array(100).keys()));

    const joinSession = () => {
        console.log(username);
        console.log("Joining DotHidden session...");
    };

    const createSession = () => {
        console.log(username);
        console.log("Creating DotHidden session...");
    };

    return (
        <Page noSwipeback>
            <Navbar>
                <NavTitle>
                    {session}
                </NavTitle>
            </Navbar>

            <List simpleList className="no-margin">
                {users.map((user, index) => (
                    <ListItem key={index} title={user + 1}>
                        <div className="item-after">
                            {isHost &&
                                <Button outline color="red">Kick</Button>
                            }
                        </div>
                    </ListItem>
                ))}
            </List>

            <Fab position="center-bottom" slot="fixed" text="CLOSE" color="red" className="fab" />
            <Fab position="center-bottom" slot="fixed" text="LEAVE" color="red" className="fab" />
        </Page >
    );
}
