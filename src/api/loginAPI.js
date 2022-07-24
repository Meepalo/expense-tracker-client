const loginUrl = `${process.env.REACT_APP_API_URL}/api/login`;

export const login = async (email, password) => {
	const response = await fetch(loginUrl, {
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
		method: "POST",
	});

	return response;
};
