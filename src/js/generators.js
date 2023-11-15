/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */

import Team from "./Team";

export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const randomType = Math.floor(Math.random() * allowedTypes.length);
  const randomMaxLevel = Math.floor(Math.random() * maxLevel) + 1;
  
  yield new allowedTypes[randomType](randomMaxLevel);
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const team = new Team();
  for (let i = 0; i < characterCount; i++) {
    team.add(characterGenerator(allowedTypes, maxLevel));
  }

  return team;
}
