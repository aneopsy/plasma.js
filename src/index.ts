import HttpProvider from "./http-provider";
import RequestManager from "./request-manager";
import Method from "./method";

export default class Plasma {
  currentProvider: any;
  requestManager: any;

  constructor(provider: any) {
    if (provider instanceof HttpProvider) {
      this.currentProvider = provider;
    }
    if (typeof provider === "string") {
      this.currentProvider = new HttpProvider(provider);
    }
    if (!this.currentProvider) {
      throw new Error("Invalid provider");
    }
    this.requestManager = new RequestManager(this.currentProvider);
    this._createMethods();
  }

  _createMethods() {
    const methods = [
      new Method({
        name: "getLatestBlock",
        call: "plasma_getLatestBlock",
        params: 0,
        requestManager: this.requestManager
      }),
      new Method({
        name: "getLatestBlockNumber",
        call: "plasma_getLatestBlockNumber",
        params: 0,
        requestManager: this.requestManager
      }),
      new Method({
        name: "getBlockByNumber",
        call: "plasma_getBlockByNumber",
        params: 1,
        requestManager: this.requestManager
      }),
      new Method({
        name: "getBlockByHash",
        call: "plasma_getBlockByHash",
        params: 1,
        requestManager: this.requestManager
      }),
      new Method({
        name: "sendTx",
        call: "plasma_sendTx",
        params: 1,
        requestManager: this.requestManager
      }),
      new Method({
        name: "getTxByHash",
        call: "plasma_getTxByHash",
        params: 1,
        requestManager: this.requestManager
      }),
      new Method({
        name: "getTxByPos",
        call: "plasma_getTxByPos",
        params: 4,
        requestManager: this.requestManager
      }),
      new Method({
        name: "getUTXOs",
        call: "plasma_getUTXOs",
        params: 1,
        requestManager: this.requestManager
      }),
      new Method({
        name: "getMerkleProof",
        call: "plasma_getMerkleProof",
        params: 2,
        requestManager: this.requestManager
      })
    ];

    methods.forEach(m => {
      Object.defineProperty(this, m.name, {
        enumerable: true,
        configurable: true,
        writable: false,
        value: (...args) => {
          return m.send(...args);
        }
      });
    });
  }
}
