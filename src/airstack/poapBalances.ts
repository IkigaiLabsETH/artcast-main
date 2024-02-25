import {
  init,
  getFarcasterUserPoaps,
  FarcasterUserPoapsInput,
  FarcasterUserPoapsOutput,
} from "@airstack/frames";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserPoapsInput = {
    fid: 602,
    limit: 100,
  };
  const { data, error }: FarcasterUserPoapsOutput = await getFarcasterUserPoaps(
    input
  );

  if (error) throw new Error(error);

  console.log(data);
})();
