new Vue({
	el: '#desafio',
	data: {
		openButtons: false,
		win: undefined,
		actions: [],
		users: [
			{
				name: "Jogador",
				life: 100,
			},
			{
				name: "Monstro",
				life: 100,
			}]
	},
	methods: {
		changeLifes(playerScore, monsterScore) {
			const new_life_player = this.users[0].life + monsterScore
			const new_life_monster = this.users[1].life + playerScore

			this.users[0].life = new_life_player < 0 ? 0 : new_life_player > 100 ? 100 : new_life_player
			this.users[1].life = new_life_monster <= 0 ? 0 : new_life_monster

			if (new_life_player <= 0) this.onWin("Você perdeu!!! :(")
			if (new_life_monster <= 0) this.onWin("Você ganhou!!! :)")
			if (new_life_player <= 0 && new_life_monster <= 0) this.onWin(this.win = "Empate :/")

		},

		onWin(msg) {
			this.win = msg
			this.openButtons = false
		},

		setActions(player_text, monster_text) {
			const action_monster = {
				user: "Monstro",
				text: monster_text
			}

			const action_player = {
				user: "Jogador",
				text: player_text
			}

			this.actions.unshift(action_player)
			this.actions.unshift(action_monster)
		},

		attack() {
			console.log("oi")
			const monster_damage = Math.floor(Math.random() * 4) + 8;
			const player_damage = Math.floor(Math.random() * 4) + 7;

			this.setActions("atingiu monstro com " + player_damage, "atingiu jogador com " + monster_damage)
			this.changeLifes((player_damage * -1), (monster_damage * -1))

		},

		healing() {
			const monster_damage = (Math.floor(Math.random() * 4) + 7)
			const player_healing = (Math.floor(Math.random() * 4) + 8)

			this.setActions("ganhou força de " + player_healing, "atingiu jogador com " + monster_damage)
			this.changeLifes(0, player_healing + (monster_damage * -1))
		},

		specialAttack() {
			const monster_damage = (Math.floor(Math.random() * 4) + 7)
			const player_damage = Math.floor(Math.random() * 4) + 8;

			this.setActions("atingiu monstro com " + player_damage, "atingiu jogador com " + monster_damage)
			this.changeLifes((player_damage * -1), (monster_damage * -1))

		},

		reset(open) {
			this.users[0].life = 100
			this.users[1].life = 100
			this.actions = []
			this.win = undefined
			this.openButtons = open

		}
	}
});
