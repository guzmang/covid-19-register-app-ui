
export class Person {
	constructor(
		public _id: string,
		public name: string,
		public country: string,
		public dna: Array<String>,
		public result: string,
		public position: number,
		public resultColor: string
	) {}
}