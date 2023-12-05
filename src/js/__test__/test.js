import { calcTileType } from '../utils';
import Character from '../Character';
import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Daemon from '../characters/Daemon';
import Swordsman from '../characters/Swordsman';
import Undead from '../characters/Undead';
import Vampire from '../characters/Vampire';
import { characterGenerator, generateTeam } from '../generators';
import GameController from '../GameController';
import GamePlay from '../GamePlay';

test('Тестирование функции calcTileType: поле 0', () => {
    const result = calcTileType(0, 8);
    expect(result).toBe('top-left');
});

test('Тестирование функции calcTileType: поле 7', () => {
    const result = calcTileType(7, 8);
    expect(result).toBe('top-right');
});

test('Тестирование функции calcTileType: одно из верхних полей', () => {
    const result = calcTileType(3, 8);
    expect(result).toBe('top');
});

test('Тестирование функции calcTileType: одно из левых полей', () => {
    const result = calcTileType(32, 8);
    expect(result).toBe('left');
});

test('Тестирование функции calcTileType: одно из правых полей', () => {
    const result = calcTileType(47, 8);
    expect(result).toBe('right');
});

test('Тестирование функции calcTileType: поле 56', () => {
    const result = calcTileType(56, 8);
    expect(result).toBe('bottom-left');
});

test('Тестирование функции calcTileType: поле 63', () => {
    const result = calcTileType(63, 8);
    expect(result).toBe('bottom-right');
});

test('Тестирование функции calcTileType: одно из нижних полей', () => {
    const result = calcTileType(58, 8);
    expect(result).toBe('bottom');
});

test('Тестирование функции calcTileType: одно из срединных полей', () => {
    const result = calcTileType(19, 8);
    expect(result).toBe('center');
});

// Тест вывода/невывода ошибки при создании объекта класса Character/при создании объекта, унаследованного от класса Character

test('Проверка вывода ошибки при создании объекта класса Character', () => {
    expect(() => new Character(1, 'bowman')).toThrow('Запрещено создавать объекты через new Character(level)');
})

test('Проверка, что ошибка не выводится при создании объекта, унаследованного от класса Character', () => {
    expect(() => new Bowman(1)).not.toThrow('Запрещено создавать объекты через new Character(level)');
})


// Проверка характеристик создаваемых персонажей 1 уровня

test('Проверка характеристик создаваемых персонажей 1 уровня', () => {
    const characters = [
        new Bowman(1), 
        new Daemon(1), 
        new Magician(1), 
        new Swordsman(1), 
        new Undead(1), 
        new Vampire(1)
    ];

    const result = [
        {attack: 25, defence: 25, health: 50, level: 1, type: 'bowman'},
        {attack: 10, defence: 10, health: 50, level: 1, type: 'daemon'},
        {attack: 10, defence: 40, health: 50, level: 1, type: 'magician'},
        {attack: 40, defence: 10, health: 50, level: 1, type: 'swordsman'},
        {attack: 40, defence: 10, health: 50, level: 1, type: 'undead'},
        {attack: 25, defence: 25, health: 50, level: 1, type: 'vampire'},
    ];

    expect(result).toEqual(characters);
})

// Проверка работы генератора characterGenerator

test('Проверка работы генератора characterGenerator', () => {
    const allowedTypes = [Bowman, Magician, Swordsman];
    const generator1 = characterGenerator(allowedTypes, 2).next().value;
    const generator2 = characterGenerator(allowedTypes, 2).next().value;
    const generator3 = characterGenerator(allowedTypes, 2).next().value;
    const charactersArr = [generator1.type, generator2.type, generator3.type];

    expect(['bowman', 'magician', 'swordsman']).toEqual(expect.arrayContaining(charactersArr));
})

// Проверка работы функции generateTeam

test('Проверка работы функции generateTeam', () => {
    const allowedTypes = [Bowman, Magician, Swordsman];
    const maxLevel = 3;
    const characterCount = 4;
    const createdTeam = generateTeam(allowedTypes, maxLevel, characterCount);
    const levelsArr = [];
    createdTeam.forEach(item => {
        levelsArr.push(item.level);
    })

    expect(createdTeam.length).toBe(characterCount);
    expect([1, 2, 3]).toEqual(expect.arrayContaining(levelsArr));
})

// Проверка корректности выводимых характеристик персонажа

test('Проверка корректности выводимых характеристик персонажа', () => {
    const gameController = new GameController();
    const character = {level: 1, attack: 25, defence: 25, health: 50};
    const result = gameController.characterParamTemplate(character);
    const expected = `\u{1F396} 1 \u{2694} 25 \u{1F6E1} 25 \u{2764} 50`;
    
    expect(result).toBe(expected);
})