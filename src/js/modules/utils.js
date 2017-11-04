import storage from './storage'
export const Storage = storage

export const formatTime = function(value) {
  var sec = Number(value);
  var min = 0;
  var hour = 0;
  //alert(sec);
  if(sec > 60) {
    min = Number(sec/60);
    sec = Number(sec%60);
    //alert(min+"-"+sec);
    if(min > 60) {
      hour = Number(min/60);
      min = Number(sec%60);
    }
  }
  var secTemp =  String( parseInt(sec));
  if(secTemp.length==1)
    secTemp = "0"+secTemp;

  var result = secTemp;
  var minTemp = String( parseInt(min));
  if(minTemp.length==1)
    minTemp = "0"+minTemp;
  result = minTemp+":"+result;

  if(hour > 0) {
    result = ""+parseInt(hour)+":"+result;
  }
  return result;
};

export function sleep(ms = 0) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
