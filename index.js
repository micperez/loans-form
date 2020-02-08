/**
 * 
 */
$(document).ready(function () {
    // process the loan form
    $('#loan-form').submit(function (event) {
        event.preventDefault();
        console.log('SUBMIT THIS LOAN REQUEST!!');
        var requestData = {
            'model-namespace': 'https://kiegroup.org/dmn/_D89BFD0C-114B-4BFA-A986-134CD385F2CD',
            'model-name': 'Loan Approval',
            'dmn-context': {
                    'Credit Score': Number($('#creditScore').val()),
                    'DTI': Number($('#dti').val())
                }
        };

        var requestUrl = $('#serverAddress').val() + '/services/rest/server/containers/' + $('#projectName').val() + '/dmn'

        $.ajax({
            type        : 'POST',
            url         : requestUrl,
            data        : JSON.stringify(requestData),
            dataType    : 'json',
            headers     : {
                'Accept'        : 'application/json',
                'content-type'  : 'application/json', 
                'Authorization' : 'Basic ' + btoa($('#user').val() + ':' + $('#password').val())
            }
        }).done( function (data) {
            if(data.result) {
                if('SUCCESS' == data.type) {
                    $('#result').html(data.result['dmn-evaluation-result']['dmn-context']['Loan Approval']);
                } else {
                    console.log(data);
                    $('#result').html('ERROR: ' + data.type);
                }
            } else {
                console.log(data);
                $('#result').html('ERROR: No result from server');
            }
        }).fail( function (jqXHR, textStatus, errorThrown) {
            $('#result').html(textStatus);
            console.log(textStatus);
        });
    });
});