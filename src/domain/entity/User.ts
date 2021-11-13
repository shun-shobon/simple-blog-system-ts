import * as O from "fp-ts/Option";

export type User = {
  id: O.Option<UniqueId>;
  name: string;
};
