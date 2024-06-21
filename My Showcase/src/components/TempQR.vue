<template>
    <div class="vcard-qr">
      <h2>Create a vCard QR Code</h2>
      <form @submit.prevent="generateQRCode">
        <div>
          <label for="firstName">First Name:</label>
          <input v-model="firstName" type="text" id="firstName" required />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input v-model="lastName" type="text" id="lastName" required />
        </div>
        <div>
          <label for="organization">Organization:</label>
          <input v-model="organization" type="text" id="organization" />
        </div>
        <div>
          <label for="title">Job Title:</label>
          <input v-model="title" type="text" id="title" />
        </div>
        <div>
          <label for="phone">Phone Number:</label>
          <input v-model="phone" type="tel" id="phone" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <button type="submit">Generate QR Code</button>
      </form>
  
      <div v-if="qrCodeData">
        <h3>Your vCard QR Code:</h3>
        <img :src="qrCodeData" alt="vCard QR Code" />
        <a :href="qrCodeData" :download="qrFileName" class="download-link">Download QR Code</a>
      </div>
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode';
  import VCard from 'vcard-creator';
  
  export default {
    name: 'VCardQR',
    data() {
      return {
        firstName: '',
        lastName: '',
        organization: '',
        title: '',
        phone: '',
        email: '',
        qrCodeData: null
      };
    },
    computed: {
      // Add dem names togetha
      qrFileName() {
        const firstName = this.firstName.trim().replace(/\s+/g, '_');
        const lastName = this.lastName.trim().replace(/\s+/g, '_');
        return `${firstName}_${lastName}_Vcard_Qr.png`;
      }
    },
    methods: {
      generateQRCode() {
        // new instonnce of vcard
        const vCard = new VCard();
        
        // If theres an easier way to make this shorter tell me
        if (this.firstName || this.lastName) {
          vCard.addName(this.lastName, this.firstName);
        }
        if (this.organization) {
          vCard.addCompany(this.organization);
        }
        if (this.title) {
          vCard.addJobtitle(this.title);
        }
        if (this.phone) {
          vCard.addPhoneNumber(this.phone, 'WORK');
        }
        if (this.email) {
          vCard.addEmail(this.email);
        }
  
        // Do Stuff to make pretty squares
        try {
          const vCardString = vCard.toString();
          this.qrCodeData = QRCode.toDataURL(vCardString);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* no judging the following!!! */
  .vcard-qr {
    max-width: 400px;
    margin: auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  form div {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    margin-bottom: 0.5em;
  }
  
  input {
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
  }
  
  button {
    padding: 0.5em 1em;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  img {
    margin-top: 1em;
    max-width: 100%;
    height: auto;
  }
  
  .download-link {
    display: inline-block;
    margin-top: 1em;
    padding: 0.5em 1em;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer;
  }
  
  .download-link:hover {
    background-color: #218838;
  }
  </style>