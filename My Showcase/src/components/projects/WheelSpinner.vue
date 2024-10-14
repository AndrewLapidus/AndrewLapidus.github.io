<template>
    <!-- Just so you know, this was such a pain to move from html ans js to vue.
     Most of the time the arrow either was attachted to the wheel or would generate one per section -->
    <div class="WheelSpinner">
        
      <section>
        <form @submit.prevent="addName">
          <label for="nameInput">Enter Name:</label>
          <input type="text" v-model="nameInput" required />
          <button type="submit">Add Name</button>
        </form>
      </section>
      <section>
        <label for="exportNames"> Export Names</label>
        <button @click="exportNames">Export</button>
      </section>
      <section>
        <form @submit.prevent="loadNames">
          <label for="importName">Import names</label>
          <input type="text" v-model="importName" placeholder="Paste Code Here" />
          <button type="submit">Import</button>
        </form>
      </section>
      <div id="namesContainerbox">
        <button @click="displayNames">Edit Names</button>
        <button @click="removeDisplayNames">Save</button>
        <p ref="namesContainer"></p>
      </div>
      <div id="wheelBoy">
        <canvas ref="wheelCanvas" width="500" height="400"></canvas>
        <button @click="spinWheel">Spin</button>
        <button @click="stopWheel">Stop</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nameInput: '',
        importName: '',
        namesArr: [1,2,3,4,5,6],
        spinning: false,
        rotationAngle: 0,
        speedRotate: 0.2,
        selectedSection: 0,
        canvasContext: null,
        CENTER_X: 0,
        CENTER_Y: 0,
        RADIUS: 0,
        POINTER_LEN: 0,
      };
    },
    methods: {
      initCanvas() {
        const canvas = this.$refs.wheelCanvas;
        if (canvas) {
          this.canvasContext = canvas.getContext('2d');
          this.CENTER_X = canvas.width / 2;
          this.CENTER_Y = canvas.height / 2;
          this.RADIUS = Math.min(this.CENTER_X, this.CENTER_Y) - 1;
          this.POINTER_LEN = this.RADIUS * 0.8;
          this.drawWheel();
        } else {
          console.error('Canvas element not found');
        }
      },
      addName() {
        const name = this.nameInput;
        if (typeof name === 'string' && name.trim() !== '') {
          this.namesArr.push(name);
          console.log(`Name: ${name} added successfully.`);
          this.drawWheel();
        } else {
          console.log('Invalid name. Please do better.');
        }
        this.nameInput = ''; // Clear the input after adding cause god forbid if I don't someone is comming for me lol.
      },
      loadNames() {
        let encodedArray = this.importName.split(',');
        this.namesArr = encodedArray.map(encodedString => atob(encodedString));
        this.drawWheel();
      },
      exportNames() {
        const namesContainer = this.$refs.namesContainer;
        namesContainer.innerHTML = '';
        let input = document.createElement('input');
        input.type = 'text';
        let encodedString = this.namesArr.map(str => btoa(str));
        input.value = encodedString;
        let closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => (namesContainer.innerHTML = ''));
        namesContainer.appendChild(input);
        namesContainer.appendChild(closeButton);
      },
      displayNames() {
        const namesContainer = this.$refs.namesContainer;
        namesContainer.innerHTML = '';
        for (let i = 0; i < this.namesArr.length; i++) {
          const input = document.createElement('input');
          const removeButton = document.createElement('button');
          input.type = 'text';
          input.value = this.namesArr[i];
          input.addEventListener('input', event => this.updateName(i, event.target.value));
  
          removeButton.textContent = 'X';
          removeButton.addEventListener('click', () => this.removeNameX(i));
  
          namesContainer.appendChild(input);
          namesContainer.appendChild(removeButton);
        }
      },
      removeDisplayNames() {
        const namesContainer = this.$refs.namesContainer;
        namesContainer.innerHTML = '';
        this.drawWheel();
      },
      updateName(index, updatedName) {
        this.namesArr[index] = updatedName;
        console.log(`Name: ${updatedName} has been updated`);
      },
      removeNameX(index) {
        const removedName = this.namesArr.splice(index, 1)[0];
        console.log(`Name removed: ${removedName}`);
        this.displayNames();
      },
      drawWheel() {
      const ctx = this.canvasContext;
      ctx.clearRect(0, 0, this.$refs.wheelCanvas.width, this.$refs.wheelCanvas.height);
      const NUM_SEGMENTS = this.namesArr.length;
      const ANGLE_PER_SEG = (2 * Math.PI) / NUM_SEGMENTS;

      ctx.beginPath();
      ctx.arc(this.CENTER_X, this.CENTER_Y, this.RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = 'lightblue';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'blue';
      ctx.stroke();

      for (let i = 0; i < NUM_SEGMENTS; i++) {
        const START_ANGLE = i * ANGLE_PER_SEG + this.rotationAngle;
        const END_ANGLE = (i + 1) * ANGLE_PER_SEG + this.rotationAngle;

        ctx.beginPath();
        ctx.moveTo(this.CENTER_X, this.CENTER_Y);
        ctx.arc(this.CENTER_X, this.CENTER_Y, this.RADIUS, START_ANGLE, END_ANGLE);
        ctx.fillStyle = i % 2 === 0 ? 'lightgreen' : 'lightyellow';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        const SEG_CENTER_ANGLE = (START_ANGLE + END_ANGLE) / 2;
        const TEXT_X = this.CENTER_X + this.RADIUS * 0.5 * Math.cos(SEG_CENTER_ANGLE);
        const TEXT_Y = this.CENTER_Y + this.RADIUS * 0.5 * Math.sin(SEG_CENTER_ANGLE);

        ctx.save();
        ctx.translate(TEXT_X, TEXT_Y);
        ctx.rotate(SEG_CENTER_ANGLE);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(this.namesArr[i], 0, 0);
        ctx.restore();
      }

      // Fixed position for the arrow
      const ARROW_POSITION_X = this.CENTER_X + this.RADIUS + 60;
      const ARROW_POSITION_Y = this.CENTER_Y;

      // Draw the arrow
      ctx.beginPath();
      ctx.moveTo(ARROW_POSITION_X, ARROW_POSITION_Y - 10);
      ctx.lineTo(ARROW_POSITION_X, ARROW_POSITION_Y + 10);
      ctx.lineTo(ARROW_POSITION_X - 90, ARROW_POSITION_Y);
      ctx.fillStyle = 'red';
      ctx.fill();

      // Determine the winner based on selectedSection which does not work at all!!!
      const winnerIndex = this.selectedSection;
      const winner = this.namesArr[winnerIndex];
    //   console.log(`Winner: ${winner}`);
    },
      spinWheel() {
        if (!this.spinning) {
          this.spinning = true;
          this.rotateWheel();
        }
      },
      rotateWheel() {
        this.rotationAngle += this.speedRotate;
        this.drawWheel();
  
        if (this.spinning) {
          requestAnimationFrame(this.rotateWheel);
        }
      },
      async stopWheel() {
      while (this.speedRotate > 0.01) {
        this.speedRotate -= 0.03;
        await this.sleep(250);
      }
      this.spinning = false;
      this.speedRotate = 0.2;

      // Calculate selectedSection based on current rotationAngle which again fuck this!
      const fullRotation = 2 * Math.PI;
      let normalizedAngle = this.rotationAngle % fullRotation;
      if (normalizedAngle < 0) {
        normalizedAngle += fullRotation;
      }
      this.selectedSection = Math.floor((normalizedAngle / fullRotation) * this.namesArr.length);

      // Log to console to do jack shit, i honestly have no idea how to get this to work, granted 
      // I havent asked anyone other than myself
    //   console.log(`Calculated selectedSection: ${this.selectedSection}`);

      // Draw the wheel with the updated selectedSection
      this.drawWheel();
    },
      sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
      },
    },
    mounted() {
      this.initCanvas();
    },
  };
  </script>
  
  <style scoped>
  </style>