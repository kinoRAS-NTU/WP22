import { useQuery } from '@apollo/client';

import { GET_ITEMS_QUERY } from '../graphql/queries';

import Balance from './Balance';
import Category from './Category';

function Analytics() {
  // TODO 2.2 Use the useQuery hook to get items from backend

  const {
    loading, error, data: itemsData
  } = useQuery(GET_ITEMS_QUERY);

  console.log(useQuery(GET_ITEMS_QUERY))

  if (loading) return <p>Loading...</p>;

  const {items} = itemsData;

  // TODO 2.2 End


  return (
    <div className="grid grid-cols-12 gap-6">
      { 
        // TODO 2.3 Add Balence and Category (uncomment the following code)
      }
      <div className="col-span-6">
        <Balance items={items} />
      </div>
      <div className="col-span-6">
        <Category items={items} />
      </div>
      {
        // TODO 2.3 End
      }
    </div>
  );
}

export default Analytics;
