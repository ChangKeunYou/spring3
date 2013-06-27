// JavaScript Document
var totalCnt;
var currentPage;

 function fnShowLoading() {
	 $("#loadingArea").show();
 }
 
 function fnCloseLoading(){
	 $("#loadingArea").hide();
 }
 
 
 var oBlock = {
			blockStart : function(root,divID,message){
				var msg = (message == null || message == "") ? "데이터를 가지고 오는 중입니다 잠시만 기다려주십시요.." : $.trim(message);
				
				if(divID == null || divID ==""){
	                $.blockUI({//로딩창
	                    message: "<img src='" + root + "/resources/images/view/grid-loading.gif'>" + msg,
	                    backgroundColor: '#000',
	                    css: { border: '1px solid #a00' },
	                    cursor: "wait",
	                    fadeIn: 10,
	                    overlayCSS: {
	                        backgroundColor: '#000',
	                        opacity: 0.8
	                    },
	                    growlCSS: {
	                        backgroundColor: '#FFFFFF'
	                    }
	                }); //End Of blockUI
				}else{
					
		            $("#" + divID).block({ 
		                message : "<img src='" + root + "/resources/images/view/grid-loading.gif'>" + msg,
		                backgroundColor: '#000',
		                css: { border: '3px solid #a00' }, 
		                cursor: "wait",
		                fadeIn: 10,
		            	overlayCSS: {
		                	backgroundColor: '#000',
		                	opacity: 0.8
		            	},
		                growlCSS: {
		                    backgroundColor: '#FFFFFF'
		                }
		            }); 
				}
				
			},
			
			blockLayerStart : function(root,divID,layerObj){
				 $("#" + divID).block({ 
		                message : layerObj,
		                backgroundColor: '#000',
		                css: { cursor: "default"}, 
		                fadeIn: 200,
		            	overlayCSS: { 
		                	backgroundColor: '#000',
		                	opacity: 0.8,
		                	  cursor:          'default' 
		            	},
		                growlCSS: {
		                    backgroundColor: '#FFFFFF'
		                }
		         });
			},
			
			
			blockEnd : function(divID){
				if(divID == null || divID =="") $.unblockUI({ fadeOut: 100 });
				$("#" + divID).unblock(); 	
			}
			
	};
	