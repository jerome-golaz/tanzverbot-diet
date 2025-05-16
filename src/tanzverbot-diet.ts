export enum Sex {
  Male = "m",
  Female = "f",
}

export type Details = {
  currentWeightKg: number;
  targetWeightKg: number;
  heightM: number;
  ageY: number;
  sex: Sex;
};

// const foodNames: string[] = [
//   "Kellogg's Tresor",
//   "Weihenstephan Haltbare Milch",
//   "Mühle Frikadellen",
//   "Volvic Tee",
//   "Neuburger lockerer Sahnepudding",
//   "Lagnese Viennetta",
//   "Schöller 10ForTwo",
//   "Ristorante Pizza Salame",
//   "Schweppes Ginger Ale",
//   "Mini Babybel",
// ];

// const foodCalories: number[] = [137, 64, 271, 40, 297, 125, 482, 835, 37, 59];
// const foodServings: number[] = [4, 8, 4, 12, 1, 6, 2, 2, 25, 20];

const food: Map<string, { calories: number; servings: number }> = new Map([
  ["Kellogg's Tresor", { calories: 137, servings: 4 }],
  ["Weihenstephan Haltbare Milch", { calories: 64, servings: 8 }],
  ["Mühle Frikadellen", { calories: 271, servings: 4 }],
  ["Volvic Tee", { calories: 40, servings: 12 }],
  ["Neuburger lockerer Sahnepudding", { calories: 297, servings: 1 }],
  ["Lagnese Viennetta", { calories: 125, servings: 6 }],
  ["Schöller 10ForTwo", { calories: 482, servings: 2 }],
  ["Ristorante Pizza Salame", { calories: 835, servings: 2 }],
  ["Schweppes Ginger Ale", { calories: 37, servings: 25 }],
  ["Mini Babybel", { calories: 59, servings: 20 }],
]);

export function calcDaysOnDiet(
  details: Details,
): number {
  //TODO: Rename variables
  const weightGainKg = details.targetWeightKg - details.currentWeightKg;
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  if (details.ageY < 16 || details.heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  let dailyCaloriesOnDiet = 0;
  // for (const index in foodNames) {
  //   const calories = foodCalories[index] || 0;
  //   const servings = foodServings[index] || 0;
  //   dailyCaloriesOnDiet += calories * servings;
  // }
  food.forEach((value, key) => {
    const calories = value.calories || 0;
    const servings = value.servings || 0;
    dailyCaloriesOnDiet += calories * servings;
  });
  let dailyCaloriesBasicMetabolicRate = 0;
  if (details.sex == Sex.Male) {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Male)
      66.47 + 13.7 * details.currentWeightKg + 5.003 * details.heightM * 100.0 - 6.75 * details.ageY,
    );
  } else {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Female)
      655.1 + 9.563 * details.currentWeightKg + 1.85 * details.heightM * 100.0 - 4.676 * details.ageY,
    );
  }
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil((9000 * weightGainKg) / dailyExcessCalories);
}
