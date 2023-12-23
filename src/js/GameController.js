import GamePlay from './GamePlay';
import themes from './themes';
import { generateTeam } from './generators';
import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import PositionedCharacter from './PositionedCharacter';
import GameState from './GameState';

const playerCharacters = [Bowman, Swordsman, Magician];
let playerPositions = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];

const computerCharacters = [Daemon, Undead, Vampire];
let computerPositions = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];

const checkPositionArr = [];

export default class GameController {
  constructor(gamePlay, stateService, gameTeam) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameTeam = gameTeam;
    this.gameState = null;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gameplay = new GamePlay();
    this.gameState = new GameState();
    this.gamePlay.drawUi(themes.prairie);
    this.gameTeam = [...this.playerTeamGeneration(), ...this.computerTeamGeneration()];
    this.gamePlay.redrawPositions(this.gameTeam);
    this.listenerForCellEnter();
    this.listenerForCellLeave();
    this.listenerForCellClick();
  }

  playerTeamGeneration() {
    const generatedTeam = generateTeam(playerCharacters, 2, 3);
    const playerTeamArray = [];
    for (let i = 0; i < generatedTeam.length; i++) {
      const position = playerPositions[Math.floor(Math.random() * playerPositions.length)];
      playerTeamArray.push(new PositionedCharacter(generatedTeam[i], position));
      checkPositionArr.push(position);
      playerPositions = playerPositions.filter(elem => !checkPositionArr.includes(elem));
    }
    return playerTeamArray;
  }

  computerTeamGeneration() {
    const generatedTeam = generateTeam(computerCharacters, 2, 3);
    const computerTeamArray = [];
    for (let i = 0; i < generatedTeam.length; i++) {
      const position = computerPositions[Math.floor(Math.random() * computerPositions.length)];
      computerTeamArray.push(new PositionedCharacter(generatedTeam[i], position));
      checkPositionArr.push(position);
      computerPositions = computerPositions.filter(elem => !checkPositionArr.includes(elem));
    }
    return computerTeamArray;
  }

  listenerForCellClick() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this)); 
  }

  onCellClick(index) {
    // TODO: react to click
    const characterInCell = this.gameTeam.find(char => char.position === index);
    if (characterInCell) {
      const hero = characterInCell.character.type;
      if (hero === 'bowman' || hero === 'swordsman' || hero === 'magician') {
        if (this.gameState.selectedHero) {
          this.gamePlay.deselectCell(this.gameState.selectedHero.position);
        }
        this.gamePlay.selectCell(index);
        this.gameState.selectedHero = characterInCell;
        this.gameState.heroAllowedSteps = this.allowedStep(index, characterInCell.character);
        this.gameState.heroAllowedAttack = this.allowedAttack(index, characterInCell.character);
      } 
      if (hero === 'daemon' || hero === 'undead' || hero === 'vampire') {
        GamePlay.showError('Выберите персонажа своей команды!');
      }
    }
  }

  listenerForCellEnter() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const characterInCell = this.gameTeam.find(char => char.position === index);
    
    if (characterInCell) {
      const message = this.characterParamTemplate(characterInCell.character);
      this.gamePlay.showCellTooltip(message, index);
      this.gamePlay.setCursor('pointer');
    } else {
      this.gamePlay.setCursor('auto');
    }

    if (this.gameState.selectedHero) {
      if (this.gameState.heroAllowedSteps.includes(index) && !characterInCell) {
        this.gamePlay.setCursor('pointer');
        this.gamePlay.selectCell(index, 'green');
      } else if (characterInCell) {
        const hero = characterInCell.character.type;
        if (this.gameState.heroAllowedAttack.includes(index) && (hero === 'daemon' || hero === 'undead' || hero === 'vampire')) {
          this.gamePlay.setCursor('crosshair');
          this.gamePlay.selectCell(index, 'red');
        }
      } else {
        this.gamePlay.setCursor('not-allowed');
      }
    }
  }

  characterParamTemplate(hero) {
    return `\u{1F396} ${hero.level} \u{2694} ${hero.attack} \u{1F6E1} ${hero.defence} \u{2764} ${hero.health}`;
  }

  listenerForCellLeave() {
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
    if (this.gameState.selectedHero && (this.gameState.selectedHero.position !== index)) {
      this.gamePlay.deselectCell(index);
    }
  }

  allowedStep(index, hero) {

    const allowedSteps = [];
    const leftAllowedSteps = [];
    const rightAllowedSteps = [];
    
    for (let i = 1; i <= hero.stepRadius; i++) {
      const topCell = index - 8 * i;
      const bottomCell = index + 8 * i;
      const leftCell = index - i;
      const rightCell = index + i;
      if (topCell >= 0) {
        allowedSteps.push(topCell);
      }
      if (bottomCell <= 63) {
        allowedSteps.push(bottomCell);
      }
      if ((index % 8 !== 0) && (leftAllowedSteps[0] % 8 !== 0)) {
        leftAllowedSteps.push(leftCell);
        const topLeftDiagonalCell = leftCell - 8 * i;
        const bottomLeftDiagonalCell = leftCell + 8 * i;
        if (topLeftDiagonalCell >= 0) {
          allowedSteps.push(topLeftDiagonalCell);
        }
        if (bottomLeftDiagonalCell >= 0) {
          allowedSteps.push(bottomLeftDiagonalCell);
        }
      }
      if (((index + 1) % 8 !== 0) && ((rightAllowedSteps[0] + 1) % 8 !== 0)) {
        rightAllowedSteps.push(rightCell);
        const topRightDiagonalCell = rightCell - 8 * i;
        const bottomRightDiagonalCell = rightCell + 8 * i;
        if (bottomRightDiagonalCell >= 0) {
          allowedSteps.push(bottomRightDiagonalCell);
        }
        if (topRightDiagonalCell >= 0) {
          allowedSteps.push(topRightDiagonalCell);
        }
      }
    }

    return [...allowedSteps, ...leftAllowedSteps, ...rightAllowedSteps];
  }

  allowedAttack(index, hero) {
    
    const allowedAttack = [];
    const leftAllowedAttack = [];
    const rightAllowedAttack = [];
    
    for (let i = 1; i <= hero.attackRadius; i++) {
      const topCell = index - 8 * i;
      const bottomCell = index + 8 * i;
      const leftCell = index - i;
      const rightCell = index + i;
      if (topCell >= 0) {
        allowedAttack.push(topCell);
      }
      if (bottomCell <= 63) {
        allowedAttack.push(bottomCell);
      }
      if ((index % 8 !== 0) && (leftAllowedAttack[0] % 8 !== 0)) {
        leftAllowedAttack.push(leftCell);
      }
      if (((index + 1) % 8 !== 0) && ((rightAllowedAttack[0] + 1) % 8 !== 0)) {
        rightAllowedAttack.push(rightCell);
      }
    }

    for (let j = 1; j <= hero.attackRadius; j++) {
      for (let k = 0; k <= leftAllowedAttack.length - 1; k++) {
        const topLeftCell = leftAllowedAttack[k] - 8 * j;
        const bottomLeftCell = leftAllowedAttack[k] + 8 * j;
        if (topLeftCell >= 0) {
          allowedAttack.push(topLeftCell);
        }
        if (bottomLeftCell <= 63) {
          allowedAttack.push(bottomLeftCell);
        }
      }

      for (let l = 0; l <= rightAllowedAttack.length - 1; l++) {
        const topRightCell = rightAllowedAttack[l] - 8 * j;
        const bottomRightCell = rightAllowedAttack[l] + 8 * j;
        if (topRightCell >= 0) {
          allowedAttack.push(topRightCell);
        }
        if (bottomRightCell <= 63) {
          allowedAttack.push(bottomRightCell);
        }
      }
    }

    return [...allowedAttack, ...leftAllowedAttack, ...rightAllowedAttack];
  }
}
