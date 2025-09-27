import { BUY, GET_BOARD, INVALID, PAY, RECEIVE, RENT, SELL } from "./messages.js";

export class Board {
  constructor() {
    this.board =  [
  {
    id: 0,
    name: "GO",
    color: "White",
  },
  {
    id: 1,
    name: "Mumbai Central",
    ownership: [null, 0],
    rents: [2, 10, 30, 90, 160, 250],
    cost: [60, 50],
    color: "bg-amber-900",
  },
  {
    id: 2,
    name: "Community Chest",
    color: "bg-cyan-300",
  },
  {
    id: 3,
    name: "Delhi Road",
    ownership: [null, 0],
    rents: [4, 20, 60, 180, 320, 450],
    cost: [60, 50],
    color: "bg-amber-900",
  },
  {
    id: 4,
    name: "Income Tax",
    color: "bg-red-400",
  },
  {
    id: 5,
    name: "Indian Railways",
    ownership: [null],
    rents: [25, 50, 100, 200, 250, 300],
    cost: [200, 50],
    color: "bg-black",
  },
  {
    id: 6,
    name: "Chennai Street",
    ownership: [null, 0],
    rents: [6, 30, 90, 270, 400, 550],
    cost: [100, 50],
    color: "bg-sky-400",
  },
  {
    id: 7,
    name: "Chance",
    color: "bg-orange-400",
  },
  {
    id: 8,
    name: "Kolkata Avenue",
    ownership: [null, 0],
    rents: [6, 30, 90, 270, 400, 550],
    cost: [100, 50],
    color: "bg-sky-400",
  },
  {
    id: 9,
    name: "Hyderabad Street",
    ownership: [null, 0],
    rents: [8, 40, 100, 300, 450, 600],
    cost: [120, 50],
    color: "bg-sky-400",
  },
  {
    id: 10,
    name: "Jail / Just Visiting",
    color: "bg-gray-700",
  },
  {
    id: 11,
    name: "Jaipur Market",
    ownership: [null, 0],
    rents: [10, 50, 150, 450, 625, 750],
    cost: [140, 100],
    color: "bg-pink-400",
  },
  {
    id: 12,
    name: "Electric Company",
    ownership: [null],
    rents: [40, 80, 120, 160, 200, 240], // multiplier × dice roll
    cost: [150, 50],
    color: "bg-black",
  },
  {
    id: 13,
    name: "Lucknow Street",
    ownership: [null, 0],
    rents: [10, 50, 150, 450, 625, 750],
    cost: [140, 100],
    color: "bg-pink-400",
  },
  {
    id: 14,
    name: "Pune Road",
    ownership: [null, 0],
    rents: [12, 60, 180, 500, 700, 900],
    cost: [160, 100],
    color: "bg-pink-400",
  },
  {
    id: 15,
    name: "Eastern Railways",
    ownership: [null],
    rents: [25, 50, 100, 200, 250, 300],
    cost: [200, 50],
    color: "bg-black",
  },
  {
    id: 16,
    name: "Ahmedabad Bazaar",
    ownership: [null, 0],
    rents: [14, 70, 200, 550, 750, 950],
    cost: [180, 100],
    color: "bg-orange-400",
  },
  {
    id: 17,
    name: "Community Chest",
    color: "bg-cyan-300",
  },
  {
    id: 18,
    name: "Goa Beach Road",
    ownership: [null, 0],
    rents: [14, 70, 200, 550, 750, 950],
    cost: [180, 100],
    color: "bg-orange-400",
  },
  {
    id: 19,
    name: "Nagpur Road",
    ownership: [null, 0],
    rents: [16, 80, 220, 600, 800, 1000],
    cost: [200, 100],
    color: "bg-orange-400",
  },
  {
    id: 20,
    name: "Free Parking",
    color: "bg-green-500",
  },
  {
    id: 21,
    name: "Shimla Hill Road",
    ownership: [null, 0],
    rents: [18, 90, 250, 700, 875, 1050],
    cost: [220, 150],
    color: "bg-red-400",
  },
  {
    id: 22,
    name: "Chance",
    color: "bg-orange-400",
  },
  {
    id: 23,
    name: "Amritsar Street",
    ownership: [null, 0],
    rents: [18, 90, 250, 700, 875, 1050],
    cost: [220, 150],
    color: "bg-red-400",
  },
  {
    id: 24,
    name: "Varanasi Ghats",
    ownership: [null, 0],
    rents: [20, 100, 300, 750, 925, 1100],
    cost: [240, 150],
    color: "bg-red-400",
  },
  {
    id: 25,
    name: "Western Railways",
    ownership: [null],
    rents: [25, 50, 100, 200, 250, 300],
    cost: [200, 50],
    color: "bg-black",
  },
  {
    id: 26,
    name: "Surat Avenue",
    ownership: [null, 0],
    rents: [22, 110, 330, 800, 975, 1150],
    cost: [260, 150],
    color: "bg-yellow-300",
  },
  {
    id: 27,
    name: "Bhopal Market",
    ownership: [null, 0],
    rents: [22, 110, 330, 800, 975, 1150],
    cost: [260, 150],
    color: "bg-yellow-300",
  },
  {
    id: 28,
    name: "Water Works",
    ownership: [null],
    rents: [40, 80, 120, 160, 200, 240], // multiplier × dice roll
    cost: [150, 50],
    color: "bg-black",
  },
  {
    id: 29,
    name: "Indore Street",
    ownership: [null, 0],
    rents: [24, 120, 360, 850, 1025, 1200],
    cost: [280, 150],
    color: "bg-yellow-300",
  },
  {
    id: 30,
    name: "Go to Jail",
    color: "bg-gray-700",
  },
  {
    id: 31,
    name: "Patna Road",
    ownership: [null, 0],
    rents: [26, 130, 390, 900, 1100, 1275],
    cost: [300, 200],
    color: "bg-green-500",
  },
  {
    id: 32,
    name: "Kanpur Avenue",
    ownership: [null, 0],
    rents: [26, 130, 390, 900, 1100, 1275],
    cost: [300, 200],
    color: "bg-green-500",
  },
  {
    id: 33,
    name: "Community Chest",
    color: "bg-cyan-300",
  },
  {
    id: 34,
    name: "Chandigarh Road",
    ownership: [null, 0],
    rents: [28, 150, 450, 1000, 1200, 1400],
    cost: [320, 200],
    color: "bg-green-500",
  },
  {
    id: 35,
    name: "Southern Railways",
    ownership: [null],
    rents: [25, 50, 100, 200, 250, 300],
    cost: [200, 50],
    color: "bg-black",
  },
  {
    id: 36,
    name: "Chance",
    color: "bg-orange-400",
  },
  {
    id: 37,
    name: "Bangalore IT Park",
    ownership: [null, 0],
    rents: [35, 175, 500, 1100, 1300, 1500],
    cost: [350, 200],
    color: "bg-blue-800",
  },
  {
    id: 38,
    name: "Luxury Tax",
    color: "bg-red-400",
  },
  {
    id: 39,
    name: "Delhi Gateway",
    ownership: [null, 0],
    rents: [50, 200, 600, 1400, 1700, 2000],
    cost: [400, 200],
    color: "bg-blue-800",
  },
];
  }

