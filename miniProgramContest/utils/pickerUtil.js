/**
 * created by cuilijuan on 2018/2/27
 * 初始版本 picker中code、label和value的互换
 */


class pickerUtil {
  /**
   * linkedPicker通过已知值获取目标值
   * @param linkedArr,knownArr,knownName,targetName
   */
  getLinkedTargetByKnown(linkedArr, knownArr, knownName='code', targetName='label'){
    if(!knownArr){
      return ''
    }

    let targetArr = []
    let parent = {}
    knownArr.forEach((item,index)=>{
      let helper = {
        _filter:function(ite){
          return ite[knownName]===item
        }
      }
      if(index==0){
        parent = linkedArr.filter(helper._filter)[0]
      }else{
        parent = parent?parent.children.filter(helper._filter)[0]:""
      }
      parent && targetArr.push(parent[targetName])
    })

    return targetArr
  }
/**
   * normalPicker通过已知值获取目标值
   * @param linkedArr,knownArr,knownName,targetName
   */
  getNormalTargetByKnown(normalArr, knownArr, knownName='label', targetName='code'){
    if(!knownArr){
      return ''
    }

    let targetArr = []
    let parent = {}

    knownArr.forEach((item,index)=>{
      let helper = {
        filter: function(ite){
          return ite[knownName] === item
        }
      }

      if (index == 0 && normalArr.first){
        parent = normalArr.first.filter(helper.filter)[0]
      }else if(index==1 && normalArr.second){
        parent = normalArr.second.filter(helper.filter)[0]
      }else if(index == 2 && normalArr.third){
        parent = normalArr.third.filter(helper.filter)[0]
      }
      parent && targetArr.push(parent[targetName])
    })

    return targetArr
  }
}

pickerUtil = new pickerUtil
module.exports = pickerUtil