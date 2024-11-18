<template>
  <div>
    <button @click="printReport">Print Report</button>
    <form @submit="addName">
      <label for="nameInput">Enter Name:</label>
      <input type="text" v-model="nameInput" />
    </form>
    <button @click="toggleLTR">LTR</button>
    <button @click="togglePaint">Paint</button>
    <div class="Paint_LTR_Container" v-show="isVissPaint">
      <div class="paint_ltr_grid" v-for="i in 18" :key="i">
        <p id="name">
          Mixed by: <span class="nameUnderline" v-html="nameFormat(nameInput)"></span><br>
          <img src="/lowesPlain.png"/><img class="qr" src="/lowes_survey_new_qr.png" />
        </p>
        <p id="note">
          We would love to hear about your<br>
          "10" plus experience!!
        </p>
        
        
      </div>
    </div>
    <div class="LTR_container" v-show="isVissLTR">
      <div class="ltr_grid" v-for="i in 8" :key="i">
        <p id="note">
          We hope you are happy with our service today,<br> Please take the survey at the bottom of your<br> recipt and
          give us a 10!
        </p>
        <p id="name">
          Mention my name <span class="nameUnderline" v-html="nameFormat(nameInput)"></span><br>
        </p>
        <img class="qr" src="/lowes_survey_new_qr.png" />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameInput: "",
      isVissLTR: true,
      isVissPaint: false,
    }
  },
  methods: {
    printReport() {
      window.print();
    },
    nameFormat(name) {
      let length = name.length
      let nName = ""
      if (length < 15) {
        let whiteSpace = "&nbsp;".repeat(15 - length);
        nName = name + whiteSpace;
        return nName;
      }
      else {
        return name;
      }
    },
    toggleLTR(){
      if (!this.isVissLTR){
        this.isVissLTR = !this.isVissLTR;
        this.isVissPaint = !this.isVissPaint
      }
      else{
        return
      }
      
    },
    togglePaint(){
      if (!this.isVissPaint){
        this.isVissPaint = !this.isVissPaint;
        this.isVissLTR = !this.isVissLTR
      }
      else{
        return
      }
    }
  }
}
</script>

<style>
.LTR_container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.Paint_LTR_Container{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

}
.paint_ltr_grid{
  /* border: 2px solid #000; */
  font-size: 24px;
  width: 400px;
  text-align: center;
  
}
.paint_ltr_grid .qr{
width: 100px;
height: auto;
}

.ltr_grid {
  width: 600px;
  text-align: center;
  font-size: 24px;
}

.qr {
  width: 200px;
  height: auto;
}

.nameUnderline {
  text-decoration: underline;
}

@media print {
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .LTR_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    width: 100%;
  }

  .ltr_grid {
    border: 1px solid #000;
    padding: 5px;
  }
  form{
    display: none;
  }


  @page {
    size: auto;
    margin: 0;
  }
}
</style>