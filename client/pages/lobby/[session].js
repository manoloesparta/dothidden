import { useState, useEffect } from "react";
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
	const { f7router, session, isHost, username } = props;

	if (session === undefined) {
		f7router.navigate("/");
	}

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

	useEffect(() => {
		async function getUsers() {
			let response = await fetch(`http://localhost:8080/game/${session}/players`);
			
			if (response.status === 200) {
				let json_response = await response.json();
				console.log(json_response);
				setUsers(json_response || []);
			}
		};
		getUsers();
	  }, []);

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
					<ListItem key={index} title={user.name}>
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
