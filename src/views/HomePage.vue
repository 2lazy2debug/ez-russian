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
        <strong>Scegli un esercizio per cominciare.</strong>
        <p>
          <br />
          <ion-button expand="block" id="open-modal">Declina sostantivi</ion-button>
          <ion-button expand="block" @click="() => router.push('/newadj')">Declina aggettivi</ion-button>
          <ion-button expand="block" @click="() => router.push('/newconj')">Coniugatore</ion-button>
          <ion-button expand="block" @click="() => router.push('/newflash')">Flashcards</ion-button>
        </p>
      </div>

      <ion-modal ref="modal" trigger="open-modal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Scegli difficoltà</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-button expand="block" @click="pushAndClose('/newsostfac')">Facile</ion-button>
          <ion-button expand="block" @click="pushAndClose('/newsostdif')">Difficile</ion-button>

        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg, IonModal } from '@ionic/vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const modal = ref();

const pushAndClose = (route: string) => {
  modal.value.$el.dismiss(null, 'cancel');
  router.push(route)
}
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
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

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

ion-modal {
  --height: 50%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgba(209, 213, 219);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14, 42, 144);
  --color: white;
}

ion-modal ion-title {
  text-align: center;
}
</style>
