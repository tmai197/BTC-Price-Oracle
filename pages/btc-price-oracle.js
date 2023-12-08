import Head from 'next/head'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import styles from '../styles/BTCpriceOracle.module.css'
import CallerContractInterface from 'C:/Users/Trang Mai/Downloads/EthPriceOracle/EthPriceOracle/web3.js/btc-price-oracle app/blockchain/build/blockchain_CallerContracts_CallerContract_sol_CallerContract.abi'
import EthPriceOracleInterface from 'C:/Users/Trang Mai/Downloads/EthPriceOracle/EthPriceOracle/web3.js/btc-price-oracle app/blockchain/build2/blockchain_EthpriceOracleContracts_EthPriceOracle_sol_EthPriceOracle.abi';

const BtcPriceOracle = () => {
    // State variables
    const [error, setError] = useState('');
    const [btcPrice, setBtcPrice] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [oracleInstance, setOracleInstance] = useState(null);
    const [callerContractInstance, setCallerContractInstance] = useState(null);
    const [threshold, setThreshold] = useState(0);

    // UseEffect to initialize Web3 and contract instances
    useEffect(() => {
        const initializeWeb3 = async () => {
            if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
                try {
                    // Request Ethereum accounts
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const newWeb3 = new Web3(window.ethereum);
                    setWeb3(newWeb3);

                    // Load EthPriceOracle contract and CallerContract contract
                    const oracleContractAddress = '0x1E3116dEEAFACef38E79819390F75e1e60EDb35C';
                    const oracleContractInstance = newWeb3.eth.Contract(
                        EthPriceOracleInterface,
                        oracleContractAddress
                    );
                    const callerContractAddress = '0x57a8c48f10F25472627B88ceC7Ac9ae83bE43492';
                    const callerContractInstance = newWeb3.eth.Contract(
                        CallerContractInterface,
                        callerContractAddress
                    );

                    setOracleInstance(oracleContractInstance);
                    setCallerContractInstance(callerContractInstance);
                } catch (err) {
                    setError(err.message);
                }
            } else {
                setError('Please install MetaMask');
            }
        };

        initializeWeb3();
    }, []);

    // Function to fetch BTC price
    const fetchBTCPrice = async () => {
        try {
            const price = await oracleInstance.methods.getLatestEthPrice().call();
            setBtcPrice(price);
        } catch (err) {
            setError('Error fetching BTC price');
        }
    };

    // Function to set Oracle instance address
    const setOracleInstanceAddressHandler = (newOracleAddress) => {
        const newOracleInstance = new web3.eth.Contract(EthPriceOracleInterface, newOracleAddress);
        setOracleInstance(newOracleInstance);
    };

    // Function to set threshold
    const setThresholdHandler = async () => {
        try {
            await oracleInstance.methods.setThreshold(threshold).send({ from: web3.eth.defaultAccount });
            emitOracleEvent('SetThresholdEvent', threshold);
        } catch (err) {
            setError('Error setting threshold');
        }
    };

    // Function to add Oracle
    const addOracleHandler = async (newOracleAddress) => {
        try {
            await oracleInstance.methods.addOracle(newOracleAddress).send({ from: web3.eth.defaultAccount });
            emitOracleEvent('AddOracleEvent', newOracleAddress);
        } catch (err) {
            setError('Error adding Oracle');
        }
    };

    // Function to delete Oracle
    const deleteOracleHandler = async (oracleAddressToDelete) => {
        try {
            await oracleInstance.methods.removeOracle(oracleAddressToDelete).send({ from: web3.eth.defaultAccount });
            emitOracleEvent('RemoveOracleEvent', oracleAddressToDelete);
        } catch (err) {
            setError('Error deleting Oracle');
        }
    };

    // Function to emit Oracle event
    const emitOracleEvent = (eventName, eventData) => {
        console.log(`${eventName}:`, eventData);
    };

    // Function to connect MetaMask wallet
    const connectWalletHandler = async () => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const newWeb3 = new Web3(window.ethereum);
                setWeb3(newWeb3);

                const oracleContractAddress = '0x1E3116dEEAFACef38E79819390F75e1e60EDb35C';
                const oracleContractInstance = newWeb3.eth.Contract(EthPriceOracleInterface, oracleContractAddress);
                const callerContractAddress = '0x57a8c48f10F25472627B88ceC7Ac9ae83bE43492';
                const callerContractInstance = newWeb3.eth.Contract(
                    CallerContractInterface,
                    callerContractAddress
                );

                setOracleInstance(oracleContractInstance);
                setCallerContractInstance(callerContractInstance);

                fetchBTCPrice();
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError('Please install MetaMask');
        }
    };

    // Return the JSX structure
    return (
        <div className={styles.main}>
            <Head>
                <title>BTCpriceOracle App</title>
                <meta name="description" content="A Bitcoin price oracle" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <nav className="navBar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>BTC Price Oracle</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick={fetchBTCPrice} className="button is-primary mr-2">
                            Fetch BTC Price
                        </button>
                        <button onClick={connectWalletHandler} className="button is-primary">
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <p>Current BTC Price: ${btcPrice !== null ? btcPrice : 'Loading...'}</p>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="field">
                        <label className="label">Threshold:</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                placeholder="Enter threshold"
                                value={threshold}
                                onChange={(e) => setThreshold(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={setThresholdHandler} className="button is-primary mt-2">
                        Set Threshold
                    </button>
                    {/* ... (unchanged code) */}
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>
        </div>
    );
};

export default BtcPriceOracle;