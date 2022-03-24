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
		f7router.navigate(`lobby/${session}`);
	};

	const createSession = (e) => {
		e.preventDefault();
		console.log("Creating DotHidden session...");
		// TODO
		// f7router.navigate("lobby/");
	};

	return (
		<Page noToolbar noNavbar noSwipeback loginScreen className="padding">
			<List className="padding">
				<img src="/vercel.svg" alt="" className="page-content display-flex flex-direction-column justify-content-center" />
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
					<hr className="col-15" />
				</Row>

				<Button className="margin-horizontal" onClick={createSession}>CREATE</Button>
			</List>
		</Page>
	);
}
