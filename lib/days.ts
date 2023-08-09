
/**
 * Gets the boolean value placed at the day number. No check on the value of day_number
 * 
 * @param day_number 1=MON 2=TUE 3=WED 4=THU 5=FRI 6=SAT 0=SUN
 * @param bool_string a 7 char len string giving a boolean value for each day eg : "0011001"
 */
export const getBoolean = (day_number: number, bool_string: string) => {
    const val = bool_string.charAt(day_number);
    return (val === "1");
};


/**
 * Toggles a boolean value in a boolean array at the position given by day_number and returns a new array
 * 
 * @param tab boolean array (length should be 7 as 7 days in a week !)
 * @param day_number 1=MON 2=TUE 3=WED 4=THU 5=FRI 6=SAT 0=SUN  (nothing in checked for this value)
 * 
 * @returns a newly created array containing initial values and a toggled value at pos "day_number"
 */
export const changeBool = (tab: boolean[], day_number: number)=>{
    let index = day_number - 1;
    if (index < 0) {
        index = 6;
    }

    const new_tab = tab.map((val,idx) => {
        if (idx === index) {
            return !val;
        } else {
            return val;
        }
    });

    return new_tab;
}


