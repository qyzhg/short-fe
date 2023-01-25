<template>
  <div id="app">
      <a-row type="flex" justify="space-between" align="bottom">
        <div style="height: 20px"/>
      </a-row>
      <a-row type="flex" justify="space-between" align="bottom">
        <a-col :lg="{ span: 6, offset: 9 }" :xs="{ span: 12, offset: 6 }">
          <div style="width: 100%">
            <img src="/static/img.png" alt="logo" style="display: block;margin: auto;width: 100%;"/>
          </div>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" align="bottom">
        <div style="height: 20px"/>
      </a-row>
      <a-row type="flex" justify="space-between" align="bottom">
        <a-col :lg="{ span: 12, offset: 6 }" :xs="{ span: 20, offset: 2 }">
          <span>
            <a-input-search style="width: 100%" @search="create" v-model="url">
              <a-button slot="enterButton">
                <a-icon type="login" />
              </a-button>
            </a-input-search>
          </span>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between" align="bottom">
        <div style="height: 50px"/>
      </a-row>
      <a-row type="flex" justify="space-between" align="bottom">
        <a-col :lg="{ span: 2, offset: 11 }" :xs="{ span: 2, offset: 11 }" style="text-align: center;">
          <a-popover placement="rightBottom">
            <template slot="content">
              <p>
                <a href="https://github.com/qyzhg/short" target="_blank" style="color: black"><a-icon type="github" /> 后端地址</a>
              </p>
              <p>
                <a href="https://github.com/qyzhg/short-fe" target="_blank" style="color: black"><a-icon type="github" /> 前端地址</a>
              </p>
            </template>
            <a-icon type="github" style="font-size: 25px;"/>
          </a-popover>
        </a-col>
      </a-row>
    <a-modal v-model="visible" title="生成短链成功">
      <template slot="footer">
        <a-button key="submit" size="small" @click="visible=false">
          OK
        </a-button>
      </template>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="中文域名">
          <span>
            <span>
              https://短.fun/{{ this.short }}
            </span>
            <a-button type="link" @click="cp(`https://短.fun/${ short }`)">
              <a-icon type="copy"/>
            </a-button>
          </span>
        </a-form-item>
        <a-form-item label="punycode">
          <span>
            <span>
              https://xn--s7y.fun/{{ this.short }}
            </span>
            <a-button type="link" @click="cp(`https://xn--s7y.fun/${ short }`)">
              <a-icon type="copy"/>
            </a-button>
          </span>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {create} from "@/request";

export default {
  name: 'App',
  data() {
    return {
      url: undefined,
      visible: false,
      short: undefined,
    }
  },
  created () {
  },
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    async create(){
      try{
        let res = await create(this.url)
        if (res.data.ok){
          this.short = res.data.data
          this.visible = true
          return
        }
        let errMsg = res.data.err?":"+res.data.err: ""
        this.$message.error("短链生成失败"+errMsg)
      }catch (e) {
        this.$message.error(e.message || "短链接生成错误")
      }
    },
    cp(text){
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        this.$message.success("复制成功!")
      }
    }
  }
}
</script>
