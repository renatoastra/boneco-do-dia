import type { Session } from "@gebra/auth";

export type Ctx = {
	user: Session["user"];
	session: Session["session"];
};
