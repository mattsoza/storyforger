<!-- Form for creating a new connection -->
<template>
  <div>
<select class="form-control" name="child">
  <option v-for="childOption in pages" :value="childOption">{{childOption.title}}</option>
</select>

{{child}}
{{this.child}}
</div>
</template>

<script>
export default {
    name: 'NewConnectionForm',
    props: {
        page: {
            type: Object,
            required: true
        },
        pages: {
          type: Array,
          required: true
        }
    },
    data () {
      return {
        child: null,
        text: ""
      }
    },
    methods: {
        makeConnection(){
          const params = {parent: page, child, text: "" };
          fetch(`/api/connections/${this.connectionId}`, params)
          .then((res) => {})
        }
    }
}
</script>
