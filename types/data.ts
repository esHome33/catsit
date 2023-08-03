export type Donnees = DataRow[];

export type DataRow = {
	id: number;
	activite: string;
	days: boolean[];
	done: boolean[];
	photo: string;
};