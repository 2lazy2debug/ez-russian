<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>RussianForAll</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">RussianForAll</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-img id="rulogo" src="../assets/ru-flag.png"></ion-img>
      <div id="container">
        Declina le parole che appaiono sullo schermo.
        <br />
        Usa la tastiera cirillica.
        <p id="wrd">{{ randomWord.title }}</p>
        <p id="trad">Traduzione : {{ randomWord.translations.italian }}</p>
        <p id="dcl">{{ replaceLabel(randomKey) }}</p>
        <br />
        <ion-item ref="wItem" class="russian-flag-input">
          <ion-input v-model="wInput" aria-label="word">
            <div id="ilabel" slot="label">{{ partialAnswer }}</div>
          </ion-input>
        </ion-item>
        <Ion-button ref="cButton" expand="block" @click="checkAnswer()">Controlla</Ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonImg, IonInput, IonButton, createAnimation } from '@ionic/vue';
import type { Animation } from '@ionic/vue';
import { ref, watch, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import json from '../assets/wordlist.json'

const wInput = ref();
const wItem = ref();
const cButton = ref();
const randomWord = ref({});
const randomKey = ref({});

let keys = {};
let correctAnswer = '';
let partialAnswer = '';
let compareAnswer = '';

let animation: Animation;


const newWord = () => {
  randomWord.value = json[Math.floor(Math.random() * 10000)];
  keys = Object.keys(randomWord.value.forms);
  randomKey.value = keys[Math.floor(Math.random() * keys.length)];
  correctAnswer = randomWord.value.forms[randomKey.value];
  partialAnswer = correctAnswer.substring(0, correctAnswer.lastIndexOf("|") + 1).replace(/\|/g, "")
  partialAnswer = partialAnswer == "" ? correctAnswer : partialAnswer
  compareAnswer = correctAnswer.replace(/\|/g, "")

  console.log(randomWord.value)
  console.log(randomKey.value)
  console.log(compareAnswer)

}

const replaceLabel = (label: string) => {
  return label.replace("sg", "Singolare")
    .replace("pl", "Plurale")
    .replace("-", " ")
    .replace("nom", "Nominativo")
    .replace("gen", "Genitivo")
    .replace("dat", "Dativo")
    .replace("acc", "Accusativo")
    .replace("ins", "Strumentale")
    .replace("prp", "Preposizionale")
}

const buttonFeedback = (style: string) => {
  cButton.value.$el.classList.add(style)
  setTimeout(() => { cButton.value.$el.classList.remove(style) }, 750)
}

const checkAnswer = () => {

  if ((partialAnswer + wInput.value) === compareAnswer) {
    buttonFeedback('success');
    newWord();
  } else {
    buttonFeedback('failure');
    animation.play();
  }

  wInput.value = ""
}

// Watch for changes and update randomWord
watch(
  () => randomWord.value, // Reactive source (getter)
  () => {
    // randomWord.value = newWord();
  } // Callback to run when the source changes
);

onMounted(() => {

  animation = createAnimation()
    .addElement(wItem.value.$el)
    .duration(50)
    .iterations(9)
    .fromTo('transform', 'translateX(-10px)', 'translateX(10px)')
    //.fromTo('transform', 'translateX(50px)', 'translateX(-50px)')
    .to('transform', 'translateX(0px)');
    
  })
  
  newWord();
//const router = useRouter();
</script>

<style scoped>
#container {
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 16px;
  line-height: 22px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  margin: 0;
}

#container a {
  text-decoration: none;
}

#rulogo {
  padding-top: 10px;
  width: 40%;
  margin: auto;
}

.success {
  --background: greenyellow;
  --color: #000;
}

.failure {
  --background: red;
  --color: #fff;
}

.russian-flag-input {
  --bg-color-light: #d52b1e;
  /* White background */
  --text-color-light: #ffffff;
  /* Dark red text color */
  --border-color-light: #005bab;
  /* Dark blue border */
  border-radius: 5px;
  /* Rounded corners */
  border: 1px solid var(--border-color-light);
  background-color: var(--bg-color-light);
  color: var(--text-color-light);
  margin-bottom: 10px;

}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .russian-flag-input {
    --bg-color-dark: #1e1e1e;
    /* Dark background */
    --text-color-dark: #ffffff;
    /* Light red text color */
    --border-color-dark: #74a6c8;
    /* Light blue border */
    border-color: var(--border-color-dark);
    background-color: var(--bg-color-dark);
    color: var(--text-color-dark);
    font-size: 18px;
  }
}

#ilabel {
  padding-left: 65px;
  margin-right: -13px;
  font-size: 18px;
  font-weight: bold;
}

#container #wrd {
  padding-top: 15px;
  font-size: 28px;
  font-weight: bold;
}

#container #dcl {
  padding-top: 10px;
  font-size: 18px;
  /*font-style: italic;*/
}

#container #trad {
  padding-top: 10px;
  font-size: 14px;
  font-style: italic;
}
</style>
