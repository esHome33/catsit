import { DataRow } from "@/types/data";


export type ActionsIndexesChecks = {
    actions: DataRow[];
    indexs: number[];
    checks: boolean[];
}


/**
 * Fonction qui va filtrer les données en fonction du jour indiqué
 * @param data les données des actions à faire par le catsitter
 * @param jour le numéro du jour de la semaine index 0 pour DIMANCHE (0=DIM, 1=LUN, ... 6=SAM)
 */
export const filtrerDatas: (data: DataRow[], jour: number) => ActionsIndexesChecks = (
	data: DataRow[],
	jour: number
) => {
	// corriger le jour
	let jour_LUN_DIM: number;
	if (jour > 0) {
		jour_LUN_DIM = jour - 1;
	} else {
		jour_LUN_DIM = 6;
	}
    // vérifier si les items concernent le jour indiqué
    const new_tab = data.filter((elt: DataRow) => {
        return isForToday(elt, jour_LUN_DIM);
    })
    // constituer les différents tableaux
    const idx: number[] = [];
    const chks: boolean[] = [];
    new_tab.forEach((item: DataRow) => {
        idx.push(item.id);
        chks.push(item.days_done.charAt(jour_LUN_DIM) === "1");
    });
    return {
        actions: new_tab,
        indexs: idx,
        checks:chks
    };
};

/**
 * Vérifie si l'action est à faire le jour indiqué
 * @param action  une action comportant une chaine de 0 et 1 pour chaque jour
 * @param jour_LUN_DIM le jour recherché (index = 0 pour lundi)
 * @returns les actions filtrées (uniquement à faire le jour indiqué)
 */
export const isForToday = (action: DataRow, jour_LUN_DIM:number) => {
	const j_action = action.days_to_do.charAt(jour_LUN_DIM);
	return j_action !== "0";
};

