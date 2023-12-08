const EthPriceOracle = artifacts.require("EthPriceOracle.sol");

module.exports = function (deployer) {
  deployer.deploy(EthPriceOracle, "0x38e828e033076B12b590c2E37FDBe7038a64845d");
};