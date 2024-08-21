<template>
    <div>
        <div class="container">
            <img src='/lowesLogo.png' class="banner" />
            <span class="version">Built in a Day so no judging! V 0.2.1</span>
        </div>
        <div>
            <button @click="loadAndProcessCSV()">Run test</button>
            <button @click="printReport">Print Report</button>
        </div>
        <!-- What the hell even is default draging behaivor -->
        <div class="file-upload" @dragover.prevent="dragover" @dragleave.prevent="dragleave" @drop.prevent="drop"
            @click="clickToUpload">
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
            <p>drag and drop csv</p>
        </div>
        <div v-if="departmentData.length && personData.length" class="tables-container">
            <!-- Department Table Duhh -->
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Snappy Count</th>
                        <th>Participation %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dept in departmentData" :key="dept.name">
                        <td>{{ dept.name }}</td>
                        <td>{{ dept.count }}</td>
                        <td>{{ dept.participation.toFixed(2) }}%</td>
                    </tr>
                </tbody>
            </table>

            <!-- Personal Problems Table -->
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Assign to / Corrected by</th>
                        <th>Snappy Count</th>
                        <th>Participation %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="person in personData" :key="person.name">
                        <td>{{ person.name }}</td>
                        <td>{{ person.count }}</td>
                        <td>{{ person.participation.toFixed(2) }}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Papa from 'papaparse'
export default {
    data() {
        return {
            // in the future i'll write more notes.... one of these days
            // dont forget to save the csv for more filters and censorship
            csvData: [],
            departmentData: [],
            personData: [],
        }
    },
    methods: {
        clickToUpload() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            this.processFile(file);
        },
        dragover() {
            this.$refs.uploadBox.classList.add('dragging');
        },
        dragleave() {
            this.$refs.uploadBox.classList.remove('dragging');
        },
        drop(event) {
            this.$refs.uploadBox.classList.remove('dragging');
            const file = event.dataTransfer.files[0];
            this.processFile(file);
        },
        processFile(file) {
            // do stuff
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    this.analyzeData(results.data);
                }
            });
            console.log('File uploaded:', file);
        },
        analyzeData(data) {
            // note to self add loading animation and fake the 4 seconds like last time
            const departmentMap = {};
            const personMap = {};
            const totalRecords = data.length;

            data.forEach((record) => {
                const department = record.Department;
                const person = record['Assign to / Corrected by'];

                if (!departmentMap[department]) {
                    departmentMap[department] = 0;
                }
                if (!personMap[person]) {
                    personMap[person] = 0;
                }

                departmentMap[department] += 1;
                personMap[person] += 1;
            });

            this.departmentData = Object.keys(departmentMap).map((name) => ({
                name,
                count: departmentMap[name],
                participation: (departmentMap[name] / totalRecords) * 100,
            }))
                .sort((a, b) => b.count - a.count); // sort the shit out of this

            this.personData = Object.keys(personMap).map((name) => ({
                name,
                count: personMap[name],
                participation: (personMap[name] / totalRecords) * 100,
            }))
                .sort((a, b) => b.count - a.count); // Sorta sortin
        },
        loadAndProcessCSV() {
            // Assuming shit not broke file is named 'csv_download_30_05_2024_01_20_PM.csv' and located in the public folder only in dev 
            const filePath = '/csv_download_15_06_2024_09_35_AM.csv';

            fetch(filePath)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok and all is lost');
                    }
                    return response.text();
                })
                .then((csvText) => {
                    Papa.parse(csvText, {
                        header: true,
                        complete: (results) => {
                            this.analyzeData(results.data);
                        },
                    });
                })
                .catch((error) => {
                    console.error('There was a problem with YOU, go reflect a bit:', error);
                });
        },
        printReport() {
            window.print();
        },

    }
}
</script>

<style>
/* The biggest shit show you have ever seen, i'm fixing it!!! */
.container {
    max-width: 300px;
}

.tables-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;

}

.data-table {
    width: 45%;
    border-collapse: collapse;
    font-size: 14px;
    table-layout: fixed;
}

th,
td {
    border: 1px solid #ccc;
    padding: 4px 8px;
    text-align: left;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
}

/* 20 Print Styles That You Wish Were Made Up.... If you're not laughing by now get out of my code!!! */
@media print {

    /* Hide and seek all elements except for the tables */
    button {
        display: none;
    }

    .tables-container {
        display: flex;
        width: 100%;
    }

    .data-table {
        width: 100%;
        margin-bottom: 20px;
        font-size: 12px;
        /* Smaller font size for printing */
    }

    th,
    td {
        max-width: 100px;
        padding: 2px 4px;

    }

    .file-upload {
        display: none;
    }

    .backhome {
        display: none;
    }
}

.file-upload {
    border: 2px dashed #ccc;
    width: 50%;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s;
}

.file-upload.dragging {
    border-color: #000;
}
</style>