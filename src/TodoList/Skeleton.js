import Card from '../Card/Card'

function Skeleton() {
    const grayBox = <div className="w-full bg-gray-100 rounded-full">&nbsp;</div>;
    const grayBox2 = (
      <div className="w-1/12 bg-gray-100 rounded-full">&nbsp;</div>
    );
    return (
      <div className="animate-pulse flex flex-col py-2">
        <div className="mb-2 p-1 bg-gray-100 rounded-md">
          <Card content={grayBox} cardButtons={grayBox2} />
        </div>
        <div className="mb-2 p-1 bg-gray-100 rounded-md">
          <Card content={grayBox} cardButtons={grayBox2} />
        </div>
        <div className="mb-2 p-1 bg-gray-100 rounded-md">
          <Card content={grayBox} cardButtons={grayBox2} />
        </div>
      </div>
    );
}

export default Skeleton