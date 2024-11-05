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
            <br>
            <h3>Please Note the checkboxes are disabled</h3>
            <br>
            <h3>Overdue</h3>
            <div>
                <section class="calendercard" v-for="item in overduePlants" :key="item.name">
                    <input type="checkbox" v-model="item.checked" @change="handleCheckboxChange(item)" /> <span>{{
                        item.name }}&nbsp;</span>
                    <p> Due: {{ formatNextWater(item.nextWater) }}</p>
                    <img :src="item.photo" alt="Plant photo" />

                </section>
            </div>


            <h3>Due Today</h3>
            <div>
                <section class="calendercard" v-for="item in dueTodayPlants" :key="item.name">
                    <input type="checkbox" v-model="item.checked" @change="handleCheckboxChange(item)" /> <span>{{
                        item.name }}&nbsp;</span>
                    <p> Due: {{ formatNextWater(item.nextWater) }}</p>
                    <img :src="item.photo" alt="Plant photo" />

                </section>
            </div>

            <h3>Due Soon</h3>
            <div>
                <section class="calendercard" v-for="item in dueSoonPlants" :key="item.name">
                    <input type="checkbox" v-model="item.checked" @change="handleCheckboxChange(item)" /> <span>{{
                        item.name }}&nbsp;</span>
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
                <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange" /><br>

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
            <p>Please note updating info is messy right now</p>
            <button @click="clearLocalStorage">Clear All Plants</button>
            <ul>
                <li v-for="(plant, index) in plants" :key="index">
                    <div v-if="currentEditIndex === index">

                        <h3>Edit Plant</h3>
                        <form @submit.prevent="saveEdit(index)">
                            <label for="plantName">Name:</label>
                            <input type="text" v-model="plantName" required /><br>

                            <label for="plantPhoto">Photo:</label>
                            <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange" /><br>

                            <label for="wateringSchedule">Watering Schedule:</label>
                            <select v-model="wateringSchedule" required>
                                <option disabled value="">Select Schedule</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Biweekly">Biweekly</option>
                                <option value="Monthly">Monthly</option>
                            </select><br>
                            <label for="lastWater">Last Watered:</label>
                            <input type="text" v-model="lastWater" required /><br>

                            <button type="submit">Save</button>
                            <button @click="cancelEdit">Cancel</button>
                        </form>
                    </div>
                    <div v-else>
                        <!-- Display plant info when not in edit mode cause shit broke! -->
                        <strong>{{ plant.name }}</strong>
                        <img :src="plant.photo" alt="Plant photo" />
                        <button @click="editPlant(index)">Edit</button>
                        <button @click="removePlant(index)">Remove</button>
                    </div>
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
            lastWater: '',
            currentEditIndex: null,
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
        clearLocalStorage() {
            localStorage.removeItem('plants'); // Clear from local storage
            this.plants = []; // Reset plants
        },
        removePlant(index) {
            this.plants.splice(index, 1);
            this.saveData();
        },
        editPlant(index) {
            const plantToEdit = this.plants[index];
            this.plantName = plantToEdit.name;
            this.previewImage = plantToEdit.photo;
            this.wateringSchedule = plantToEdit.waterSchedule;
            this.lastWater = plantToEdit.lastWater
            this.currentEditIndex = index;
        },

        saveEdit(index) {
            const updatedPlant = {
                name: this.plantName,
                photo: this.previewImage,
                waterSchedule: this.wateringSchedule,
                lastWater: this.lastWater,
                nextWater: this.dateHandle(this.lastWater, this.wateringSchedule),
            };
            this.plants.splice(index, 1, updatedPlant);
            this.saveData();
            this.resetForm();
        },

        cancelEdit() {
            this.resetForm();
        },

        resetForm() {
            this.plantName = '';
            this.selectedFile = null;
            this.previewImage = null;
            this.wateringSchedule = '';
            this.$refs.fileInput.value = '';
        },
        handleCheckboxChange(plant) {

            const lastWater = new Date();
            const nextWater = this.dateHandle(lastWater, plant.waterSchedule);

            plant.lastWater = lastWater;
            plant.nextWater = nextWater;
            plant.checked = false;
            localStorage.setItem('plants', JSON.stringify(this.plants));



        },
        formatNextWater(nextWater) {
            const options = { month: 'short', day: '2-digit' };
            return new Date(nextWater).toLocaleDateString(undefined, options);
        },
        toggleForm() {
            this.isVissForm = !this.isVissForm
            if (this.isVissCal) {
                this.isVissCal = false;
            }
        },
        toggleCal() {
            this.isVissCal = !this.isVissCal
            if (this.isVissForm) {
                this.isVissForm = false;
            }
        },
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
                checked: false,
            };

            this.plants.push(newPlant);
            this.saveData();
            alert("plants after submission", this.plants);
            // Reset form fields cause duhh
            this.resetForm();
        },
        saveData() {

            localStorage.setItem('plants', JSON.stringify(this.plants));
            alert("Data saved to localStorage:", JSON.parse(localStorage.getItem('plants')));
            
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