import { useState } from "react";
import {
	Page,
	Navbar,
	NavTitle,
	NavRight,
	List,
	ListItem,
	Button,
} from "framework7-react";

export default function Lobby(props) {
	const { f7router, session } = props;

	const [isHost, setIsHost] = useState(true);
	const [self, setSelf] = useState("");
	const [users, setUsers] = useState(Array.from(Array(100).keys()));

	const closeSession = (e) => {
		e.preventDefault();
		console.log(`Closing DotHidden session #${session}...`);
		f7router.navigate("/");
	};

	const kickUser = (e, user) => {
		e.preventDefault();
		if (!isHost)
			return;
		console.log(`Kicking user '${user}' from session #${session}...`);
	};

	return (
		<Page noSwipeback>
			<Navbar>
				<NavTitle className="text-align-center">
                    DotHidden #{session}
				</NavTitle>

				<NavRight>
					<Button color="red" onClick={closeSession}>{isHost ? "CLOSE" : "LEAVE"}</Button>
				</NavRight>
			</Navbar>

			<List simpleList className="no-margin">
				{users.map((user, index) => (
					<ListItem key={index} title={user + 1}>
						<div className="item-after">
							{isHost &&
                                <Button outline color="red" onClick={(e) => kickUser(e, user)}>Kick</Button>
							}
						</div>
					</ListItem>
				))}
			</List>
		</Page >
	);
}
