<template>
  <div class="minigolf-app" :class="currentTheme">
    <!-- Theme Selection Row at the Top (wow so cool) -->
    <div class="theme-selector-row">
      <span class="theme-label">Theme:</span>
      <div class="theme-buttons">
        <button 
          v-for="theme in ['standard', 'retro', 'emo', 'pastel']" 
          :key="theme"
          :class="['theme-btn', theme, { active: currentTheme === theme }]"
          @click="setTheme(theme)"
        >
          {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
        </button>
        
      </div>
      
    </div>
    <small class="disclaimer">Note: some themes are bugged and I chose most things at random. I also did this super fast so I know most is messed up but oh well.¯\_(ツ)_/¯</small>
    

    <div class="page-heading">
      <h1>Mini Golf Rules & Scorecard V1.0</h1>
      
      <p>Spin for a challenge, then track every stroke for your round.</p>
    </div>

    <div class="layout-grid">
        <!-- The Spinner card container -->
      <section class="card spinner-card">
        <div class="card-title-row">
          <h2>Rule Spinner</h2>
          <span class="status-pill" :class="{ active: isSpinning || isStopping }">{{ statusLabel }}</span>
        </div>

        <div class="spinner-stage">
            <!-- funny story, my first spinner... i acidently set the geometry of the arrow to spin rather than the wheel itself -->
          <div class="wheel-pointer"></div>
          <div class="wheel" :style="wheelStyle">
            <div v-for="(rule, index) in rules" :key="rule.name" class="wheel-label" :style="getRuleLabelStyle(index)">
              <span>{{ rule.name }}</span>
            </div>
            <div class="wheel-center">
              <span>{{ selectedRule ? selectedRule.name : 'Spin to play' }}</span>
            </div>
          </div>
        </div>

        <div class="control-row">
          <button class="primary btn-spin" @click="startSpin" :disabled="isSpinning || isStopping">Spin</button>
          <button class="secondary btn-stop" @click="stopSpin" :disabled="!isSpinning || isStopping">Stop</button>
          <button class="ghost" @click="resetSpin">Reset Wheel</button>
        </div>

        <div class="result-panel">
          <h3>{{ selectedRule ? selectedRule.name : 'No challenge selected yet' }}</h3>
          <p>{{ selectedRule ? selectedRule.description : 'Press Spin and then Stop to reveal a rule.' }}</p>
          <p v-if="caddyAssignment" class="caddy-note">{{ caddyAssignment }}</p>
        </div>
      </section>

      <!-- Scorecard Section -->
       <!-- This was the biggest pain in the world and still isn't right -->
      <section class="card scorecard-card">
        <div class="card-title-row">
          <h2>Scorecard</h2>
          <div class="card-actions">
            <button class="primary" @click="addPlayer">Add player</button>
            <button class="danger" @click="resetScorecard">Reset Scorecard</button>
            <button class="secondary" @click="exportScorecard">Export image</button>
          </div>
        </div>

        <!-- The actual card to be saved -->
        <div class="scorecard-export-area" ref="scorecardExport" :class="{ 'is-exporting': isExporting }">
          <div class="scorecard-table" :style="{ '--player-count': Math.max(players.length, 1) }">
            <div class="table-header-row">
              <div class="table-label">Hole</div>
              <div 
                v-for="(player, playerIndex) in players" 
                :key="player.id" 
                class="player-header"
                :style="getPlayerColumnStyle(playerIndex)"
              >
                <input v-model="player.name" :placeholder="`Player ${playerIndex + 1}`" />
                <!-- Figure out a way to add my favorite gif uh uh uh to the disabled button if trying to click -->
                <button class="remove-player" @click="removePlayer(player.id)" 
                :disabled="players.length === 1">Remove</button>
              </div>
            </div>

            <div class="table-section">
              <div class="section-label">Front 9</div>
              <div v-for="holeIndex in frontNineHoles" :key="holeIndex" class="score-row">
                <div class="hole-label">{{ holeIndex + 1 }}</div>
                <div 
                  v-for="(player, playerIndex) in players" 
                  :key="player.id" 
                  class="score-cell"
                  :style="getPlayerColumnStyle(playerIndex)"
                >
                  <input v-model="player.scores[holeIndex]" type="number" min="0" inputmode="numeric" placeholder="0" />
                </div>
              </div>
              <div class="score-row total-row">
                <div class="hole-label">Front</div>
                <div 
                  v-for="(player, playerIndex) in players" 
                  :key="player.id" 
                  class="score-cell total-cell"
                  :style="getPlayerColumnStyle(playerIndex)"
                >
                  {{ getFrontNineTotal(player) }}
                </div>
              </div>
            </div>

            <div class="table-section">
              <div class="section-label">Back 9</div>
              <div v-for="holeIndex in backNineHoles" :key="holeIndex" class="score-row">
                <div class="hole-label">{{ holeIndex + 1 }}</div>
                <div 
                  v-for="(player, playerIndex) in players" 
                  :key="player.id" 
                  class="score-cell"
                  :style="getPlayerColumnStyle(playerIndex)"
                >
                  <input v-model="player.scores[holeIndex]" type="number" min="0" inputmode="numeric" placeholder="0" />
                </div>
              </div>
              <div class="score-row total-row">
                <div class="hole-label">Back</div>
                <div 
                  v-for="(player, playerIndex) in players" 
                  :key="player.id" 
                  class="score-cell total-cell"
                  :style="getPlayerColumnStyle(playerIndex)"
                >
                  {{ getBackNineTotal(player) }}
                </div>
              </div>
            </div>

            <div class="score-row final-total-row">
              <div class="hole-label">Total</div>
              <div 
                v-for="(player, playerIndex) in players" 
                :key="player.id" 
                class="score-cell total-cell final-total"
                :style="getPlayerColumnStyle(playerIndex)"
              >
                {{ getPlayerTotal(player) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Probs don't need but might be good -->
        <p v-if="players.length === 0" class="empty-state">Add at least one player to start tracking strokes.</p>
      </section>
    </div>

    <div class="rule-list">
      <h3>Challenge Rules</h3>
      <ul>
        <li v-for="rule in rules" :key="rule.name">
          <strong>{{ rule.name }}</strong> — {{ rule.description }}
        </li>
      </ul>
    </div>
  </div>
</template>
<!-- '#e6c3c3', '#edd2af', '#f5eda2', '#9cf7b8', '#87e8ed', '#a899f2', '#f09ecb', '#51b3f5' test colors -->
<!-- figure out how to fix the formating cause it's trashhhhhh -->
<script>
import { toPng } from 'html-to-image'

export default {
  name: 'MinigolfSpinner',
  data() {
    return {
      storageKey: 'minigolf-rules-scorecard-v1',
      themeStorageKey: 'minigolf-theme-v1',
      currentTheme: 'standard',
      pastelColors: [
        '#fef2f2', '#fff7ed', '#fefce8', '#f0fdf4', '#ecfeff', '#f5f3ff', '#fdf2f8', '#f0f9ff'
      ],
      //.·°՞( ̑ ᗜ ̑ )՞°·.
      // Dynamic thematic chromatic aesthetics for problematic wheel segments
      themeWheelPalettes: {
        standard: ['#1d4ed8', '#dc2626', '#f59e0b', '#10b981', '#8b5cf6', '#0f766e', '#f43f5e', '#6366f1'],
        retro: ['#f43f5e', '#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899'],
        emo: ['#7f1d1d', '#18181b', '#3f3f46', '#4c1d95', '#0f172a', '#27272a'],
        pastel: ['#fbcfe8', '#ccfbf1', '#fef08a', '#fed7aa', '#e0f2fe', '#cffafe']
      },
      rules: [
        { name: 'The Billiard', description: 'Line up your shot and push the putter like a pool cue instead of swinging it.' },
        { name: 'The Nutcracker', description: 'Stand directly over the ball and only hit it from between your legs.' },
        { name: 'The Lefty Swap', description: 'Switch your hands completely so your non-dominant hand is at the bottom of your grip.' },
        { name: 'The Flamingo', description: 'Balance on one leg for the entire setup, swing, and follow-through.' },
        { name: 'The Bank Shot', description: 'Your ball must bounce off at least one wall before it can go in the hole.' },
        { name: 'The Blind Putt', description: 'Close both eyes before you start your backswing.' },
        { name: 'The One-hander', description: 'Put one hand in your pocket or behind your back and play entirely with one hand.' },
        { name: 'The Croque Tap', description: 'You can only hit the ball using the tiny flat side-edges of the putter head.' },
        { name: 'The Caddy Hack', description: 'Your opponent chooses exactly the club style or stance you must use for your next shot.(Please be nice!)' },
        { name: 'The Moving Target', description: 'You can only strike the ball while you are actively walking or stepping forward.' }
      ],
      players: [],
      currentAngle: 0,
      velocity: 0,
      isSpinning: false,
      isStopping: false,
      selectedRule: null,
      caddyAssignment: '',
      spinFrame: null,
      isExporting: false
    }
  },
  computed: {
    // I don't know why I struggle with math sometimes cause some of this is just basic.... thats because i'm basic Note AI autocomplete wanted me to write "bassically a potato" lol.
    segmentAngle() {
      return 360 / this.rules.length
    },
    wheelGradient() {
      // Grab palette based on selected theme, fallback to standard if missing
      const colors = this.themeWheelPalettes[this.currentTheme] || this.themeWheelPalettes.standard
      
      // Don't ask too many questions, the internet is your friend and so are guides
      const gradientString = this.rules.map((rule, index) => {
        const start = index * this.segmentAngle
        const end = (index + 1) * this.segmentAngle
        return `${colors[index % colors.length]} ${start}deg ${end}deg`
      }).join(', ')
      // Math term meaing cone or... something
      return `conic-gradient(${gradientString})`
    },
    wheelStyle() {
      return {
        transform: `rotate(${this.currentAngle}deg)`,
        background: this.wheelGradient
      }
    },
    frontNineHoles() {
      return Array.from({ length: 9 }, (_, index) => index)
    },
    backNineHoles() {
      return Array.from({ length: 9 }, (_, index) => index + 9)
    },
    // i really needed this cause at the begining, nothing would animate but it was actually spinning
    statusLabel() {
      if (this.isStopping) return 'Slowing down'
      if (this.isSpinning) return 'Spinning'
      return 'Ready'
    }
  },
  watch: {
    players: {
      deep: true,
      handler() {
        this.saveState()
      }
    }
  },
  mounted() {
    this.loadState()
    const savedTheme = localStorage.getItem(this.themeStorageKey)
    if (savedTheme) {
      this.currentTheme = savedTheme
    }
  },
  beforeUnmount() {
    if (this.spinFrame) {
      cancelAnimationFrame(this.spinFrame)
    }
  },
  methods: {
    setTheme(theme) {
        if (theme === "pastel" && this.currentTheme !== "pastel") {
            alert("flashbang ୧༼ಠ益ಠ༽୨")
        }
        this.currentTheme = theme
        localStorage.setItem(this.themeStorageKey, theme)
    },
    getPlayerColumnStyle(index) {
      return {
        backgroundColor: this.pastelColors[index % this.pastelColors.length]
      }
    },
    createDefaultPlayer(index) {
        // I just think its so funny, not only is a uuid completly unessesary and overkill but to use webcrypto to make sure its super secure is just hilarious
      return {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${index}`,
        name: '',
        scores: Array(18).fill('')
      }
    },
    loadState() {
      try {
        const raw = localStorage.getItem(this.storageKey)
        if (!raw) {
          this.players = [this.createDefaultPlayer(0)]
          return
        }

        const parsed = JSON.parse(raw)
        if (!parsed.players || !Array.isArray(parsed.players)) {
          this.players = [this.createDefaultPlayer(0)]
          return
        }

        this.players = parsed.players.map((player, index) => ({
          ...this.createDefaultPlayer(index),
          ...player,
          name: player.name || player.initials || '',
          scores: Array.isArray(player.scores)
            ? player.scores.slice(0, 18).concat(Array(18).fill('')).slice(0, 18)
            : Array(18).fill('')
        }))

        if (!this.players.length) {
          this.players = [this.createDefaultPlayer(0)]
        }
      } catch (error) {
        console.warn('Unable to load scorecard state', error)
        this.players = [this.createDefaultPlayer(0)]
      }
    },
    saveState() {
      try {
        const compactPlayers = this.players.map(({ id, name, scores }) => ({ id, name, scores }))
        localStorage.setItem(this.storageKey, JSON.stringify({ players: compactPlayers }))
      } catch (error) {
        console.warn('Unable to save scorecard state', error)
      }
    },
    addPlayer() {
      this.players.push(this.createDefaultPlayer(this.players.length))
    },
    removePlayer(id) {
      if (this.players.length === 1) return
      this.players = this.players.filter((player) => player.id !== id)
    },
    resetScorecard() {
      if (confirm('Are you sure you want to reset the scorecard? All current score data will be permanently cleared.')) {
        localStorage.removeItem(this.storageKey)
        this.players = [this.createDefaultPlayer(0)]
      }
    },
    getPlayerTotal(player) {
      return player.scores.reduce((total, value) => {
        const parsed = Number(value)
        return total + (Number.isFinite(parsed) && parsed >= 0 ? parsed : 0)
      }, 0)
    },
    getFrontNineTotal(player) {
      return this.getHoleRangeTotal(player, this.frontNineHoles)
    },
    getBackNineTotal(player) {
      return this.getHoleRangeTotal(player, this.backNineHoles)
    },
    getHoleRangeTotal(player, holeIndexes) {
      return holeIndexes.reduce((total, holeIndex) => {
        const parsed = Number(player.scores[holeIndex])
        return total + (Number.isFinite(parsed) && parsed >= 0 ? parsed : 0)
      }, 0)
    },
    // gotta love the stupid names spinning around
    getRuleLabelStyle(index) {
      const angle = ((index + 0.5) * this.segmentAngle) - 90
      const radians = (angle * Math.PI) / 180
      const radius = 40
      return {
        left: `${50 + radius * Math.cos(radians)}%`,
        top: `${50 + radius * Math.sin(radians)}%`
      }
    },
    // for the following adjust the speeds at a later date, espescially the slow down. I like the suspense
    startSpin() {
      if (this.isSpinning || this.isStopping) return

      this.isSpinning = true
      this.isStopping = false
      this.selectedRule = null
      this.caddyAssignment = ''
      this.velocity = 8 + Math.random() * 6
      if (this.spinFrame) cancelAnimationFrame(this.spinFrame)
      this.animateSpin()
    },
    stopSpin() {
      if (!this.isSpinning || this.isStopping) return
      this.isStopping = true
    },
    resetSpin() {
      if (this.spinFrame) cancelAnimationFrame(this.spinFrame)
      this.isSpinning = false
      this.isStopping = false
      this.velocity = 0
      this.selectedRule = null
      this.caddyAssignment = ''
    },
    animateSpin() {
      if (!this.isSpinning) return

      if (!this.isStopping) {
        this.velocity = Math.min(this.velocity + 0.18, 18)
      } else {
        this.velocity *= 0.94
        if (this.velocity < 0.18) {
          this.isSpinning = false
          this.isStopping = false
          this.selectRuleFromAngle()
          return
        }
      }

      this.currentAngle = (this.currentAngle + this.velocity) % 360
      this.spinFrame = requestAnimationFrame(this.animateSpin)
    },
    // yay more math (¬_¬)
    selectRuleFromAngle() {
      const normalizedAngle = (360 - (this.currentAngle % 360) + 360) % 360
      const index = Math.floor(normalizedAngle / this.segmentAngle) % this.rules.length
      this.selectedRule = this.rules[index]

      if (this.selectedRule.name === 'The Caddy Hack') {
        const activePlayers = this.players.filter((player) => (player.name || '').trim())
        if (activePlayers.length) {
          const chosen = activePlayers[Math.floor(Math.random() * activePlayers.length)]
          const label = (chosen.name || '').trim() || 'A player'
          this.caddyAssignment = `${label} gets to choose the next style or stance.`
        } else {
          this.caddyAssignment = 'Add players to decide the caddy challenge. Which means you should probably add players OR NAMES. (╯°□°）╯︵ ┻━┻'
        }
      }
    },
    exportScorecard() {
      const node = this.$refs.scorecardExport
      if (!node) return

      this.isExporting = true

      this.$nextTick(() => {
        toPng(node, {
          cacheBust: true,
          backgroundColor: '#ffffff',
          pixelRatio: 2
        })
          .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'minigolf-scorecard.png'
            link.href = dataUrl
            link.click()
          })
          .catch((error) => {
            console.error('Unable to export scorecard image', error)
            alert('The scorecard image could not be exported right now. Let me know and I can figure something else out.')
          })
          .finally(() => {
            this.isExporting = false
          })
      })
    }
  }
}
</script>

<style scoped>
/* Top Navigation Theme Controls Styles */
.theme-selector-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  align-self: center;
}

.theme-label {
  font-weight: 700;
  font-size: .9rem;/* cause 1.0 would be too good for them*/
}

.theme-buttons {
  display: flex;
  gap: 1.4rem;
}

.theme-btn {
  padding: .35rem .8rem;
  font-size: 0.8rem;
  border-radius: 999px;
  border: 1px solid #d5cbe1; /**I know you cant see it but its there and technically blueish */
  background: white;
  color: #334155;
  transition: all 0.2s ease;/** Not even sure this ever did anything */
}

.theme-btn.active {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* ==========================================================================
                                                                                                                                                                _..._                  .-'''-.                                              
                                                                                                        .---.                        _______              .-'_..._''.              '   _    \                                            
           .             __.....__      __  __   ___        __.....__                                   |   |.--.  _..._             \  ___ `'.   .--.  .' .'      '.\      .--. /   /` '.   \    _..._                                  
         .'|         .-''         '.   |  |/  `.'   `.  .-''         '.                  .-.          .-|   ||__|.'     '.  .--./)    ' |--.\  \  |__| / .'                 |__|.   |     \  '  .'     '.                .-.          .- 
     .| <  |        /     .-''"'-.  `. |   .-.  .-.   '/     .-''"'-.  `.                .\ \        / /|   |.--.   .-.   ./.''\\     | |    \  ' .--.. '               .|  .--.|   '      |  '.   .-.   .         .-,.--.\ \        / / 
   .' |_ | |       /     /________\   \|  |  |  |  |  /     /________\   \             .' |\ \      / / |   ||  |  '   '  | |  | |    | |     |  '|  || |             .' |_ |  |\    \     / / |  '   '  |    __   |  .-. |\ \      / /  
 .'     || | .'''-.|                  ||  |  |  |  |  |                  |        _  .'     \ \    / /  |   ||  |  |   |  |\`-' /     | |     |  ||  || |           .'     ||  | `.   ` ..' /  |  |   |  | .:--.'. | |  | | \ \    / /   
'--.  .-'| |/.'''. \    .-------------'|  |  |  |  |  \    .-------------'      .' |'--.  .-'\ \  / /   |   ||  |  |   |  |/("'`      | |     ' .'|  |. '          '--.  .-'|  |    '-...-'`   |  |   |  |/ |   \ || |  | |  \ \  / /    
   |  |  |  /    | |\    '-.____...---.|  |  |  |  |  |\    '-.____...---.     .   | / |  |   \ `  /    |   ||  |  |   |  |\ '---.    | |___.' /' |  | \ '.          .|  |  |  |               |  |   |  |`" __ | || |  '-    \ `  /     
   |  |  | |     | | `.             .' |__|  |__|  |__| `.             .'    .'.'| |// |  |    \  /     |   ||__|  |   |  | /'""'.\  /_______.'/  |__|  '. `._____.-'/|  |  |__|               |  |   |  | .'.''| || |         \  /      
   |  '.'| |     | |   `''-...... -'                      `''-...... -'    .'.'.-'  /  |  '.'  / /      '---'   |  |   |  |||     || \_______|/           `-.______ / |  '.'                   |  |   |  |/ /   | || |         / /       
   |   / | '.    | '.                                                      .'   \_.'   |   /`-' /               |  |   |  |\'. __//                                `  |   /                    |  |   |  |\ \._,\ '/_|     |`-' /        
   `'-'  '---'   '---'                                                                 `'-' '..'                '--'   '--' `'---'                                    `'-'                     '--'   '--' `--'  `"         '..'         

   ========================================================================== */

/* 1. STANDARD THEME STYLE */
.minigolf-app.standard {
  --app-bg: transparent;
  --font-family: inherit;
}
.standard .card {
  background: linear-gradient(135deg, #ffffff 0%, #eef4ff 100%);
  border: 1px solid #dbeafe;
}
/* Subtle blue-tinted backgrounds to sit nicely over the standard card gradient. I don't care if you know about it or not. */
.standard .result-panel { background: rgba(239, 246, 255, 0.85); border-color: #bfdbfe; }
.standard .rule-list { background: rgba(248, 250, 25fc, 0.9); border-color: #cbd5e1; }
.standard .score-cell input { background: #ffffff; border-color: #cbd5e1; color: #0f172a; }
.standard .score-cell input:focus { background: #f8fafc; border-color: #2563eb; }


/* 2. RETRO THEME STYLE (80s Neon Arcade) */
.minigolf-app.retro {
  font-family: 'Courier New', Courier, monospace;
  background-color: #111827;
  color: #38bdf8;
}
.retro .page-heading h1 { color: #f43f5e; text-shadow: 2px 2px #f59e0b; }
.retro .page-heading p { color: #fecdd3; }
.retro .card { background: linear-gradient(180deg, #1f2937 0%, #111827 100%); border: 2px solid #f43f5e; box-shadow: 0 0 15px #f43f5e; }
.retro h2, .retro h3 { color: #a855f7; }
.retro button.primary { background: #f43f5e; color: white; border: 2px solid #fff; }
.retro button.secondary { background: #a855f7; color: white; border: 2px solid #fff; }
.retro .status-pill { background: #fecdd3; color: #9f1239; }
.retro .wheel { border-color: #f43f5e; box-shadow: 0 0 20px #06b6d4; }
.retro .wheel-center { background: #111827; color: #38bdf8; border-color: #f43f5e; }
.retro .scorecard-export-area { background: #1f2937; border-color: #a855f7; }
/* Dark voids, like my cat's eyes, panels with bright neon glowing borders to distinguish surfaces */
.retro .result-panel { background: #0b0f19; border: 1px dashed #06b6d4; }
.retro .result-panel p { color: #e2e8f0; }
.retro .rule-list { background: #0b0f19; border: 1px solid #a855f7; color: #38bdf8; }
.retro .score-cell input { background: #111827; border: 1px solid #38bdf8; color: #10b981; font-weight: bold; }
.retro .score-cell input:focus { background: #000000; border-color: #f43f5e; color: #fff; }


/* 3. EMO THEME STYLE (Goth / Grunge Darkroom) */
.minigolf-app.emo {
  font-family: 'Georgia', serif;
  background-color: #000000;
  color: #e2e8f0;
}
.emo .page-heading h1 { color: #b91c1c; text-transform: lowercase; }
.emo .page-heading p { color: #64748b; }
.emo .card { background: linear-gradient(180deg, #111111 0%, #050505 100%); border: 1px solid #333; box-shadow: none; }
.emo h2, .emo h3 { color: #ffffff; border-bottom: 1px solid #b91c1c; padding-bottom: 2px; }
.emo button.primary { background: #451a03; color: #f8fafc; border: 1px solid #b91c1c; }
.emo button.secondary { background: #1c1917; color: #94a3b8; border: 1px solid #475569; }
.emo button.danger { background: #7f1d1d; color: white; }
.emo .status-pill { background: #3f3f46; color: #f4f4f5; }
.emo .scorecard-export-area { background: #18181b; border-color: #3f3f46; }
.emo .wheel { border-color: #3f3f46; }
.emo .wheel-center { background: #111; color: #e2e8f0; border-color: #b91c1c; }
/* Ash tones and deep blood-red hints to contrast against pure black backgrounds to show the anguish inside muyh head. whoever sang that */
.emo .result-panel { background: #1c1917; border-color: #7f1d1d; }
.emo .result-panel p { color: #d6d3d1; }
.emo .rule-list { background: #18181b; border-color: #444; color: #a1a1aa; }
.emo .player-header input, .emo .score-cell input { background: #27272a; color: #fff; border-color: #52525b; }
.emo .score-cell input:focus { background: #09090b; border-color: #b91c1c; }


/* 4. PASTEL THEME STYLE (Soft Marshmallow Grid) */
.minigolf-app.pastel {
  background-color: #fafaf9;
  color: #44403c;
}
.pastel .page-heading h1 { color: #db2777; }
.pastel .card { background: linear-gradient(135deg, #ffffff 0%, #fff1f2 100%); border: 2px solid #fbcfe8; box-shadow: 0 10px 20px rgba(251,207,232,0.3); }
.pastel button.primary { background: #fbcfe8; color: #9d174d; }
.pastel button.secondary { background: #ccfbf1; color: #115e59; }
.pastel .status-pill { background: #fef08a; color: #854d0e; }
.pastel .wheel { border-color: #fbcfe8; }
.pastel .wheel-center { background: #fff; color: #db2777; border-color: #ccfbf1; }
.pastel .scorecard-export-area { background: #fff; border-color: #fbcfe8; }
/* Creamy off-whites and soft pink washes to stand out subtly on the clean panels. un fortunatley i forgot the Windex*/
.pastel .result-panel { background: #fffbeb; border-color: #fef08a; }
.pastel .result-panel p { color: #78350f; }
.pastel .rule-list { background: #fdf2f8; border-color: #fbcfe8; color: #57534e; }
.pastel .score-cell input { background: #ffffff; border-color: #fed7aa; color: #44403c; }
.pastel .score-cell input:focus { background: #fff7ed; border-color: #db2777; }

/* Base Component Layout */
.minigolf-app {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  transition: all 0.3s ease;
}

.page-heading {
  text-align: center;
}

.page-heading h1 {
  margin-bottom: 0.3rem;
  font-size: clamp(1.7rem, 2.2rem, 2.6rem);
}

.page-heading p {
  margin: 0;
  color: #475569;
}

.layout-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: minmax(300px, 0.95fr) minmax(0, 1.4fr);
  align-items: start;
}

.card {
  border-radius: 1.25rem;
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
  padding: 1rem;
  width: 100%;
  transition: background 0.3s ease, border 0.3s ease;
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-title-row h2,
.result-panel h3,
.rule-list h3 {
  margin: 0;
}

.status-pill {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: #dbeafe;
  color: #1e3a8a;
  font-size: 0.85rem;
  font-weight: 700;
}

.status-pill.active {
  background: #fef3c7;
  color: #92400e;
}

.spinner-stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
  padding-top: 0.75rem;
}

.wheel-pointer {
  position: absolute;
  top: -0.4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-top: 32px solid #f59e0b;
  z-index: 2;
}

.wheel {
  width: min(78vw, 320px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 12px solid #0f172a;
  box-shadow: inset 0 0 0 8px rgba(255, 255, 255, 0.2), 0 16px 32px rgba(15, 23, 42, 0.2);
  transition: transform 0.06s linear, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.wheel-label {
  position: absolute;
  transform: translate(-50%, -50%);
  max-width: 70px;
  font-size: 0.62rem;
  line-height: 1.05;
  font-weight: 700;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
  z-index: 1;
}

.wheel-center {
  position: absolute;
  inset: 30%;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  text-align: center;
  padding: 0.75rem;
  border: 2px solid #cbd5e1;
  z-index: 2;
  color: #334155;
  transition: background 0.3s ease, color 0.3s ease;
}

.control-row,
.card-actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

button {
  border: none;
  border-radius: 999px;
  padding: 0.65rem 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.3s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.primary {
  background: #2563eb;
  color: white;
}

button.secondary {
  background: #0f766e;
  color: white;
}

button.danger {
  background: #dc2626;
  color: white;
}

button.ghost {
  background: #e2e8f0;
  color: #0f172a;
}

.result-panel {
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  padding: 0.9rem 1rem;
  border: 1px solid #dbebff;
}

.result-panel p {
  margin: 0.35rem 0 0;
  color: #334155;
}

.caddy-note {
  font-style: italic;
  color: #0f766e;
}

.scorecard-export-area {
  background: white;
  border-radius: 1rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  overflow-x: auto;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.scorecard-export-area.is-exporting {
  overflow: hidden;
}

.scorecard-export-area.is-exporting .remove-player {
  display: none;
}

.scorecard-table {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: calc(58px + 88px * var(--player-count, 1));
}

.table-header-row,
.score-row {
  display: grid;
  grid-template-columns: 58px repeat(var(--player-count, 1), minmax(0, 1fr));
  gap: 0.4rem;
  align-items: center;
}

.table-header-row {
  font-weight: 700;
  color: #0f172a;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid #0f172a;
}

.player-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.4rem;
  border-radius: 0.5rem;
}

.player-header input,
.score-cell input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 0.55rem;
  padding: 0.42rem 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  color: #000;
}

.table-section {
  display: flex;
  flex-direction: column;
  gap: 0.33rem;
  padding: 0.25rem 0 0.35rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-label {
  font-size: 0.8rem;
  font-weight: 800;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.1rem;
}

.hole-label {
  font-weight: 700;
  text-align: center;
  color: #334155;
}

.player-header,
.score-cell {
  min-width: 0;
  width: 100%;
  padding: 0.2rem;
  border-radius: 0.35rem;
}

.remove-player {
  background: #fee2e2;
  color: #991b1b;
  padding: 0.35rem 0.55rem;
  font-size: 0.78rem;
  flex-shrink: 0;
}

.total-row,
.final-total-row {
  font-weight: 700;
  color: #334155;
  padding-top: 0.1rem;
}

.total-cell {
  font-weight: 800;
  color: #2563eb;
  text-align: center;
}

.final-total {
  border: 2px solid #2563eb;
}

.empty-state {
  margin: 0.8rem 0 0;
  color: #64748b;
}

.rule-list {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.1rem;
  border: 1px solid #dbeafe;
  padding: 1rem 1.1rem;
  color: #1e293b;
}

.rule-list ul {
  margin: 0.75rem 0 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.45rem;
}

.disclaimer {
    text-align: center;
    font-size: 0.75rem;
}

@media (max-width: 900px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }

  .spinner-stage {
    margin-bottom: 0.75rem;
  }
}

@media (max-width: 640px) {
  .minigolf-app {
    padding-inline: 0.4rem;
  }

  .card {
    padding: 0.9rem;
  }

  .card-title-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .control-row,
  .card-actions {
    width: 100%;
  }

  .control-row button,
  .card-actions button {
    flex: 1;
    justify-content: center;
  }

  .scorecard-table {
    min-width: calc(44px + 70px * var(--player-count, 1));
  }

  .table-header-row,
  .score-row {
    grid-template-columns: 44px repeat(var(--player-count, 1), minmax(0, 1fr));
    gap: 0.3rem;
  }

  .player-header {
    gap: 0.25rem;
  }

  .player-header input,
  .score-cell input {
    padding: 0.35rem 0.4rem;
    font-size: 0.82rem;
  }

  .wheel {
    width: min(84vw, 300px);
  }
}
</style>