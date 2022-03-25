import { useState } from "react";
import {
	Page,
	Row,
	LoginScreenTitle,
	List,
	ListInput,
	Button
} from "framework7-react";

export default function Join(props) {
	const { f7router, session, isHost } = props;

	if (session === undefined) {
		f7router.navigate("/");
	}

	const [usernameValid, setUsernameValid] = useState(false);
	const [username, setUsername] = useState("");
	const validUsername = function () {
		return username.length >= 3;
	};
	
	const joinSession = async (e) => {
		e.preventDefault();
		if (!validUsername())
			return;
		console.log(`'${username}' attempting to start DotHidden session...`);

		if (session === null) {
			let response = await fetch("http://localhost:8080/game", {
				method: "POST",
				body: JSON.stringify({
					host: username
				})
			});
			
			if (response.status === 200) {
				let json_response = await response.json();
				session = json_response.code || null;
			}
		} else {
			let response = await fetch(`http://localhost:8080/game/${session}/players/${username}`, {
				method: "POST"
			});
			
			if (response.status !== 200) {
				setUsernameValid(true);
				return;
			}
		}

		setUsernameValid(false);
		f7router.navigate(`/lobby/${session}`, {
			props: {
				session: session,
				isHost: isHost,
				username: username
			}
		});
	};

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			<List className="padding">
				<Row className="justify-content-center">
					<img src="/dot_hidden.svg" alt="" width="192" />
				</Row>
				<LoginScreenTitle>
                    DotHidden
				</LoginScreenTitle>
			</List>


			<List form onSubmit={joinSession} className="padding-horizontal">
				<ListInput outline
					input={false}
					errorMessageForce={usernameValid}
					errorMessage="Username already used!"
				>
					<input slot="input" type="text" placeholder="Username" className="text-align-center" value={username} onChange={e => setUsername(e.target.value)} />
				</ListInput>

				<Button className="margin-horizontal" disabled={!validUsername()} onClick={joinSession}>
					{session === null ? "CREATE" : "JOIN"}
				</Button>
			</List>
		</Page>
	);
};