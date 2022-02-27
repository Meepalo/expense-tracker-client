export const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const getPreviousMonth = (month) => {
	const pMonth = parseInt(month) - 1;
	if (pMonth < 0) return 11;
	return pMonth;
};

export const getNextMonth = (month) => {
	const nMonth = parseInt(month) + 1;
	if (nMonth > 11) return 0;
	return nMonth;
};
