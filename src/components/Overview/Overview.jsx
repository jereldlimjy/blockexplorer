import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

export default function Overview() {
  const { alchemy } = useAppContext();
  const [latestBlockNumber, setLatestBlockNumber] = useState();
  const [latestBlockTime, setLatestBlockTime] = useState();
  const [latestGasUsed, setLatestGasUsed] = useState();

  useEffect(() => {
    const fetchLatestBlockNumber = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      setLatestBlockNumber(blockNumber);
    };

    fetchLatestBlockNumber();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!latestBlockNumber) return;

    alchemy.core
      .getBlock(latestBlockNumber)
      .then((block) => {
        setLatestBlockTime(
          new Date(parseInt(block.timestamp * 1000)).toLocaleDateString(
            'en-US',
            {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }
          )
        );
        setLatestGasUsed(block.gasUsed.toString());
      })
      .catch((error) => {
        console.error('Error fetching block:', error);
      });
    // eslint-disable-next-line
  }, [latestBlockNumber]);

  const cardsData = [
    {
      title: 'Latest Block Number',
      value: latestBlockNumber
    },
    {
      title: 'Latest Block Time',
      value: latestBlockTime
    },
    {
      title: 'Latest Block Gas Used',
      value: latestGasUsed
    }
  ];

  return (
    // TODO: mobile responsiveness
    <div className="flex justify-around flex-wrap">
      {cardsData.map((data) => (
        <div className="flex flex-col items-center rounded-md bg-navy inline-block p-8">
          <p className="text-grey font-nunito font text-2xl">{data.title}</p>
          <p className="text-green font-nunito font-bold text-3xl mt-4">
            {data.value}
          </p>
        </div>
      ))}
    </div>
  );
}
