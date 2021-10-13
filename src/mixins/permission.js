import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['points', 'roles'])
  },
  methods: {
    checkPermission(val) {
      return !this.roles.points.includes(val)
    }
  }
}
