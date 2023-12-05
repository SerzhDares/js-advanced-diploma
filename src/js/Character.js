/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, attack, defence, type, stepRadius, attackRadius) {
    this.level = level;
    this.attack = attack;
    this.defence = defence;
    this.health = 50;
    this.type = type;
    this.stepRadius = stepRadius;
    this.attackRadius = attackRadius;
    
    // TODO: выбросите исключение, если кто-то использует "new Character()"
    if (new.target.name === 'Character') {
      throw new Error('Запрещено создавать объекты через new Character(level)');
    }
  }
}
