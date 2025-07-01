import React from "react";

const Card = ({ card, onDelete }) => {
  return (
    <div classNames="card">
      <div className="bg-white rounded-lg shadow-md p-4 m-4 w-64 transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <button
            onClick={() => onDelete(card.id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600">{card.content}</p>
      </div>
    </div>
  );
};

export default Card;
