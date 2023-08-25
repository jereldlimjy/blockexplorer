import { useState } from 'react';
import Overview from '../../components/Overview/Overview';
import { useAppContext } from '../../contexts/AppContext';

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
      const block = await alchemy.core.getBlockWithTransactions(
        Number(searchInput)
      );
      setBlockDetails([]);
      setMessage('');
    } catch (err) {
      setMessage('Sorry, something went wrong!', err.message);
    }
  };

  return (
    <>
      <Overview />
      <hr className="my-8 border-2 rounded" />
      <form onSubmit={handleSearch}>
        <input
          className="font-nunito text-lg border-2 rounded-md border-blue py-2 px-4 focus:outline-none bg-blue text-white placeholder:text-white caret-white w-96"
          type="text"
          value={searchInput}
          placeholder="Enter block number here..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      {!!message && <p className="font-nunito mt-2 text-lg">{message}</p>}
      {!!blockDetails && (
        <div>
          <p className="mt-4">
            <span className="text-2xl font-nunito font-semibold text-navy">
              Block
            </span>{' '}
            <span className="ml-1 underline text-xl font-nunito font-semibold text-navy-light">
              #{blockDetails.number}
            </span>
          </p>

          <div className="w-1/2 mt-4 rounded-md bg-grey"></div>
        </div>
      )}
    </>
  );
}
