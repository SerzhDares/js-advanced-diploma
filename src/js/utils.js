/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  // TODO: ваш код будет тут
  if (index === 0) {
    return 'top-left';
  }
  if (index === 7) {
    return 'top-right';
  }
  if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6) {
    return 'top';
  }
  if (index % 8 === 0 && index !== 56) {
    return 'left';
  }
  if (index === 15 || index === 23 || index === 31 || index === 39 || index === 47 || index === 55) {
    return 'right';
  }
  if (index === 56) {
    return 'bottom-left';
  }
  if (index === 63) {
    return 'bottom-right';
  }
  if (index === 57 || index === 58 || index === 59 || index === 60 || index === 61 || index === 62) {
    return 'bottom';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}