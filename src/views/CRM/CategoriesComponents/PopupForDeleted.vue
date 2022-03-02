<template>
<div v-if="isOpen" @click="closePopup" ref="popup">
    <div class="popup" @click.stop>
      Вы уверены, что хотите удалить категорию?
      <hr />
      <div class="footer">
          <button @click="closePopup">Отмена</button>
          &nbsp;
          <button @click="confirmPopup">Удалить</button>
      </div>
    </div>
</div>
</template>

<script>

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },

  mounted () {
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleKeydown)
  },

  methods: {
    handleKeydown (e) {
      if (this.isOpen && e.key === 'Escape') {
        this.closePopup()
      }
    },

    closePopup () {
      this.$message('Отмена удаления категории')
      this.$emit('close')
    },
    async confirmPopup () {
      this.$emit('ok')
    }
  }

}
</script>

<style>
.popup {
  top: 50px;
  padding: 20px;
  margin: 50px;
  left: 50%;
  transform: translateX(-50%) translateY(150%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border: #363636 solid 1px;
  width: 500px;
}
.popup h1 {
  text-align: center;
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}

.footer {
  text-align: right;
}
</style>
