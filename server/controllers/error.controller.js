function handleError(req, res) {
    // Your code to handle the error
    console.log('This is the error handler that I created');
}
function getErrorMessage(errMsg) {
    console.log(errMsg);
}
// Export the controller function
export default {
    handleError: handleError,
    getErrorMessage: getErrorMessage
};