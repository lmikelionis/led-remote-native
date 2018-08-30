import axios from 'axios';
import queryString from 'query-string';

export const Http = class Http {

  performRequest = (data) => {
      let getString = this.dataToString(data);
      var url = 'http://192.168.1.46/?&';

      let request_string = url + getString + '|';

      // console.log('Will send request string');
      // console.log(request_string);

      axios.get(request_string)
        .then(response => this.performCallback(response));
  }

  performCallback = (response) => {
    // console.log('response');
    // console.log(response.data);
      this.callback[this.callbackName](response.data);
  }

  dataToString = (data) => {
    return queryString.stringify(
      data,
      {sort: false}
    );
  }

  getAllData() {

    let values = {
      "1": Number(this.scope.state.ledState),
      "2": Number(this.scope.state.ledMode),
      "3": this.scope.state.colours.white,
      "4": this.scope.state.colours.yellow,
      "5": this.scope.state.colours.red,
      "6": this.scope.state.colours.green,
      "7": this.scope.state.colours.blue,
    };

    // console.log("GOT VALUES");
    // console.log(values);

    return values;
  }

  getStateAndPerformRequest = () => {
      // console.log("getStateAndPerformRequest");
      // console.log(this.getAllData());
      this.performRequest(this.getAllData());
  }

  setCallback = (name, callback) => {
    this.callbackName = name;
    this.callback = callback;
  }

  setState = (state) => {
    this.scope = state;
  }

}
