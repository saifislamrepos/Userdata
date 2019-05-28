import helper from '../helpers'
import axios from 'axios'
export function flightapi(url,predata,successcb) {
  return axios.get(url).then(function (response) {
    var data = JSON.parse(response.data);
    let flights = predata || {};
    let fltdata = [];
    data.resultData.forEach((resultset) => {
        let fltSch = resultset.fltSchedule.DELBOM20181023;
        let fare = resultset.fareDetails.DELBOM20181023
        fltdata = fltdata.concat(helper.createData(fltSch,fare));
    });
    successcb(fltdata);
  })
}