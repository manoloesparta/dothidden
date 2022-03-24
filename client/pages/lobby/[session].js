import { useState } from "react";
import { useRouter } from "next/router";
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    List,
    ListItem,
    Button,
} from "framework7-react";

export default function Lobby(props) {
    console.log(props);
    const { session, f7router } = props;
    const [isHost, setIsHost] = useState(true);

    const [username, setUsername] = useState("");
    // const [session, setSession] = useState("");

    const [users, setUsers] = useState(Array.from(Array(100).keys()));

    return (
        <Page noSwipeback>
            <Navbar>
                <NavTitle className="text-align-center">
                    DotHidden #{session}
                </NavTitle>

                <NavRight>
                    <Button color="red">{isHost ? "CLOSE" : "LEAVE"}</Button>
                </NavRight>
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
        </Page >
    );
}
