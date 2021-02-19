function Card({ content, cardButtons }) {
  return (
    <div className="break-words rounded-sm w-full">
      <div className="flex justify-between items-center px-4 py-2">
        {content}
        {cardButtons}
      </div>
    </div>
  );
}

export default Card;
