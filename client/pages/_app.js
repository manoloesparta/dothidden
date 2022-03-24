import Framework7 from "framework7/lite-bundle";
import Framework7React, { App, View } from "framework7-react";
import { useRouter } from "next/router";

import "framework7/framework7-bundle.css";

Framework7.use(Framework7React);

const routes = [
	{
		path: "/",
		asyncComponent: () => import("./index"),
	},
	{
		path: "/lobby/:session",
		asyncComponent: () => import("./lobby/[session]"),
	},
];

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const url = `http://localhost:3000${router.asPath}`;

	return (
		<App url={url} routes={routes}>
			<View
				main
				browserHistory
				browserHistorySeparator=""
				browserHistoryInitialMatch={true}
				browserHistoryStoreHistory={false}
				url="/"
			>
				<Component initialPage {...pageProps} />
			</View>
		</App>
	);
}

export default MyApp;