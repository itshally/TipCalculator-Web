$(document).ready(() => {

    var billValue = document.querySelector('#bill-value'), //bill input
        tipValue = document.querySelector('#tip-value'), // tip input
        numOfPeopleValue = document.querySelector('#number-of-people-value'), //numOfPeople input
        totalBillResult = document.querySelector('#total-bill-result'), //total bill result
        totalTipResult = document.querySelector('#total-tip-result'), //total tip result
        tipPerPersonResult = document.querySelector('#split-tip-result'), //total tip per person
        billPerPersonResult = document.querySelector('#split-bill-result'), //total bill per person
        //default values
        defaultBillValue = 0,
        defaultTipValue = 15,
        defaultNumOfPeople = 2,
        defaultBillTotal = 0,
        defaultTipAmount = 0,
        errorMsg = "";

    $('.calculate-container').hide();

    $('.back-button').click(() => {
        $('.page-title').show();
        $('.index-view').fadeIn();
        $('.calculate-container').hide();
        Default();
    });

    $("#yes-button").click(() => {
        $('.page-title').hide();
        $('.index-view').fadeOut();
        $('.calculate-container').fadeIn();
        $('.calculate-container').css("display", "block");
        $('.split-bill-option').show();
        $('.default-hide').hide();
    });

    $("#no-button").click(() => {
        $('.page-title').hide();
        $('.index-view').fadeOut();
        $('.calculate-container').fadeIn();
        $('.calculate-container').css("display", "block");
        $('.split-bill-option').hide();
        $('.default-hide').show();
    });

    $('#tip-value').on('input', (e) => {
        Calculate();
        var tipValue = $(e.target).val();
        if (tipValue.includes("-")) {
            errorMsg = "Tip value must be positive.";
            ErrorHandling(errorMsg);
        }else if(!parseFloat(tipValue)){
            errorMsg = "Invalid tip value.";
            ErrorHandling(errorMsg);
        }
    });


    $('#bill-value').on('input', (e) => {
        Calculate();
        var billValue = $(e.target).val();
        if (billValue.includes("-")) {
            errorMsg = "Bill value must be positive";
            ErrorHandling(errorMsg);
        } else if(!parseFloat(billValue)){
            errorMsg = "Invalid bill value";
            ErrorHandling(errorMsg);
        }

    });

    $('#number-of-people-value').on('input', (e) => {
        var personValue = $(e.target).val();
        if (personValue.includes('.')) {
            errorMsg = "Number of people must be integer.";
            ErrorHandling(errorMsg);
        }
        else if(personValue.includes('-')){
            errorMsg = "Number of people must be positive integer.";
            ErrorHandling(errorMsg);
        }
        else if(personValue === '0'){
            errorMsg = "Number of people must be at least more than zero.";
            ErrorHandling(errorMsg);
        }
        else{
            Calculate();
        }
    });


    //displays all the default values
    Default();

    function Default() {
        billValue.value = "";
        tipValue.value = Number(defaultTipValue);
        numOfPeopleValue.value = Number(defaultNumOfPeople);
        totalBillResult.textContent = defaultBillValue.toFixed(2);
        totalTipResult.textContent = defaultTipAmount.toFixed(2);
        tipPerPersonResult.textContent = defaultBillValue.toFixed(2);
        billPerPersonResult.textContent = defaultTipAmount.toFixed(2);
    }

    function Calculate() {
        $tipAmount = (Number(tipValue.value) / 100) * Number(billValue.value);
        $totalBill = $tipAmount + Number(billValue.value);
        $splitTip = $tipAmount / Number(numOfPeopleValue.value);
        $splitBill = $totalBill / Number(numOfPeopleValue.value);

        $('#total-bill-result').html($totalBill.toFixed(2));
        $('#total-tip-result').html($tipAmount.toFixed(2));
        $('#split-tip-result').html($splitTip.toFixed(2));
        $('#split-bill-result').html($splitBill.toFixed(2));
    }

    //Sets the bill value to decimal
    function setDecimal(event) {
        this.value = parseFloat(this.value).toFixed(2);
    }

    function ErrorHandling(x) {
        alertify.minimalDialog || alertify.dialog('minimalDialog', function () {
            return {
                main: function (content) {
                    this.setContent(content);
                },
                setup: function () {
                    return {
                        options: {
                            title: '<i class="fas fa-exclamation-circle"></i> Warning',
                            closableByDimmer: false,
                            onclose: () => {
                                Default();
                            }
                        }
                    }
                },
                prepare: function(closeEvent){
                    Default(closeEvent);
                },
                hooks: {
                    onclose: function () {
                        Default();
                    }
                }
            };
        });
        alertify.minimalDialog(x);
    }
    
});