/**
 * Gets the boolean value placed at the day number. No check on the value of day_number
 * nor on the length of the bool_string.
 *
 * @param day_number 0=MON 1=TUE 2=WED 3=THU 4=FRI 5=SAT 6=SUN
 * @param bool_string a 7 char len string giving a boolean value for each day eg : "0011001"
 */
export const getBoolean = (day_number: number, bool_string: string) => {
	const val = bool_string.charAt(day_number);
	return val === "1";
};

/**
 *
 * @param daynumber
 */
export const changeDayNumberToEtiennes = (daynumber: number) => {
	let jour_LUN_DIM: number = daynumber - 1;
	if (jour_LUN_DIM < 0) {
		jour_LUN_DIM = 6;
	}
	return jour_LUN_DIM;
};

/**
 * updates the days_dones value for the given day
 * @param dones chaine de 7 car de long de type "0101011"
 * @param day le jour (0=DIM 1=LUN ... 6=SAM)
 * @returns chaine où la valeur du jour est inversée ("0" devient "1" ou "1" devient "0")
 */
export const changeVal = (dones: string, day: number) => {
	let jour = day - 1;
	if (day === 0) {
		jour = 6;
	}

	const val = dones.charAt(jour);
	let new_val = "1";

	if (val === "1") {
		new_val = "0";
	}

	const avant = dones.substring(0, jour);
	const apres = dones.substring(jour + 1, dones.length);
	const retour = avant + new_val + apres;

	// console.log(
	// 	`DAYS in changeval : avant=${dones} apres=${retour} pour jour n°${day}`
	// );
	return retour;
};

/**
 * Toggles a boolean value in a boolean array at the position given by day_number and returns a new array
 *
 * @param tab boolean array (length should be 7 as 7 days in a week !)
 * @param day_number 1=MON 2=TUE 3=WED 4=THU 5=FRI 6=SAT 0=SUN  (nothing in checked for this value)
 *
 * @returns a newly created array containing initial values and a toggled value at pos "day_number"
 */
export const changeBool = (tab: boolean[], day_number: number) => {
	let index = day_number - 1;
	if (index < 0) {
		index = 6;
	}

	const new_tab = tab.map((val, idx) => {
		if (idx === index) {
			return !val;
		} else {
			return val;
		}
	});

	return new_tab;
};

/**
 * retrouve une chaine correspondant au jour en français
 * de la date fournie en paramètre
 *
 * @param une_date une date
 * @returns le jour correspondant à cette date ("lundi" ou "mardi" ...)
 */
export const getNomDay = (une_date: Date) => {
	const day = une_date.getDay();
	if (day === 1) {
		return "lundi";
	}
	if (day === 2) {
		return "mardi";
	}
	if (day === 3) {
		return "mercredi";
	}
	if (day === 4) {
		return "jeudi";
	}
	if (day === 5) {
		return "vendredi";
	}
	if (day === 6) {
		return "samedi";
	}
	if (day === 0) {
		return "Dimanche";
	}
	return `jour_ ${day}`;
};
