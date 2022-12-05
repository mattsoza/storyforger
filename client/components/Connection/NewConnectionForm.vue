<!-- Form for creating a new book -->
<template>

</template>

<script>
export default {
    name: 'NewConnectionForm',
    props: {
        page: {
            type: Object,
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
            fetch(`/api/connections/${this.connectionId}`, params)
          .then((res) => {})
        }
    }
}
</script>
