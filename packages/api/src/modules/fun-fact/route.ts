import { createFunFactProcedure } from "./procedures/create-funfact-procedure";
import { getFunFactListProcedure } from "./procedures/get-funfact-list-procedure";

export const funFactRoute = {
	createFunFact: createFunFactProcedure,
	getFunFactList: getFunFactListProcedure,
};
