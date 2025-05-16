import { calcDaysOnDiet, Sex, Details } from "./tanzverbot-diet";

test("Tanzverbot Diet", () => {
  const details: Details = {
    currentWeightKg: 74,
    targetWeightKg: 100,
    heightM: 1.86,
    ageY: 38,
    sex: Sex.Male,
  }
  expect(calcDaysOnDiet(details)).toBeGreaterThan(35);
});

test("Jérôme Golaz", () => {
  const details: Details = {
    currentWeightKg: 65,
    targetWeightKg: 80,
    heightM: 1.82,
    ageY: 17,
    sex: Sex.Male,
  };

  const expectedDays = 20;
  const actualDays = calcDaysOnDiet(
    details
  );

  expect(actualDays).toBeGreaterThanOrEqual(expectedDays);
});
