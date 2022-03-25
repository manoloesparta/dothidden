import { useState } from "react";
import {
	Page,
	Row,
	LoginScreenTitle,
	List,
	ListInput,
	Button
} from "framework7-react";

export default function MainMenu(props) {
	const { f7router } = props;

	const [session, setSession] = useState("");
	const validSession = () => {
		return session.length >= 6;
	};

	const joinSession = (e) => {
		e.preventDefault();
		if (!validSession())
			return;
		console.log(`Attempting to join DotHidden session #${session}...`);
		f7router.navigate("/join", {
			props: {
				session: session
			}
		});
	};

	const createSession = (e) => {
		e.preventDefault();
		console.log("Creating DotHidden session...");
		f7router.navigate("/join", {
			props: {
				session: null
			}
		});
	};

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen className="padding">
			<List className="padding">
				<Row className="justify-content-center">
					<img src="/dot_hidden.svg" alt="" width="256" />
				</Row>
				<LoginScreenTitle>
					DotHidden
				</LoginScreenTitle>
			</List>

			<List form onSubmit={joinSession} className="padding-horizontal">
				<ListInput outline
					value={session}
					onInput={(e) => {
						setSession(e.target.value);
					}}
					input={false}
				>
					<input slot="input" type="text" placeholder="Game PIN" className="text-align-center" value={session} onChange={e => setSession(e.target.value)} />
				</ListInput>

				<Button className="margin-horizontal" disabled={!validSession()} onClick={joinSession}>JOIN</Button>

				<Row>
					<hr className="col-66" />
				</Row>

				<Button className="margin-horizontal" onClick={createSession}>CREATE</Button>
			</List>
		</Page>
	);
}
