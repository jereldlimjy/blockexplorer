import { useMemo, useState } from 'react';
import Overview from '../../components/Overview/Overview';
import { useAppContext } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { alchemy } = useAppContext();
  const [searchInput, setSearchInput] = useState('');
  const [blockDetails, setBlockDetails] = useState();
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!Number(searchInput)) {
      setMessage('Invalid input!');
      return;
    }

    setMessage('Searching...');

    try {
      const block = await alchemy.core.getBlock(Number(searchInput));
      setBlockDetails(block);
      setMessage('');
    } catch (err) {
      setMessage('Sorry, something went wrong!', err.message);
    }
  };

  const {
    timestamp,
    miner,
    transactions,
    gasUsed,
    gasLimit,
    nonce,
    difficulty
  } = useMemo(() => {
    if (!blockDetails) return {};

    const timestamp = new Date(
      parseInt(blockDetails.timestamp * 1000)
    ).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });

    const transactions = blockDetails.transactions.length;
    const gasUsed = blockDetails.gasUsed.toString();
    const gasLimit = blockDetails.gasLimit.toString();
    const { nonce, difficulty, miner } = blockDetails;

    return {
      timestamp,
      miner,
      transactions,
      gasUsed,
      gasLimit,
      nonce,
      difficulty
    };
  }, [blockDetails]);

  return (
    <div className="font-nunito">
      <Overview />
      <hr className="my-8 border-2 rounded" />
      <form onSubmit={handleSearch}>
        <input
          className="text-lg border-2 rounded-md border-blue py-2 px-4 focus:outline-none bg-blue text-white placeholder:text-white caret-white w-96"
          type="text"
          value={searchInput}
          placeholder="Enter block number here..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      {!!message && <p className="mt-2 text-lg">{message}</p>}
      {!!blockDetails && (
        <div className="pb-12">
          <p className="mt-4">
            <span className="text-2xl font-semibold text-navy">Block</span>{' '}
            <span className="ml-1 underline text-xl font-semibold text-navy-light">
              #{blockDetails.number}
            </span>
          </p>

          <div className="w-1/2 mt-4 p-8 rounded-md bg-grey text-lg">
            <div>
              <p className="font-bold">Timestamp:</p>
              <span>{timestamp}</span>
            </div>

            <div className="mt-4">
              <p className="font-bold">Miner:</p>
              <span>{miner}</span>
            </div>

            <div className="mt-4">
              <p className="font-bold">Transactions:</p>
              <span>
                <Link
                  to={`/txs/${blockDetails.number}`}
                  className="underline text-navy-light hover:text-blue"
                >
                  {transactions} transactions
                </Link>{' '}
                in this block
              </span>
            </div>

            <div className="mt-4">
              <p className="font-bold">Gas Used:</p>
              <span>{gasUsed}</span>
            </div>

            <div className="mt-4">
              <p className="font-bold">Gas Limit:</p>
              <span>{gasLimit}</span>
            </div>

            <div className="mt-4">
              <p className="font-bold">Nonce:</p>
              <span>{nonce}</span>
            </div>

            <div className="mt-4">
              <p className="font-bold">Difficulty:</p>
              <span>{difficulty}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
