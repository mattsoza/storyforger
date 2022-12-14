<!-- Reusable component representing a form in a block style -->
<!-- Thanks to 6.1040 staff for providing this component! -->

<template>
  <form @submit.prevent="submit">
    <h3>{{ title }}</h3>
    <article
      v-if="fields.length"
    >
      <div
        v-for="field in fields"
        :key="field.id"
      >
        <label :for="field.id">{{ field.label }}:</label>
        <textarea
          v-if="field.id === 'content'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
        <input
          v-else-if="field.id === 'tag'"
          pattern="[a-z]*"
          placeholder="ex: boston"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
        <select v-else-if="field.id === 'connection' && pages"
          :name="field.id"
          :value="field.value"
          v-model = "field.value" class="form-control" name="child">
          <option v-for="childOption in pages" :value="childOption">{{childOption.title}}</option>
          </select>
        <input
          v-else-if="field.id === 'image'"
          type="file"
          accept="image/*"
          :name="field.id"
          :value="field.value"
          @change="uploadImage"
        > <!-- @input="(field.value=$event.target.value)" -->
        <input
          v-else
          :type="field.id === 'password' ? 'password' : 'text'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
      </div>
    </article>
    <article v-else>
      <p>{{ content }}</p>
    </article>
    <button
      type="submit"
    >
      {{ title }}
    </button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>

export default {
  name: 'BlockForm',
  data () {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setUsername: false, // Whether or not stored username should be updated after form submission
      refreshFreets: false, // Whether or not stored freets should be updated after form submission
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: null, // Function to run after successful form submission
    }
  },
  props: {
    pages: {
      type: Array,
      required: false
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
    async submit () {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin' // Sends express-session credentials with request
      }
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            if (field.id === 'image') {
              return [field.id, this.previewImage];
            } else if (field.id === 'connection'){
              return['child', field.value._id];
            }else {
              const { id, value } = field;
              field.value = '';
              return [id, value];
            }
          })
        ))
      }

      try {
        const r = await fetch(this.url, options)
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json()
          throw new Error(res.error)
        }

        let res
        if (this.setUsername) {
          const text = await r.text()
          res = text ? JSON.parse(text) : { user: null }
          this.$store.commit('setUsername', res.user ? res.user.username : null)
        } else {
          res = await r.json()
        }
        if (this.callback) {
          this.callback(res)
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error')
        setTimeout(() => this.$delete(this.alerts, e), 3000)
      }
    }
  }
}
</script>

<style scoped>
form {
  border: 1px solid #111;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}
</style>
