<template>
    <div>

        <h1>Welcome to the plant watering app!!! Still under development but feel free to check it out</h1>
        <!-- If you are reading this just so you know i combined all components temporary -->


        <!-- <p>please enter your same info</p>
      <form >
        <label for="importData">Import data</label>
        <input type="text" v-model="importData" placeholder="Paste code here!"/>
        <button type="submit">Import</button>
      </form> -->
        <button @click="toggleForm">show/hide form</button>
        <button @click="toggleCal">show/hide callender</button>
        <div class="calender" v-show="isVissCal">
        <h2>Plant Watering Calendar</h2>
        
        <h3>Overdue</h3>
        <div>
        <section class="calendercard" v-for="item in plants" :key="item.name">
            <button type="checkbox"></button>
            <span>{{ item.name }}&nbsp;</span>
            <p> Due: {{ formatNextWater(item.nextWater) }}</p>
            <img :src="item.photo" alt="Plant photo" />
            
        </section>
    </div>


        <h3>Due Today</h3>
        <div>
        <section class="calendercard" v-for="item in plants" :key="item.name">
            <button type="checkbox"></button>
            <span>{{ item.name }}&nbsp;</span>
            <p> Due: {{ formatNextWater(item.nextWater) }}</p>
            <img :src="item.photo" alt="Plant photo" />
            
        </section>
    </div>

        <h3>Due Soon</h3>
        <div>
        <section class="calendercard" v-for="item in plants" :key="item.name">
            <button type="checkbox"></button>
            <span>{{ item.name }}&nbsp;</span>
            <p> Due: {{ formatNextWater(item.nextWater) }}</p>
            <img :src="item.photo" alt="Plant photo" />
            
        </section>
    </div>
    </div>

        <div class="plantform" v-show="isVissForm">
            <h1>Plant Information Form</h1>
            <form @submit.prevent="handleSubmit">
                <label for="plantName">Name:</label>
                <input type="text" v-model="plantName" name="plantName" required /><br>

                <label for="plantPhoto">Photo:</label>
                <input type="file" accept="image/*" @change="handleFileChange" /><br>

                <label for="wateringSchedule">Watering Schedule:</label>
                <select v-model="wateringSchedule" name="wateringSchedule" required>
                    <option disabled value="">Select Schedule</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Biweekly">Biweekly</option>
                    <option value="Monthly">Monthly</option>
                </select><br>

                <button type="submit" :disabled="!isFormValid">Submit</button>
            </form>
            <div v-if="previewImage">
                <h3>Photo Preview:</h3>
                <img :src="previewImage" alt="Plant photo preview" style="max-width: 100%; height: auto;" />
            </div>
        </div>

        <div class="plantlist">
            <h2>Plant List</h2>
            <ul>
                <li v-for="(plant, index) in plants" :key="index">
                    <strong>{{ plant.name }}</strong><br>
                    <img :src="plant.photo" alt="Plant photo" />

                </li>
            </ul>


        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVissForm: false,
            isVissCal: false,
            plantName: '',
            selectedFile: null,
            previewImage: null,
            wateringSchedule: '',
            name: localStorage.getItem('name') || '',
            plants: JSON.parse(localStorage.getItem('plants')) || [],
        }
    },
    computed: {
        isFormValid() {
            return this.plantName && this.wateringSchedule;
        },
        today() {
            const date = new Date();
            return date;
        },
        overduePlants() {
            return this.plants.filter(plant => new Date(plant.nextWater) < this.today);
        },
        dueTodayPlants() {
            return this.plants.filter(plant => {
                const nextWaterDate = new Date(plant.nextWater);
                return (
                    nextWaterDate.getFullYear() === this.today.getFullYear() &&
                    nextWaterDate.getMonth() === this.today.getMonth() &&
                    nextWaterDate.getDate() === this.today.getDate()
                );
            });
        },
        dueSoonPlants() {
            return this.plants.filter(plant => new Date(plant.nextWater) > this.today);
        }
    },
    created() {

        this.name = localStorage.getItem('name') || '';
        this.plants = JSON.parse(localStorage.getItem('plants')) || [];
    },
    methods: {
        formatNextWater(nextWater) {
            const options = { month: 'short', day: '2-digit' }; 
            return new Date(nextWater).toLocaleDateString(undefined, options); 
        },
        toggleForm() {
            this.isVissForm = !this.isVissForm
            if (this.isVissCal){
                this.isVissCal= false;
            }
        },
        toggleCal() {
            this.isVissCal = !this.isVissCal
            if (this.isVissForm){
                this.isVissForm= false;
            }        },
        updatePlants(newPlants) {
            this.plants = newPlants;
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        handleSubmit() {
            const lastWater = new Date();
            const nextWater = this.dateHandle(lastWater, this.wateringSchedule);

            const newPlant = {
                name: this.plantName,
                photo: this.previewImage,
                waterSchedule: this.wateringSchedule,
                lastWater: lastWater,
                nextWater: nextWater,
            };

            this.plants.push(newPlant);
            this.saveData();

            // Reset form fields cause duhh
            this.plantName = '';
            this.selectedFile = null;
            this.previewImage = null;
            this.wateringSchedule = '';
        },
        saveData() {
            localStorage.setItem('name', this.name);
            localStorage.setItem('plants', JSON.stringify(this.plants));
        },
        dateHandle(last, schedule) {
            let nextWater = new Date(last);
            if (schedule === "Daily") {
                nextWater.setDate(nextWater.getDate() + 1);
            } else if (schedule === "Weekly") {
                nextWater.setDate(nextWater.getDate() + 7);
            } else if (schedule === "Biweekly") {
                nextWater.setDate(nextWater.getDate() + 14);
            } else if (schedule === "Monthly") {
                nextWater.setMonth(nextWater.getMonth() + 1);
            }
            return nextWater;
        }
    },
}
</script>

<style>
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    margin: auto;
}

button {
    padding: 8px;
    font-size: 16px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

img {
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 5px;
    max-width: 100%;
}
.calendercard {
    display: flex; 
    align-items: center; 
    width: 400px; 
    max-height: 100px; 
    background-color: grey;
    padding: 10px; 
    margin-bottom: 10px; 
    border-radius: 5px; 
    overflow: hidden;
}

.calendercard img {
    max-width: 80px; 
    max-height: 80px; 
    height: auto; 
    margin-left: 10px; 
}

.plant-name {
    flex-grow: 1; 
    margin-left: 10px; 
}
</style>