$(document).ready(function(){
    
  /* $('.carousel').carousel({
  interval: 1000000
})*/
    
    var audio = document.getElementById("myaudio");
    audio.volume = 0.4;
    
    const wait = time=>new Promise(resolve=>setTimeout(resolve,time))
    
    var vacuum_cell,row,column;
    var trash_cell=[];
    
    
    $('#column').keyup(function(){
        
        $('.vacuum_box').empty(); 
        $('.trash_box').empty(); 
        $('.cleaning_box').empty(); 
        
        row = document.getElementById("row").value;
        column = document.getElementById("column").value;
        
        
        
        
        
        
        
        
        
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= column; j++) {
                
                var vacuum_btn='<button type="button" id="'+i+'-'+j+'" class="btn btn-outline-success vacuum_btn" style="width: 100px;height: 100px;border: 3px solid;"><img class="vacuum_img" width="90%" style="padding: 10 10;visibility: hidden;" src="images/housekeeping.png"/></button>';
                
                $('.vacuum_box').append(vacuum_btn);       
            }
            $('.vacuum_box').append("<br/>"); 
        }
        
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= column; j++) {
                
                var trash_btn='<button type="button" id="'+i+'-'+j+'" class="btn btn-outline-danger trash_btn" style="width: 100px;height: 100px;border: 3px solid;"><img class="trash_img" width="90%" style="padding: 10 10;visibility: hidden;" src="images/trash.png"/></button>';
                
                $('.trash_box').append(trash_btn);       
            }
            $('.trash_box').append("<br/>"); 
        }
        
        
        $('.vacuum_btn').click(function(){
        $('.vacuum_btn').children('.vacuum_img').css({ 'visibility' : 'hidden'});
        $(this).children('.vacuum_img').css({ 'visibility' : 'visible'});
        vacuum_cell=null;
        vacuum_cell=$(this).attr('id');
        //alert(vacuum_cell);
        });
        
        $('.trash_btn').click(function(){
        $(this).children('.trash_img').toggleClass('show');
        //$(this).children('.trash_img').toggle().css({ 'visibility' : 'visible'});
        var cell=$(this).attr('id'); 
            
        if(trash_cell.includes(cell)){
           trash_cell.remove(cell);    
        }
        else if(!trash_cell.includes(cell)){
            trash_cell.push(cell);    
        }
        
        //console.log(trash_cell);
        });
        
        //alert(row+"*"+column);
        
        
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= column; j++) {
                
                var cleaning_btn='<button type="button" id="'+i+'-'+j+'" class="'+i+'-'+j+' btn btn-outline-secondary cleaning_btn" style="width: 100px;height: 100px;border: 3px solid;"><img class="vacuum_img" width="60%" style="padding: 10 10;visibility: hidden;" src="images/housekeeping.png"/><img class="trash_img" width="40%" style="padding: 10 10;visibility: hidden;" src="images/trash.png"/></button>';
                
                $('.cleaning_box').append(cleaning_btn); 
            }
            $('.cleaning_box').append("<br/>"); 
        }
        
        
    });
    
    
    
    
    $("#load_cleaning").click(function(){
        
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= column; j++) {
                $('.'+i+'-'+j).children('.vacuum_img').css({ 'visibility' : 'hidden'});
            if(vacuum_cell==i+'-'+j){
                    $('.'+vacuum_cell).children('.vacuum_img').css({ 'visibility' : 'visible'});  
                    //alert(vacuum_cell);
                }
            }
        }
        
        
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= column; j++) {
                $('.'+i+'-'+j).children('.trash_img').css({ 'visibility' : 'hidden'});
            }
        }
        //$('.cleaning_btn').children('.trash_img').css({ 'visibility' : 'hidden'});
        for (let i = 0; i <= trash_cell.length; i++) {
            $('.'+trash_cell[i]).children('.trash_img').css({ 'visibility' : 'visible'});
        }
        
    })
    
    
    
    $("#start_cleaning").click(function(){
        var vac_cell=vacuum_cell.split("-");
        //console.log("row:"+vac_cell[0]+" , column:"+vac_cell[1]);
        
        var temp_row=vac_cell[0];
        var temp_column=vac_cell[1];
        
        const cleanFunction = async function(){ 
            for (let j = temp_column; j >= 1; j--) {
                
            //for (let j = 1; j <= temp_column; j++) {
                //var k=i-1+j;
                //var k1=j;
                //setTimeout(function (k1) {return function(){
                //setTimeout(function timer() {
                
                await wait(1000);
                    
                $('.cleaning_btn').children('.vacuum_img').css({ 'visibility' : 'hidden'});
                $('.'+vac_cell[0]+'-'+j).children('.vacuum_img').css({ 'visibility' : 'visible'});  
                //vac_cell[0]=vac_cell[0];
                vac_cell[1]=j;
                //console.log("temp row-column:"+vac_cell.join('-'));
                    
                }
                //}, j * 1000); 
                //}}(k1), k1*1000);
                 
            
            for (let i = temp_row; i >= 1; i--) {
                  
                await wait(1000);
                    
                $('.cleaning_btn').children('.vacuum_img').css({ 'visibility' : 'hidden'});
                $('.'+i+'-'+vac_cell[1]).children('.vacuum_img').css({ 'visibility' : 'visible'});  
                vac_cell[0]=i;
                //console.log("temp row-column:"+vac_cell.join('-'));    
            
            }
            
            
            
            
            
            
            for (let i = 1; i <= row; i++) {   
                
                if(isOdd(i)){
                for (let j = 1; j <= column; j++) {
                
                
                await wait(1000);
                
                $('.cleaning_btn').children('.vacuum_img').css({ 'visibility' : 'hidden'});
                $('.'+i+'-'+j).children('.vacuum_img').css({ 'visibility' : 'visible'});  
                vac_cell[0]=i;
                vac_cell[1]=j;
                
                for (let k = 0; k <= trash_cell.length; k++) {
                    if(i+'-'+j==trash_cell[k]){
                        $('.'+trash_cell[k]).children('.trash_img').css({ 'visibility' : 'hidden'});
                       }
                }
                
            }
            }
            
                else if(isEven(i)){
                for (let j = column; j >= 1 ; j--) {
                
                
                await wait(1000);
                
                $('.cleaning_btn').children('.vacuum_img').css({ 'visibility' : 'hidden'});
                $('.'+i+'-'+j).children('.vacuum_img').css({ 'visibility' : 'visible'});  
                vac_cell[0]=i;
                vac_cell[1]=j;
                
                for (let k = 0; k <= trash_cell.length; k++) {
                    if(i+'-'+j==trash_cell[k]){
                        $('.'+trash_cell[k]).children('.trash_img').css({ 'visibility' : 'hidden'});
                       }
                }
                
            }
            }
            
        }
            
            
            
            
            
        
        }
        cleanFunction();
        
        
        
        //for (let i = temp_row; i >= 1; i--) { 
        //}
        
        //console.log("start row-column:"+vac_cell.join('-'));
        
        
        /*const toEnd = async function(){ 
        for (let i = 1; i <= row; i++) {   
            //setTimeout(function timer() {
            for (let j = 1; j <= column; j++) {
                
                //setTimeout(function timer() {
                //console.log("hello world");
                
                await wait(1000);
                
                $('.cleaning_btn').children('.vacuum_img').css({ 'visibility' : 'hidden'});
                $('.'+i+'-'+j).children('.vacuum_img').css({ 'visibility' : 'visible'});  
                vac_cell[0]=i;
                vac_cell[1]=j;
                
                for (let k = 0; k <= trash_cell.length; k++) {
                    if(i+'-'+j==trash_cell[k]){
                        $('.'+trash_cell[k]).children('.trash_img').css({ 'visibility' : 'hidden'});
                       }
                }
                //}, j * 1000);
                
            }
            //}, i * 1000); 
        }
        }*/
        //toEnd();
        
        //console.log("end row-column:"+vac_cell.join('-'));
        
        
    })
    
    
    
    
  
});



Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//function isOdd(num) { return num % 2;};

var isOdd = function(x) { return x & 1; };
var isEven  = function(x) { return !( x & 1 ); };



