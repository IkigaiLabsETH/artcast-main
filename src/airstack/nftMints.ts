import {
  init,
  getFarcasterUserNFTMints,
  FarcasterUserNFTMintsInput,
  FarcasterUserNFTMintsOutput,
  TokenBlockchain,
  NFTType,
} from "@airstack/frames";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const input: FarcasterUserNFTMintsInput = {
    fid: 602,
    chains: [
      TokenBlockchain.Ethereum,
      TokenBlockchain.Polygon,
      TokenBlockchain.Base,
      TokenBlockchain.Zora,
    ],
    tokenType: [NFTType.ERC721, NFTType.ERC1155],
    limit: 10,
  };
  const { data, error }: FarcasterUserNFTMintsOutput =
    await getFarcasterUserNFTMints(input);

  if (error) throw new Error(error);

  console.log(data);
})();
