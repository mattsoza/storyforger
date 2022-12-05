<template>
  <div>
    <img v-bind:src="previewImage" class="uploading-image" />
    <input type="file" accept="image/jpeg" @change=uploadImage>
    <button @click=sendToServer>Upload</button>
  </div>
</template>

<script>
export default {
  name: 'ImageUploadComponent',
  data () {
    return {
      previewImage: null
    }
  },
  methods: {
    uploadImage (e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e => {
        this.previewImage = e.target.result
        // console.log(this.previewImage);
      }
    },
    async sendToServer () {
      const body = JSON.stringify({ image: this.previewImage })
      console.log(body)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      }
      const response = await fetch(`/api/page/638d5a2be0c981e4ac7052ce`, requestOptions);
    }
  }
}
</script>

<style>
.uploading-image{
  width: 200px;
  height: 200px;
}
</style>
