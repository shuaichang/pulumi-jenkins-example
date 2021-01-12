'use strict';
/**
* @param event: the input parameter of the function.
* @param context: stores the information of the running function.
* @param callback: the callback function to return data or errors.
*/

exports.handler = (event, context, callback) => {
    console.log(event.toString())
    callback(null, `hello world, hello Jenkins and Pulumi`);
}
