
var myModule = {};
//myModule.myFunction = function(){console.log('I am inside myJs.js file');};
var UID_USER = 'attendee1_uid',
realTimeClient = '',
            rtcc = {},
            meetingPointAttendee,
            // Define the optional parameters
            options = {
                debugLevel : 1,
                displayName : 'External User',
                defaultStyle: true,
                legacy: false,
            }


myModule.joinCall = function (){
    rtcc = new Rtcc('e32b289cb8036778d32191992ce1cc78061d3723', "host_uid", 'external', options);
    // Call if the RtccDriver is not running on the client computer and if the browser is not WebRTC-capable
    rtcc.onRtccDriverNotStarted = function (downloadUrl) {
        var answer = confirm('Click OK to download and install the Rtcc client.');
        if (answer === true) { window.location = downloadUrl; }
    };
    var id = document.getElementById('meeting_point_id').value
    rtcc.joinConfCall(id);
}


        
           
// myModule.mySightCallUI = function startCallUi() {
//     $('#start_btn').prop("disabled", true);
//     $('#currentUser').prop("disabled", true);
//     $('#connecting').text('Connecting...');
//     currentUserId = $('#currentUser').val();
//     var displayName = $('#currentUser option:selected').text();
//     //initialize(currentUserId, displayName);
//     alert(displayName);
    
// var rtcc = new Rtcc(APP_IDENTIFIER, undefined, 'internal', rtccOptions);
// var storedDisplayName = '';
//   }