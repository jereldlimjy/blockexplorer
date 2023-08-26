import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { Utils } from 'alchemy-sdk';

export default function Transaction() {
  const { txHash } = useParams();
  const navigate = useNavigate();
  const { alchemy } = useAppContext();
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    if (!txHash) {
      navigate('/');
      return;
    }

    const fetchTransaction = async () => {
      try {
        const txReceipt = await alchemy.core.getTransactionReceipt(txHash);
        setTransaction(txReceipt);
      } catch (err) {
        navigate('/');
        return;
      }
    };

    fetchTransaction();
  }, [txHash]);

  // const {} = useMemo(() => {
  //   if (!transaction) return {};
  // }, [transaction]);

  return (
    <div className="font-nunito pb-12">
      <p className="text-2xl font-bold">Transaction Details</p>
      <p className="mt-1 underline text-2xl font-nunito font-semibold text-navy-light">
        Txn {txHash}
      </p>
      <hr className="my-8 border-2 rounded" />
      <div className="w-1/2 mt-4 p-8 rounded-md bg-grey text-lg">
        <div>
          <p className="font-bold">Timestamp:</p>
          <span>timestamp</span>
        </div>
      </div>
    </div>
  );
}