  // return the board array
  getBoard() {
    return {
      type: GET_BOARD,
      payload: this.board,
    };;
  }

  nonBuyable() {
    return [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
  }

  buyProperty(player, idx, noOfHouses) {
    if (this.board[idx].ownership[0] !== null) {
      return {
        type: INVALID,
        payload: {
          error: "Already Bought",
        },
      };
    }

    if (
      this.board[idx].cost[0] + this.board[idx].cost[1] * noOfHouses >
      player.money
    ) {
      return {
        type: INVALID,
        payload: {
          error: "Insufficient Money",
        },
      };
    }

    this.board[idx].ownership = [player.name, noOfHouses];

    return {
      type: BUY,
      payload: {
        player: player.name,
        changeInBoard: this.board[idx],
        cost: this.board[idx].cost[0] + this.board[idx].cost[1] * noOfHouses,
      },
    };
  }

  checkRent(player, idx) {
    // No ownership information or unowned -> no rent
    if (!this.board[idx].ownership || this.board[idx].ownership[0] === null) {
      return null;
    }

    // If the player landing is the owner, no rent
    if (this.board[idx].ownership[0] === player.name) {
      return null;
    }

    const owner = this.board[idx].ownership[0];
    const noOfHouses = this.board[idx].ownership[1] || 0;

    return {
      type: RENT,
      payload: {
        name: player.name,
        ownerName: owner,
        rent: this.board[idx].rents[noOfHouses],
      },
    };
  }

  sellProperty(player, idx, noOfHouses) {
    if (
      !this.board[idx].ownership ||
      this.board[idx].ownership[0] !== player.name
    ) {
      return {
        type: INVALID,
        payload: {
          error: "Not your Property",
        },
      };
    }
    if (noOfHouses > this.board[idx].ownership[1]) {
      return {
        type: INVALID,
        payload: {
          error: "Not many houses",
        },
      };
    }
    if (noOfHouses < 0) {
      return {
        type: INVALID,
        payload: {
          error: "Not many houses",
        },
      };
    }

    if (noOfHouses === 0) {
      this.board[idx].ownership[0] = null;
      this.board[idx].ownership[1] = 0;

      return {
        type: SELL,
        payload: {
          amount: this.board[idx].cost[0] / 2,
        },
      };
    }
    this.board[idx].ownership[1] = this.board[idx].ownership[1] - noOfHouses;

    return {
      type: SELL,
      payload: {
        amount: (this.board[idx].cost[1] / 2) * noOfHouses,
      },
    };
  }

  checkSpecialSpace(player, idx) {
    // Only handle special (non-buyable) spaces here.
    if (!this.nonBuyable().includes(idx)) return null;

    // Income Tax (usually index 4) — charge player
    if (idx === 4) {
      return {
        type: PAY,
        payload: {
          name: player.name,
          amount: 200,
        },
      };
    }

    // Luxury Tax (usually index 38) — charge player
    if (idx === 38) {
      return {
        type: PAY,
        payload: {
          name: player.name,
          amount: 75,
        },
      };
    }

    // Other non-buyable squares (GO, Chance, Community Chest, Jail, Free Parking, Go to Jail)
    // are handled elsewhere (cards, game logic) — nothing to do here by default.
    return null;
  }
}
