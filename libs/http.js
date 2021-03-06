import axios from 'axios';
import queryString from 'query-string';

export const Http = class Http {

  performRequest = (url, data) => {
      // console.log('data  ', data);
      let getString = this.dataToString(data);
      // console.log('getString  ', getString);

      let request_string = url + getString;
      console.log('request_string  ', request_string);

      const httpClient = axios.create();
      httpClient.defaults.timeout = 2000;

      httpClient.get(request_string)
          .then(
            response => this.performCallback(response)
          ).catch(
              error => {
                  this.performCallbackError(error)
              }
          );
  };

  performCallback = (response) => {
      this.callback[this.callbackName](response.data);
  };

  performCallbackError = (error) => {
      this.callbackError[this.callbackErrorName](error);
  };

  dataToString = (data) => {
      return queryString.stringify(
          data,
          {sort: false},
      );
  };

  getAllData() {

      let data = {
          "state": Number(this.scope.state.ledState),
          "mode": Number(this.scope.state.ledMode),
          "ledMode": this.scope.state.mode,
          "coldWhite": this.scope.state.colours.white.value,
          "warmWhite": this.scope.state.colours.yellow.value,
          "red": this.scope.state.colours.red.value,
          "green": this.scope.state.colours.green.value,
          "blue": this.scope.state.colours.blue.value,
      };

      // console.log('getAllData', data);

      return data;
  };

  getStateAndPerformRequest = () => {
      let data = this.getAllData();
      // console.log('getStateAndPerformRequest', data);
      this.performRequest('http://192.168.1.47:8080/?', data);
  };

  setCallback = (name, callback) => {
    this.callbackName = name;
    this.callback = callback;
  };

  setCallbackError = (name, callback) => {
    this.callbackErrorName = name;
    this.callbackError = callback;
  };

  setState = (state) => {
    this.scope = state;
  };

};
