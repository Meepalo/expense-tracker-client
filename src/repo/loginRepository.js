import { login as APILogin } from "../api/loginAPI";

export const login = async (email, password) => {
	const response = await APILogin(email, password);

	if (response.status == 200) {
		const loginData = await response.json();
		localStorage.setItem("token", loginData.user);
		return true;
	}

	return false;
};

export const logout = () => {
	localStorage.removeItem("token");
};
