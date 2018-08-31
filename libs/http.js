import axios from 'axios';
import queryString from 'query-string';

export const Http = class Http {

  performRequest = (data) => {

      // console.log('performRequest');

      let getString = this.dataToString(data);
      let url = 'http://192.168.1.47:8080/?';

      let request_string = url + getString;

      // console.log('Will send request string');
      // console.log(request_string);

      axios.get(request_string)
        .then(response => this.performCallback(response));
  };

  performCallback = (response) => {
      console.log('response');
      console.log(response.data);
      this.callback[this.callbackName](response.data);
  };

  dataToString = (data) => {
    return queryString.stringify(
      data,
      {sort: false}
    );
  };

  getAllData() {
      return {
        "state": Number(this.scope.state.ledState),
        "mode": Number(this.scope.state.ledMode),
        "coldWhite": this.scope.state.colours.white,
        "warmWhite": this.scope.state.colours.yellow,
        "red": this.scope.state.colours.red,
        "green": this.scope.state.colours.green,
        "blue": this.scope.state.colours.blue,
    };
  };

  getStateAndPerformRequest = () => {
      // console.log("getStateAndPerformRequest");
      // console.log(this.getAllData());
      this.performRequest(this.getAllData());
  };

  setCallback = (name, callback) => {
    this.callbackName = name;
    this.callback = callback;
  };

  setState = (state) => {
    this.scope = state;
  };

};
