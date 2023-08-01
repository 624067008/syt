<template>
  <div class="register">
    <div class="title">
      <div class="name">{{ detailStore.hospitalInfo.hospital?.hosname }}</div>
      <div class="level">
        <el-icon size="14px"><Sunny /></el-icon>{{ detailStore.hospitalInfo.hospital?.param.hostypeString }}
      </div>
    </div>
    <div class="content">
      <div class="logo">
        <img :src="`data:image/jpeg;base64,${detailStore.hospitalInfo.hospital?.logoData}`" alt="" />
      </div>
      <div class="info">
        <div class="title">挂号规则</div>
        <div class="item">
          <span>预约周期：{{ detailStore.hospitalInfo.bookingRule?.cycle }}</span
          ><span>放号时间：{{ detailStore.hospitalInfo.bookingRule?.releaseTime }}</span
          ><span>停挂时间：{{ detailStore.hospitalInfo.bookingRule?.stopTime }}</span>
        </div>
        <div class="item">具体地址：{{ detailStore.hospitalInfo.hospital?.param?.fullAddress }}</div>
        <div class="item">路线规划：{{ detailStore.hospitalInfo.hospital?.route }}</div>

        <div class="item">退号时间：就诊前一工作日{{ detailStore.hospitalInfo.bookingRule?.quitTime }}前取消</div>
        <div class="title">医院预约规则</div>
        <div class="item" v-for="(item, idx) in detailStore.hospitalInfo.bookingRule?.rule">
          {{ idx + 1 + '.' + item }}
        </div>
      </div>
    </div>

    <div class="department">
      <div class="leftNav">
        <ul>
          <li
            :class="{ active: i == activeIdx }"
            v-for="(item, i) in detailStore.department"
            :key="item.depcode"
            @click="activeIdxChangeHandler(i)">
            {{ item.depname }}
          </li>
        </ul>
      </div>
      <div class="rightContent">
        <div class="showDepartment" v-for="item in detailStore.department" :key="item.depcode">
          <div class="dep-title">{{ item.depname }}</div>
          <ul>
            <li @click="handleDepClick(child.depcode)" v-for="child in item.children" :key="child.depcode">
              {{ child.depname }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail'
import useUserStore from '@/store/modules/user'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

const detailStore = useDetailStore()
const activeIdx = ref(0)

const activeIdxChangeHandler = (i: number) => {
  activeIdx.value = i

  let depTitles = document.querySelectorAll('.dep-title')
  depTitles[i].scrollIntoView({ behavior: 'smooth' })
}

const handleDepClick = (depcode: string) => {
  const hoscode = $route.query.hoscode
  $router.push({ path: '/hospital/register_step1', query: { depcode, hoscode } })
}
</script>

<style scoped lang="scss">
.register {
  flex-direction: column;
  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    .name {
      font-size: $lFontSize;
      margin-right: 10px;
    }
    .level {
      color: #777;
      font-size: 14px;
      display: flex;
      justify-content: center;
    }
  }

  .content {
    display: flex;
    margin-top: 30px;
    .logo {
      flex: 1;
      display: flex;
      justify-content: center;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 9;
      .title {
        font-size: $sFontSize;
        margin: 8px 0;
      }
      .item {
        font-size: $sFontSize;
        color: #777;
        line-height: 25px;
      }
    }
  }

  .department {
    display: flex;
    height: 500px;
    width: 100%;
    margin-top: 20px;

    .leftNav {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: start;
      padding: 0;
      margin-right: 10px;
      ul {
        margin: 0;
        background-color: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        height: 500px;
        justify-content: space-evenly;
        li {
          list-style: none;
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          &.active {
            border-left: 3px solid #e8792f;
            color: #e8792f;
            background-color: #fff;
            font-weight: 600;
          }
        }
      }
    }
    .rightContent {
      flex: 9;
      height: 500px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .showDepartment {
        .dep-title {
          background-color: rgb(248, 248, 248);
          font-size: $mFontSize;
        }
        ul {
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: 100%;
          background: #fff;
          li {
            list-style: none;
            width: 33%;
            height: 30px;
            line-height: 30px;
            color: #777;
            font-size: $sFontSize;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
