/*
'''These Codes Are Written By Mehdi Touyserkani
    Email Address: Ir_Bestpro@yahoo.com
    Website: Https://www.Ir-Bestpro.com
 '''
*/

$(document).ready(function(){

    var min_height = $('#stand ul li').first().height(); // get first element height

    $('#stand ul li').each(function(){
        $(this).click(function(e){
            e.stopPropagation();
            $(this).height() <= min_height ? $(this).css('height' , 'auto') : $(this).css('height' , min_height);
        });
    });

});