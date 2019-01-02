const spinMachine = document.getElementById('spinMachine');
const image = document.getElementsByTagName('img');
const message = document.getElementById('message');
const bankField = document.getElementById('bank');
const bet = document.getElementById('bet');
const spin = document.getElementById('spin');
const slots = [
  '../assets/img/apple.png',
  '../assets/img/orange.png',
  '../assets/img/grapes.png',
  '../assets/img/apple.png',
  '../assets/img/seven.png',
];

class Casino {
  constructor(params) {
    this.spinMachine = params.spinMachine;
    this.image = params.image;
    this.message = params.message;
    this.bankField = params.bankField;
    this.bet = params.bet;
    this.spin = params.spin;
    this.spin.disabled = true;
    this.slots = params.slots;
    this.betValue = [];
    this.bank = 500;
    this.bankField.innerText = this.bank;
  }

  getBet() {
    this.betValue.unshift(this.bet.value);
  }

  checkInput() {
    this.bet.addEventListener('input', () => {
      if (this.bet.value > 0 && this.bet.value <= this.bank / 2) {
        this.spin.disabled = false;
        this.message.innerText = '';
      } else if (this.bet.value <= 0) {
        this.spin.disabled = true;
        this.message.innerText = 'Введите сумму больше ноля';
      } else {
        this.spin.disabled = true;
        this.message.innerText = 'Сделайте ставку не больше половины оставшейся суммы!';
      }
    });
  }

  startShuffle() {
    for (let i = 0; i < 3; i += 1) {
      const shuffle = this.slots[Math.floor(Math.random() * this.slots.length)];
      this.image[i].src = shuffle;
      this.checkMatch(this.image[i]);
      this.image[i].classList.add('picture');
    }
  }

  checkMatch(pic) {
    const elem = this.spinMachine.children;
    for (let i = 0; i < elem.length - 1; i += 1) {
      if (pic.src === elem[i].src && pic !== elem[i]) {
        this.matches += 1;
      }
    }
  }

  changeBank() {
    const amount = Number(this.bank);
    const bit = Number(this.betValue[0]);
    this.bank = this.matches > 0 ? amount + bit : amount - bit;
    this.bankField.innerText = this.bank;
  }

  clearInput() {
    this.bet.value = '';
  }

  clearStyle() {
    for (let i = 0; i < 3; i += 1) {
      this.image[i].classList.remove('picture');
    }
    this.spin.disabled = true;
  }

  getStart() {
    this.spin.addEventListener('click', () => {
      this.clearStyle();
      this.matches = 0;
      this.getBet();
      this.startShuffle();
      this.changeBank();
      this.clearInput();
    });
    this.checkInput();
  }
}

const game = new Casino({
  spinMachine,
  spin,
  slots,
  message,
  bankField,
  bet,
  image,
});
game.getStart();
