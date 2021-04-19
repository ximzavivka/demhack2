<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation>
    <v-row>
      <v-col cols="3">
        <v-text-field
            v-model="template.name"
            :rules="nameRules"
            label="Название шаблона"
            required
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
            v-model="template.subject"
            :rules="nameRules"
            label="Тема письма"
            required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pb-0" cols="6">
        <v-tabs
            v-model="tab"
            align-with-title>
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab>
            Текст
          </v-tab>
          <v-tab>
            HTML
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <section class="container-editor">
                <client-only>
                  <editor ref="tinyeditor"
                          api-key="??????????????????????????????????????????????тут свой"
                          :init="{
                       height: 400,
                       menu:{
                         edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
                         insert: { title: 'Insert', items: 'image link media inserttable | insertdatetime' },},
                       plugins: [
                         'advlist autolink lists link image charmap print preview anchor image',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount'
                       ],
                       toolbar:
                         'undo redo | formatselect | bold italic backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent| image | removeformat | help'
                    }"
                          @onInit="setHTMLContent"
                  />
                </client-only>
              </section>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-btn
                  class="ml-4 mr-2" fab dark x-small depressed color="primary" @click="getHTLMContent">
                <v-icon dark> {{ mdiRefresh }}</v-icon>
              </v-btn>
              <v-btn
                  class="ml-4 mr-2" fab dark x-small depressed color="accent" @click="setHTMLContent">
                <v-icon dark> {{ mdiCloudUpload }}</v-icon>
              </v-btn>
              <v-textarea solo flat v-model="template.body" height="400"></v-textarea>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div>
          Доступны макросы <b>#user#</b>(ФИО участника) и <b>#url#</b> (вредностная ссылка)
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-file-input v-model="file" accept="image/*" :prepend-icon="mdiCamera"
                      label="Выберите изображение"></v-file-input>
      </v-col>
      <v-col cols="3" style="margin:15px">
        <v-btn :disabled="!file" depressed @click="uploadImageForTemplate()">Загрузить</v-btn>
      </v-col>

    </v-row>
    <v-row>
      <v-col v-for="(image,i) in imagesByTemplate" :key="i" class="flex-grow-0">
        <v-card height="auto" width="400" class="py-1">
          <v-img
              height="80"
              contain
              :src="`${image}`"></v-img>
          <v-card-title class="caption">
            {{ image }}
          </v-card-title>
        </v-card>


      </v-col>
    </v-row>
    <v-btn
        :disabled="!valid"
        color="deep-purple lighten-2"
        class="mr-4 mt-4"
        dark
        @click="saveTemplate(false)">
      Сохранить шаблон
    </v-btn>
  </v-form>

</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import {mdiCamera, mdiRefresh, mdiCloudUpload} from '@mdi/js'
import {mapGetters, mapMutations} from "vuex";

export default {
  components: {
    'editor': Editor
  },

  data() {
    return {
      mdiCamera, mdiRefresh, mdiCloudUpload,
      tab: null,
      showSource: false,
      valid: true,
      template: {
        id: null,
        name: '',
        subject: '',
        body: ''
      },
      nameRules: [
        v => !!v || 'Обязательное поле',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Обязательное поле',
        v => /.+@.+\..+/.test(v) || 'E-mail введен некорректно',
      ],
      file: [],
      uploadedPhotos: []
    }
  },

  computed: {
    ...mapGetters("template", ["GET_IMAGES"]),
    imagesByTemplate: {
      get() {
        return this.GET_IMAGES;
      },
      set() {
      }
    }
  },
  mounted() {
    this.template = this.loadTemplateById();
  },
  methods: {
    ...mapMutations("template", ["STORE_IMAGES", "ADD_NEW_IMAGE", "STORE_TEMPLATES", "ADD_NEW_TEMPLATE"]),
    validate() {
      this.$refs.form.validate()
    },
    async saveTemplate(uploadImages) {
      this.validate();
      if (this.valid) {
        this.template.body = tinymce.activeEditor.getContent();
        this.$axios.post(`/template`, this.template).then(value => {
          console.log(`[uploadImageForTemplate][saveTemplate] uploadImages=${uploadImages}`)
          if (uploadImages)
            this.uploadImage(value.data.id);
          this.template = value.data;
        });
      }
      return this.template
    },
    getHTLMContent() {
      const content = tinymce.activeEditor.getContent();
      this.template.body = content;
      console.log(content);
    },
    async uploadImageForTemplate() {
      console.log(`[uploadImageForTemplate] 1 templateId=${this.template.id}`)
      if (!this.template.id) {
        console.log(`[uploadImageForTemplate] 2 templateId=${this.template.id}`)
        this.template = this.saveTemplate(true);
      }else{
        await this.uploadImage(this.template.id);
      }
      // this.$nextTick(function () {
      // await this.uploadImage();
      // })
    },
    async uploadImage(templateId) {
      console.log(`[uploadImageForTemplate][saveTemplate][uploadImage] templateId=${templateId}`)
      const formData = new FormData();
      formData.append("file", this.file);
      const config = {headers: {'Content-Type': 'multipart/form-data'}}; // TODO: delete config after test
      const location = await this.$axios.$post(`/image/${templateId}`, formData, config);
      console.info('location of uploaded image: ', location);
      this.uploadedPhotos.push(location);
      this.ADD_NEW_IMAGE(location);
    },
    setHTMLContent() {
      if (!!this.template.body)
        tinymce.activeEditor.setContent(this.template.body, {format: 'html'});
    },
    async loadTemplateById() {
      if (!!this.$route.params && !!this.$route.params.id) {
        this.templateId = this.$route.params.id;
        this.template = await this.$axios.$get(`/template/${this.templateId}`);
        this.STORE_IMAGES(this.template.photos)
      }
      return this.template;
    }
  }
}
</script>

<style scoped>
.container-editor {
  width: 100%;
  margin: 0 auto;
  padding: 0 0 10px;
}

.colaba .v-text-field__slot,
.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot,
.v-text-field > .v-input__control > .v-input__slot {
  height: 100% !important;
}

.colaba .v-text-field__slot {
  height: 100% !important;
}
</style>
