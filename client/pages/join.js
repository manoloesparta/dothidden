import { useState } from "react";
import {
	Page,
	LoginScreenTitle,
	List,
	ListInput,
	Button
} from "framework7-react";

export default function Join(props) {
	const { f7router, session } = props;

	if (session === undefined) {
		f7router.navigate("/");
	}

	const [username, setUsername] = useState("");
	const validUsername = function () {
		return username.length > 3;
	};
	
	const joinSession = (e) => {
		e.preventDefault();
		if (!validUsername())
			return;
		console.log(`'${username}' attempting to start DotHidden session...`);
		session = 100000 + Math.floor(Math.random() * 800000);
		f7router.navigate(`/lobby/${session}`);
	};

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen>
			<List className="padding">
				<img src="/vercel.svg" alt="" className="page-content display-flex flex-direction-column justify-content-center" />
				<LoginScreenTitle>
                    DotHidden
				</LoginScreenTitle>
			</List>


			<List form onSubmit={joinSession} className="padding-horizontal">
				<ListInput outline
					input={false}
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