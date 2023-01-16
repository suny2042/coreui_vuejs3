<template>
  <main class="main">
    <div class="container-fluid">
      <h1 class="uploadTitle mt-lg-5">NEW CONTENT ANALYSIS</h1>
      <p class="lead mb-4">
        분석을 위한 신규 컨텐츠 업로드 또는 기 분석완료된 컨텐츠 리스트를 확인할
        수 있습니다.
      </p>

      <div class="row">
        <div v-if="!contentFile" class="col-md-5 col-sm-12">
          <!-- Our markup, the important part here! -->
          <div
            :class="['dropZone', dragging ? 'dropZone-over' : '']"
            class="p-5"
          >
            <div
              class="dropBox"
              @dragenter="dragenter"
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
              @click="trigger"
            ></div>
            <div class="dropZone-info">
              <h1 class="mb-5 mt-5 text-muted">Drag &amp; drop files here</h1>
              <div class="btn btn-primary btn-block mb-5">
                <span>Open the file Browser</span>
                <input
                  type="file"
                  title="Click to add Files"
                  ref="uploadFile"
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <!-- /uploader -->
        </div>
        <div v-else class="col-md-7 col-sm-12">
          <!-- Our markup, the important part here! -->
          <div class="dropZone p-5">
            <h3 class="mb-5 mt-5 text-muted">
              분석 시작은 좌측 리스트의 분석시작 버튼을 선택해주세요
            </h3>
            <div class="btn btn-primary btn-block mb-5">
              <button
                type="button"
                class="btn btn-primary removeFile"
                @click="removeFile"
              >
                분석 취소
              </button>
            </div>
          </div>
          <!-- /uploader -->
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="card h-100">
            <div class="card-header">File List</div>
            <div class="card-body p-3">
              <div
                v-for="item in fileList"
                class="row mb-1"
                v-bind:key="item.id"
              >
                <div class="col-sm-5">
                  <span
                    v-if="!item.id"
                    class="badge badge-pill badge-primary mr-3"
                    >NEW</span
                  >
                  <!--                      <span v-else class="badge badge-pill badge-secondary mr-3"></span>-->
                  <span class="align-middle"
                    ><strong>{{ item.fileName }}</strong></span
                  >
                </div>
                <div class="col-sm-3">
                  <span class="align-middle"
                    >Status:
                    <span class="text-muted"
                      >{{ workStatus[item.status]
                      }}{{
                        currentJobData.id == item.id && item.status == 3
                          ? '(' + analysisProgress + '%)'
                          : ''
                      }}</span
                    ></span
                  >
                  <!--                      <div v-if = "isUploading" class="progress mb-2">-->
                  <!--                        <div class="progress">-->
                  <!--                          <div class="progress-bar" role="progressbar" :style="'width: ' + uploadPercentage + '%'" :aria-valuenow="uploadPercentage" aria-valuemin="0" aria-valuemax="100"></div>-->
                  <!--                        </div>-->
                  <!--                      </div>-->
                </div>
                <div class="col-auto" v-if="item.isNew && item.id == 0">
                  <button
                    :disabled="isDoneAnalysis == true"
                    class="btn btn-primary btn-sm"
                    @click="startUpload(item)"
                  >
                    분석 시작
                  </button>
                </div>
                <div class="col-auto">
                  <div class="progress mb-2">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="'width: ' + uploadPercentage + '%'"
                        :aria-valuenow="uploadPercentage"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <button
                    v-if="item.status == 4"
                    class="btn btn-warning btn-sm mr-1"
                    @click="searchResult(item)"
                  >
                    결과조회
                  </button>
                  <button
                    v-if="
                      item.status == 4 ||
                      (currentJobData.id != item.id &&
                        (item.status == 2 || item.status == 3))
                    "
                    class="btn btn-success btn-sm"
                    @click="startUpload(item)"
                  >
                    <i class="fa fa-cloud-upload"></i>
                    다시 분석
                  </button>
                </div>
              </div>
            </div>
            <ul
              v-if="fileList.length == 0"
              class="list-unstyled p-2 d-flex flex-column col"
              id="files"
            >
              <li class="text-muted text-center empty">No files uploaded.</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /file list -->
      <!--
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div id="drag-and-drop-zone" class="dm-uploader p-5">
                <h3 class="mb-5 mt-5 text-muted">Drag &amp; drop files here</h3>

                <div class="btn btn-primary btn-block mb-5">
                  <span>Open the file Browser</span>
                  <input type="file" title='Click to add Files' />
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-header">
                    <i class="icon-note"></i><strong>신규컨텐츠 업로드</strong>

                    <button class="btn btn-primary" style="float: right;" @click="goPrev">
                      <i class="icon-action-undo"></i>
                      이전 페이지로 돌아가기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <div class="input-group">
                    <div class="col-9 custom-file" style="margin-left: 15px;">
                        <input type="file" id="customFile" ref="uploadFile" class="custom-file-input"  @change="handleContentUpload()"/>
                        <label for="customFile" class="custom-file-label">{{contentFileName}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-9">
                <div v-if="uploadPercentage > 0" class="progress">
                  <div class="progress-bar" role="progressbar" :style="'width: ' + uploadPercentage + '%'" :aria-valuenow="uploadPercentage" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <button :disabled="isUploading==true" class="btn btn-primary" style="float: right;" @click="addPromotion">
                  <i class="fa fa-cloud-upload"></i>
                  업로드 시작
                </button>
              </div>
            </div>
          </div>
          -->
    </div>
  </main>
</template>

<script>
import request from '../lib/request/analysis'
import utils from '@/lib/utils'
const WORK_STATUS = [
  'Ready',
  'Uploading',
  'Uploaded',
  'Analysing',
  'Done',
  'Error',
]

export default {
  data() {
    return {
      workStatus: WORK_STATUS,
      isUpdate: false,
      isUploading: false,
      contentFile: null,
      uploadPercentage: 0,
      dragging: false,
      file: '',
      fileList: [],
      uploadFileData: {
        id: '',
        fileName: '',
        isNew: false,
        status: 0,
        mediaType: '',
        lastRequestTime: '',
      },
      isEnterDrag: false,
      isEnterDragTimeout: null,
      isDoneAnalysis: false,
      currentJobData: { id: '' }, //현재 진행중인 작업 데이타
      analysisProgress: 0,
    }
  },
  watch: {},
  created() {
    this.setSocketEvents()

    this.fileList = localStorage.getItem('adv_meta_history')
      ? JSON.parse(localStorage.getItem('adv_meta_history'))
      : []
    console.log(this.fileList.length)
    this.fileList.forEach(function (value) {
      console.log(value.fileName)
      console.log(value.id)
      console.log(value.isNew)
      console.log(value.status)
      console.log(value.mediaType)
    })

    console.log('adv_meta_history :', localStorage.getItem('adv_meta_history'))
  },
  components: {},
  methods: {
    dateToFormat(date) {
      return utils.date.dateToFormat(date)
    },
    searchResult(data) {
      console.log(data)
      let menu = {
        menuId: 2,
        menuCode: '1000',
        menuName: '분석 결과',
        routePath: '/',
      }
      this.$store.dispatch('menu/selectMenu', menu)
      this.$router.push({
        name: 'home',
        params: data,
      })
    },

    handleContentUpload() {
      this.$log.debug(
        'handleFileUpload file : %s',
        this.$refs.uploadFile.files[0],
      )
      this.contentFile = this.$refs.uploadFile.files[0]
      console.log('handleContentUpload :', this.contentFile)
    },
    startUpload(data) {
      this.currentJobData = data
      let paramData
      paramData = this.uploadFormData()
      this.currentJobData.lastRequestTime = new Date().getTime()
      if (paramData != null) {
        this.currentJobData.status = 1
        request.analysis
          .contentUpload(paramData, (progressEvent) => {
            this.isUploading = true
            console.log('progressEvent.loaded ' + progressEvent.loaded)
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            )
          })
          .then((result) => {
            console.log('파일 업로드 결과 ', result)
            this.isUploading = false

            if (result.status >= 200 && result.status < 300) {
              //응답이 200 대이면 업로드 성공으로 판단
              this.currentJobData.status = 2
              this.uploadPercentage = 0
              this.requestAnalysis(data)
            } else {
              this.currentJobData.status = 5
              console.log(result)
            }
          })
          .catch((err) => {
            this.currentJobData.status = 5
            this.$log.error('업로드 실패', err.stack)
            this.uploadPercentage = 0
            this.isUploading = false
            alert('컨텐츠 업로드가 실패했습니다.\n(' + err.message + ')')
          })
      } else {
        this.uploadPercentage = 0
        this.requestAnalysis()
      }
    },
    requestAnalysis() {
      let paramData = {}

      if (this.currentJobData.id) {
        paramData.id = this.currentJobData.id
        paramData.forceExec =
          this.currentJobData.id && this.currentJobData.status == 4
            ? true
            : false
      } else {
        paramData.forceExec = true
      }
      ;(paramData.filename = this.currentJobData.fileName),
        (this.currentJobData.status = 3)
      console.log('메타추출 요청')
      request.analysis
        .doAnalysis(paramData)
        .then((result) => {
          this.currentJobData.id = result.data.id
          console.log('컨텐츠 메타추출 요청 ', result)

          console.log('분석 요청 결과 받고 스토리지 저장', this.fileList)
          localStorage.setItem(
            'adv_meta_history',
            JSON.stringify(this.fileList),
          )
        })
        .catch((err) => {
          this.$log.error('컨텐츠 분석 실패', err.stack)
          alert('컨텐츠 메타추출이 실패했습니다.\n(' + err.message + ')')
        })
    },
    goPrev() {
      this.$router.go(-1) // 이전 페이지로
    },
    uploadFormData() {
      if (!this.contentFile) {
        return null
      }
      let bodyData = {
        file: this.contentFile,
        contentName: this.contentFile.name,
      }
      console.log('formData :', bodyData)
      console.log('contentFile :', this.contentFile)
      console.log('contentName :', this.contentFile.name)
      return bodyData
    },
    dragenter() {
      console.log('dragenter')
      this.dragging = true
    },
    dragover(event) {
      event.preventDefault()
    },
    dragleave() {
      this.dragging = false
    },
    drop(event) {
      event.preventDefault()
      console.log('drop')
      this.$refs.uploadFile.files =
        event.target.files || event.dataTransfer.files
      this.onChange() // Trigger the onChange event manually
    },
    onChange() {
      console.log('onChange')

      let files = this.$refs.uploadFile.files
      if (files.length > 1) {
        alert('멀티 업로드는 지원하지 않습니다.')
        this.$refs.uploadFile.files = null
        this.dragging = false
        return
      }

      this.createFile(files[0])
    },
    createFile(file) {
      // if (!file.type.match('.*')) {
      //   alert('please select txt file');
      //   this.dragging = false;
      //   return;
      // }
      //
      // if (file.size > 5000000) {
      //   alert('please check file size no over 5 MB.')
      //   this.dragging = false;
      //   return;
      // }
      this.contentFile = file
      console.log(this.contentFile)
      this.dragging = false
      let existSameFile = this.existWorkHistory(this.contentFile.name)
      console.log('existSameFile :', existSameFile)
      if (!existSameFile || existSameFile.length == 0) {
        this.uploadFileData.fileName = this.contentFile.name
        this.uploadFileData.isNew = true
        this.uploadFileData.status = 0
        this.uploadFileData.mediaType =
          this.contentFile.type.indexOf('image') > -1 ? 'img' : 'video'
        this.fileList.unshift(this.uploadFileData)
      } else {
        this.contentFile = null
        alert('동일한 파일명으로 작업한 이력이 있습니다.')
      }
    },
    existWorkHistory(newContentName) {
      return this.fileList.length > 0
        ? this.fileList.filter((data) => data.fileName === newContentName)
        : []
    },
    removeFile() {
      this.contentFile = null
      this.dragging = false
      this.uploadFileData.fileName = ''
      this.uploadFileData.isNew = false
      this.uploadFileData.status = ''
      this.uploadFileData.type = ''
      this.fileList.splice(0, 1)
    },
    preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    trigger() {
      this.$refs.uploadFile.click()
    },
    setSocketEvents() {
      this.$socket.on('progress', (data) => {
        console.log('progress ', data)
        if (this.currentJobData.id == data.id) {
          if (data.step.percentage == 100) {
            console.log('data.step.percentage :' + data.step.percentage)
            this.currentJobData.status = 4
            this.analysisProgress = 0
            this.isDoneAnalysis = true
            this.currentJobData.isNew = false

            this.fileList = this.modifyFileData(this.currentJobData)
            console.log('======', this.fileList)
            localStorage.setItem(
              'adv_meta_history',
              JSON.stringify(this.fileList),
            )
            this.currentJobData = { id: '' }
            this.contentFile = null
            this.$refs.uploadFile.files.value = ''
          } else {
            this.isDoneAnalysis = false
            this.analysisProgress = data.step.percentage
          }
        }
      })

      this.$log.debug('set socket events')
    },
    modifyFileData(curWork) {
      const newArr = this.fileList.map((obj) => {
        if (obj.id === curWork.id) {
          obj = curWork
          return obj
        }

        return obj
      })
      return newArr
    },
  },
  computed: {
    contentFileName() {
      return this.contentFile ? this.contentFile.name : '컨텐츠를 선택하세요'
    },
    extension() {
      return this.contentFile ? this.contentFile.name.split('.').pop() : ''
    },
  },
  mounted() {
    // let externalScript1 = document.createElement('script')
    // externalScript1.setAttribute('src', '/js/upload/jquery.dm-uploader.js')
    // document.body.appendChild(externalScript1)
    // let externalScript2 = document.createElement('script')
    // externalScript2.setAttribute('src', '/js/upload/upload-ui.js')
    // document.body.appendChild(externalScript2)
    // let externalScript3 = document.createElement('script')
    // externalScript3.setAttribute('src', '/js/upload/upload-config.js')
    // document.body.appendChild(externalScript3)
  },
}
</script>

<style>
div.progress-noti-upload {
  height: 20px;
  margin-top: 6px;
}

.dropdown-toggle-btn {
  max-width: 15%;
}
</style>
