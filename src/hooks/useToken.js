import { useState } from "react";

export default useToken = () => {
	const getToken = () => {
		return localStorage.getItem("token");
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (newToken) => {
		localStorage.setItem("token", newToken);
		setToken(newToken);
	};

	return {
		setToken: saveToken,
		token,
	};
};
