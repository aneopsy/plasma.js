import Plasma from "../src/index";

const plasma = new Plasma("http://localhost:8080");
console.log("Connected to: ", plasma.currentProvider.host);

const request = plasma.getLatestBlock();

plasma.getLatestBlock().then(rst => console.log("# getLatestBlock\n", rst));

plasma
  .getLatestBlockNumber()
  .then(rst => console.log("# getLatestBlockNumber\n", rst));

plasma
  .getBlockByNumber(1)
  .then(rst => console.log("# getBlockByNumber\n", rst));

request.then(rst => {
  plasma
    .getBlockByHash(rst.hash)
    .then(rst => console.log("# getBlockByHash\n", rst));

  plasma.getTxByHash(rst.hash).then(rst => console.log("# getTxByHash\n", rst)); //Check it
});

plasma
  .getTxByPos("0x9fb29aac15b9a4b7f17c3385939b007540f4d791", 1, 0, 0)
  .then(rst => console.log("# getTxByPos\n", rst));

plasma
  .getUTXOs("0x9fb29aac15b9a4b7f17c3385939b007540f4d791")
  .then(rst => console.log("# getUTXOs\n", rst));

plasma.getMerkleProof(1, 0).then(rst => console.log("# getMerkleProof\n", rst));
