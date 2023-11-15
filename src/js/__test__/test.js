import { calcTileType } from '../utils';

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
