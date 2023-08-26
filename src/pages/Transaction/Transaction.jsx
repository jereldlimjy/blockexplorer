import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { Utils } from 'alchemy-sdk';

export default function Transaction() {
  const { txHash } = useParams();
  const navigate = useNavigate();
  const { alchemy } = useAppContext();
  const [transaction, setTransaction] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (!txHash) {
      navigate('/');
      return;
    }

    const fetchTransaction = async () => {
      setIsLoading(true);
      try {
        const txReceipt = await alchemy.core.getTransactionReceipt(txHash);
        setTransaction(txReceipt);
      } catch (err) {
        navigate('/');
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [txHash]);

  const { blockNumber, from, to, status, effectiveGasPrice, gasUsed } =
    useMemo(() => {
      if (!transaction) return {};

      const { blockNumber, from, to, status, effectiveGasPrice, gasUsed } =
        transaction;

      return { blockNumber, from, to, status, effectiveGasPrice, gasUsed };
    }, [transaction]);

  return (
    <div className="font-nunito pb-12">
      <p className="text-2xl font-bold">Transaction Details</p>
      <p className="mt-1 underline text-2xl font-nunito font-semibold text-navy-light">
        Txn {txHash}
      </p>
      <hr className="my-8 border-2 rounded" />

      {isLoading ? (
        <h1 className="text-2xl">Loading...</h1>
      ) : (
        <div className="w-1/2 mt-4 p-8 rounded-md bg-grey text-lg">
          <div>
            <p className="font-bold">Block Number:</p>
            <Link
              to={`/txs/${blockNumber}`}
              className="underline text-navy-light hover:text-blue"
            >
              {blockNumber}
            </Link>
          </div>

          <div className="mt-4">
            <p className="font-bold">From:</p>
            <span>{from}</span>
          </div>

          <div className="mt-4">
            <p className="font-bold">To:</p>
            <span>{to}</span>
          </div>

          <div className="mt-4">
            <p className="font-bold">Status:</p>
            <span>{status === 1 ? 'Success' : 'Failure'}</span>
          </div>

          <div className="mt-4">
            <p className="font-bold">Gas Price:</p>
            <span>
              {Utils.formatUnits(effectiveGasPrice?.toString() ?? '0', 'gwei')}{' '}
              ETH
            </span>
          </div>

          <div className="mt-4">
            <p className="font-bold">Gas Used:</p>
            <span>{gasUsed?.toString() ?? '0'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
