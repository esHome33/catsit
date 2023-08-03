export type Donnees = DataRow[];

export type DataRow = {
	id: number;
	activite: string;
	created_at: string;
	days_to_do: string;
	days_done: string;
	photo: string;
};

export type DataRowTransformed = {
	id: number;
	activite: string;
	days: boolean[];
	done: boolean[];
	photo: string;
};
