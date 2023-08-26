import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { Utils } from 'alchemy-sdk';

export default function Transactions() {
  const { blockNum } = useParams();
  const navigate = useNavigate();
  const { alchemy } = useAppContext();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    if (!blockNum || !Number(blockNum)) {
      navigate('/');
      return;
    }

    const fetchTransactions = async () => {
      try {
        const block = await alchemy.core.getBlockWithTransactions(
          Number(blockNum)
        );
        setTransactions(block.transactions);
      } catch (err) {
        navigate('/');
        return;
      }
    };

    fetchTransactions();
  }, [blockNum]);

  return (
    <div className="font-nunito pb-12">
      <p className="text-2xl font-bold">Transactions</p>
      <p className="mt-1 underline text-2xl font-nunito font-semibold text-navy-light">
        Block #{blockNum}
      </p>
      <hr className="my-8 border-2 rounded" />
      {transactions && transactions.length ? (
        <table className="w-full border border-grey">
          <thead>
            <tr className="bg-blue text-white">
              <th className="py-2 px-4" align="center">
                Transaction Hash
              </th>
              <th className="py-2 px-4" align="center">
                Block
              </th>
              <th className="py-2 px-4" align="center">
                Confirmations
              </th>
              <th className="py-2 px-4" align="center">
                From
              </th>
              <th className="py-2 px-4" align="center">
                To
              </th>
              <th className="py-2 px-4" align="center">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-grey' : ''}>
                <td className="py-2 px-4" align="center">
                  <Link
                    to={`/tx/${transaction.hash}`}
                    className="underline text-navy-light hover:text-blue"
                  >{`${transaction.hash.substring(0, 20)}...`}</Link>
                </td>
                <td className="py-2 px-4" align="center">
                  {transaction.blockNumber}
                </td>
                <td className="py-2 px-4" align="center">
                  {transaction.confirmations}
                </td>
                <td
                  className="py-2 px-4"
                  align="center"
                >{`${transaction.from.substring(
                  0,
                  8
                )}...${transaction.from.substring(
                  transaction.from.length - 8
                )}`}</td>
                <td
                  className="py-2 px-4"
                  align="center"
                >{`${transaction.to.substring(
                  0,
                  8
                )}...${transaction.to.substring(
                  transaction.from.length - 8
                )}`}</td>
                <td className="py-2 px-4" align="center">
                  {Utils.formatEther(transaction.value.toString())} ETH
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-2xl">No transactions found!</h1>
      )}
    </div>
  );
}
