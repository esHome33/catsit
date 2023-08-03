export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			actions: {
				Row: {
					activite: string;
					created_at: string;
					days_done: string;
					days_to_do: string;
					id: number;
					photo: string;
				};
				Insert: {
					activite?: string;
					created_at?: string;
					days_done?: string;
					days_to_do?: string;
					id?: number;
					photo?: string;
				};
				Update: {
					activite?: string;
					created_at?: string;
					days_done?: string;
					days_to_do?: string;
					id?: number;
					photo?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
