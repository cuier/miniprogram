import umfLog from '../../utils/umfLog.js'
import pickerUtil from '../../utils/pickerUtil.js'

const pickerView = {
  /**
   * 初始化picker
   * @param sourceArr 数据源[source1，source2]
   * source1 = [{
   *  "babel":"北京",
   *  "value":0,
   *    "children":[{
   *        "label": "北京",
   *        "value": 0,
   *        "children": [
   *           {"label": "东城区",
   *           "value": 0},
   *    }]
   * }]
   */
  initLinkagePicker(sourceArr,nameArr){
    if(!sourceArr||!nameArr){
      umfLog.error("initLinkagePicker 参数错误")
      return
    }

    this.curApIndex = 0
    this.conf=[]
    this.sourceArr = sourceArr
    this.inited = false

    this.sourceArr.forEach((source,index)=>{
      this.conf.push({
        pickerName:nameArr[index],
        show:false,
        firstId:0,
        secondId:0,
        thirdId:0,
        firstList:this.getFirstList(source),
        secondList:source[0].children,
        thirdList:source[0].children[0].children
      })
    })

    //init ap VM
    this.setData({
      hasLinked:true,
      __ap:this.conf
    }) 

    setTimeout(()=>{
      this.inited = true
    },200)
  },

  /**
   * 初始化普通picker
   * @param normalSourceArr 数据源[source1,source2]
   * source1={
   *   first:[],//一级
   *   second:[],//二级
   *   third:[]//三级
   * }
   */
  initNormalPicker(normalSourceArr,nameArr){
    if(!normalSourceArr){
      umfLog.log("initNormalPicker 参数错误")
      return
    }

    this.curNormalApIndex = 0
    this.normalConf = []
    this.normalSourceArr = normalSourceArr
    this.normalInited = false

    this.normalSourceArr.forEach((source,index)=>{
      let normalLevel = source.third?3:(source.second?2:1)
      this.normalConf.push({
        pickerName:nameArr[index],
        show:false,
        normalLevel:normalLevel,
        firstId:0,
        secondId:0,
        thirdId:0,
        firstList:source.first,
        secondList:source.second,
        thirdList:source.third
      })
    })

    //init ap VM
    this.setData({
      hasNormal:true,
      __nap:this.normalConf
    })

    setTimeout(()=>{
      this.normalInited = true
    },200)
  },

  getFirstList(source){
    return source.map(item=>{
      return {
        label:item.label,
        index:item.index,
        code:item.code
      }
    })
  },

  getSecondList(){
    try{
      return this.sourceArr[this.curApIndex][this.data.__ap[this.curApIndex].firstId].children
    }catch(e){}
  },

  getThirdList(){
    try{
      let cap = this.data.__ap[this.curApIndex]

      return this.sourceArr[this.curApIndex][cap.firstId].children[cap.secondId].children
    }catch(e){}
  },

  setPicker(e){
    let v=e.detail.value, idx = this.curApIndex
    //没有完成初始化，不需要设置值
    if(!this.inited) return
    this.setData({
      [`__ap[${idx}].firstId`]:v[0],
      [`__ap[${idx}].secondId`]:v[1],
      [`__ap[${idx}].thirdId`]:v[2]
    })

    setTimeout(()=>{
      this.setData({
        [`__ap[${idx}].secondList`]:this.getSecondList(),
        [`__ap[${idx}].thirdList`]:this.getThirdList()
      })
    },0)
  },

  setNormalPicker(e){
    let v = e.detail.value, idx = this.curNormalApIndex

    if(!this.normalInited) return

    this.setData({
      [`__nap[${idx}].firstId`]:v[0],
      [`__nap[${idx}].secondId`]:v[1],
      [`__nap[${idx}].thirdId`]:v[2]
    })
  },

  confirmPicker(e){
    let idx = this.curApIndex, capVM = this.data.__ap[idx], ret=[],code=[],pickerName=e.currentTarget.dataset.current

    capVM.firstList[capVM.firstId] && ret.push(capVM.firstList[capVM.firstId].label)
    capVM.secondList[capVM.secondId] && ret.push(capVM.secondList[capVM.secondId].label)
    capVM.thirdList&&capVM.thirdList[capVM.thirdId] &&  ret.push(capVM.thirdList[capVM.thirdId].label)

    capVM.firstList[capVM.firstId] && code.push(capVM.firstList[capVM.firstId].code)
    capVM.secondList[capVM.secondId] && code.push(capVM.secondList[capVM.secondId].code)
    capVM.thirdList && capVM.thirdList[capVM.thirdId] && code.push(capVM.thirdList[capVM.thirdId].code)

    this.setData({
      [`__ap[${idx}].value`]:ret.join("/"),
      [`__ap[${idx}].pickerValue`]: pickerUtil.getLinkedTargetByKnown(this.sourceArr[idx],ret,"label","value") 
    })

    typeof this.onConfirmCB === 'function' && this.onConfirmCB(idx, ret, code, pickerName)
    setTimeout(()=>{
      this.hidePicker()
      this.hideNormalPicker();
    },0)
  },

  confirmNormalPicker(e){
    let idx = this.curNormalApIndex, capVM = this.data.__nap[idx], ret = [], code = [], pickerName = e.currentTarget.dataset.current

    capVM.firstList[capVM.firstId]&&ret.push(capVM.firstList[capVM.firstId].label)
    capVM.secondList&&capVM.secondList[capVM.secondId]&&ret.push(capVM.secondList[capVM.secondId].label)
    capVM.thirdList && capVM.thirdList[capVM.thirdId] && ret.push(capVM.thirdList[capVM.thirdId].label)

    capVM.firstList[capVM.firstId] && code.push(capVM.firstList[capVM.firstId].code)
    capVM.secondList && capVM.secondList[capVM.secondId] && code.push(capVM.secondList[capVM.secondId].code)
    capVM.thirdList && capVM.thirdList[capVM.thirdId] && code.push(capVM.thirdList[capVM.thirdId].code)

    this.setData({
      [`__nap[${idx}].value`]:ret.join('/'),
      [`__nap[${idx}].pickerValue`]: pickerUtil.getNormalTargetByKnown(this.normalSourceArr[idx], ret, "label", "value") 
    })

    typeof this.onNConfirmCB === 'function' && this.onNConfirmCB(idx,ret,code,pickerName)

    setTimeout(()=>{
      this.hidePicker()
      this.hideNormalPicker()
    },0)
  },

  showPicker(e){
    this.lastApIndex = this.curApIndex?this.curApIndex:0
    this.curApIndex = e.currentTarget.dataset.index||0

    this.setData({
      curApIndex:this.curApIndex,
      [`__ap[${this.lastApIndex}].show`]:false,
      [`__ap[${this.curApIndex}].show`]:true,
    })

    this.hideNormalPicker();
  },

  showNormalPicker(e){
    this.lastNormalApIndex = this.curNormalApIndex ? this.curNormalApIndex : 0;
    this.curNormalApIndex = e.currentTarget.dataset.index || 0

    this.setData({
      curApIndex:this.curApIndex,
      [`__nap[${this.lastNormalApIndex}].show`]: false,
      [`__nap[${this.curNormalApIndex}].show`]:true
    })

    this.hidePicker()
  },

  hidePicker(){
    if(this.data.hasLinked){
      this.setData({
        [`__ap[${this.curApIndex}].show`]:false
      })
    }
  },

  hideNormalPicker(){
    if(this.data.hasNormal){
      this.setData({
        [`__nap[${this.curNormalApIndex}].show`]:false
      })
    }
  },

  tapLayor(){
    this.hideNormalPicker()
    this.hidePicker()
  }

}

export default pickerView