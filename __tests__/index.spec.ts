import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import FakeHTTPProvider from "./helpers/fake-http-provider";
import Plasma from "../src/index";

chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

describe("ETH-Plasma", () => {
  describe("Initialization", () => {
    it("should create instance with host", () => {
      const plasma = new Plasma("http://localhost:8080");
      expect(plasma.currentProvider.host).to.be.equal("http://localhost:8080");
    });
  });

  describe("Latest block", () => {
    let provider;
    let plasma;

    beforeAll(() => {
      provider = new FakeHTTPProvider();
      plasma = new Plasma(provider);
    });

    it("should have getLatestBlock method", () => {
      expect(plasma.getLatestBlock).to.be.a("function");
    });

    it("should have getLatestBlockNumber method", () => {
      expect(plasma.getLatestBlockNumber).to.be.a("function");
    });

    it("should have getBlockByNumber method", () => {
      expect(plasma.getBlockByNumber).to.be.a("function");
    });

    it("should have getBlockByHash method", () => {
      expect(plasma.getBlockByHash).to.be.a("function");
    });

    it("should have sendTx method", () => {
      expect(plasma.sendTx).to.be.a("function");
    });

    it("should have getTxByHash method", () => {
      expect(plasma.getTxByHash).to.be.a("function");
    });

    it("should have getTxByPos method", () => {
      expect(plasma.getTxByPos).to.be.a("function");
    });

    it("should have getUTXOs method", () => {
      expect(plasma.getUTXOs).to.be.a("function");
    });

    it("should have getMerkleProof method", () => {
      expect(plasma.getMerkleProof).to.be.a("function");
    });

    it("should have correct block number", () => {
      provider.setLatestBlockNumber("5");
      return plasma.getLatestBlockNumber().should.eventually.equal("5");
    });

    it("should have correct block", () => {
      const request = plasma.getLatestBlock();
      //   Promise.all([
      //     request.should.eventually.be.an('object'),
      //     request.should.eventually.have.property('number'),
      //     request.should.eventually.have.property('header'),
      //     request.should.eventually.have.property('hash'),
      //     request.should.eventually.have.property('transactions')
      // ]).then(function(values) {
      //   console.log(values);
      // });
    });
  });
});
