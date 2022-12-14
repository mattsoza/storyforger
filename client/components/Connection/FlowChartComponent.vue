<!-- Flowchart showing connections between pages -->

<template>
  <div>
    <FlowChart
    :nodes="nodes"
    :connections="connections"
    :readonly="true"
    />
  </div>
</template>

<script lang="ts">

export default {
  name: 'FlowChartComponent',
  data () {
    return {
      pageData: this.$store.state.currentBook.pages,
      nodes: null,
      connections: null
    }
  },
  mounted () {
    this.createGraphElements()
  },
  methods: {
    createGraphElements () {
      /**
       * Creates the nodes and edges for a flowchart graph
       * A node is structured as {id: number, name: string}
       * A connection is structured as: {source: {id: number}, destination: {id: number}, id: number}
       */
      const nodes = []
      const connections = []
      for (const page in this.pageData) {
        nodes.push({ id: Number(page._id), name: page.title})
        for (const connection in page.connections) {
          connections.push({ source: { id: connection.parent }, destination: { id: connection.child }, id: connection._id })
        }
      }
      this.nodes = nodes
      this.connections = connections
    }
  }
}
</script>
