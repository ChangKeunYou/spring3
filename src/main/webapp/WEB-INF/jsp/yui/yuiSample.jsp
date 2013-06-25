<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../include/ssi.jsp" %>

<script type="text/javascript">
	
	var dataSource;
	var myCallback;
	var table; 
	
	//jQuery
	$(function(){
		/*
		$("#search_btn").click(function(){
			alert("1");
		});
		*/
	});
	
	//YUI node(dom) controller
	YUI().use(	'node',"io-form", "datatable-core" , "datatable-base" , "datasource-get" ,
				"datasource-io","datasource-jsonschema"  , "datatable-datasource", 
				"datatable-scroll", "datatable-message", "datatable-column-widths" ,
				"datatable-formatters", "datatable-mutable" , "datatable-head" ,
				"datatable-body" , "gallery-datatable-paginator","gallery-paginator-view" , function (Y) {
		//alert("YUI node ready function");
		
		//var data = [{"Results":{"Result":[{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test1","CARDNUMBER":"4028570582920100","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0100"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test2","CARDNUMBER":"4028570582920101","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0101"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test3","CARDNUMBER":"4028570582920102","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0102"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test4","CARDNUMBER":"4028570582920103","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0103"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test5","CARDNUMBER":"4028570582920104","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0104"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test6","CARDNUMBER":"4028570582920105","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0105"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test7","CARDNUMBER":"4028570582920106","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0106"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test8","CARDNUMBER":"4028570582920107","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0107"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test9","CARDNUMBER":"4028570582920108","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0108"},{"EXPMONTH":"08","EXPYEAR":"2013","MODIFIEDDATE":"20130801","CREDITCARDID":"test10","CARDNUMBER":"4028570582920109","CARDTYPE":"Vista","CARDNUMBER_V":"4028-5705-8292-0109"}]}}];
		
		//=====================YUI그리드 영역=====================
		var o = {
				url : "${root}/yui/yuiSearch_Sample.json",
				keys : [
				       	 	{key : "CREDITCARDID"},
				       	 	{key : "CARDTYPE"},
				       	 	{key : "CARDNUMBER"},
				       	 	{key : "CARDNUMBER_V"},
				       	 	{key : "EXPYEAR"},
				       	 	{key : "EXPMONTH"},
				       	 	{key : "MODIFIEDDATE"}
				       ],
				cols : [
				       	 	{key : "CREDITCARDID" , label : "카드ID"},
				       	 	{key : "CARDTYPE" , label : "카드타입"},
				       	 	{key : "CARDNUMBER" , label : "카드번호"},
				       	 	{key : "CARDNUMBER_V" , label : "카드번호 포맷터"},
				       	 	{key : "EXPYEAR" , label : "만료년"},
				       	 	{key : "EXPMONTH" , label : "만료월"} ,
				       	 	{key : "MODIFIEDDATE" , label : "수정일자"}
				        ]       
		};
		
		
		
		dataSource = new Y.DataSource.IO({
	        source: o.url,
	        //post 방식으로 보넬 경우 이런식으로 설정해야 된다
	        //table.datasource.load(); 이렇게 계속 사용 가능
	        ioConfig : {
	        	method: 'POST',
	  	        form: {
	  	            id: Y.one("#search_Form")
	  	        }
	        }
			
	    });
		
        myCallback = {
                success: function(e){
                    alert(e.response);
                   // alert("데이터 조회 성공");
                },
                failure: function(e){
                    alert("!!!!Could not retrieve data: " + e.error.message);
                }
            };
		
        
		dataSource.plug(Y.Plugin.DataSourceJSONSchema, {
	        schema: {
	           resultListLocator: "Results.Result",
	           resultFields: o.keys
	        }
	    });
		
		
		/*
		dataSource.sendRequest({
	        request:"testParam1=value1&testParam2=value2",
	        callback:myCallback,
	        cfg:{method:"POST",form:{id:Y.one("#search_Form")}}
	    });
		*/
		
		
		table = new Y.DataTable({
		    columns : o.cols,
		    summary : "YUI샘플",
		    height: '328px',
		    width: '100%',
		    scrollable: true
		    //caption : "YUI샘플"
		});
		
 		//table.plug(Y.Plugin.DataTableDataSource, {datasource: dataSource});
 		table.plug(Y.Plugin.DataTableDataSource, {datasource: dataSource});
 		
 		//table.datasource.load();
 		
 		table.render("#YUI_Grid_Area1").showMessage("조회 버튼을 클릭하여 주십시요.");
 		
 	     

		//table.datasource.load();
		
		
		
		
		/*
		dataSource.after("response", function() {
			table.render("#YUI_Grid_Area1");
			//table.datasource.load();
		});
		*/
		
		
		
		

		
		//=====================dom 컨트롤러 영역=====================
		
		//조회
		Y.one("#search_btn").on("click",function(){
			//사용시 데이터를 post 방식으로 계속 넘기고 싶을 경우
			//table.render("#YUI_Grid_Area1");
			table.datasource.load(); 
			//설정 부분에서 아래와 같이 세팅이 되어야 한다
			/*
			dataSource = new Y.DataSource.IO({
	        source: o.url,
	        ioConfig : {
	        	method: 'POST',
	  	        form: {
	  	            	id: Y.one("#search_Form")
	  	            
	  	        	}
	        	}
	    	});
			*/
			
			/*
			dataSource.sendRequest({
				//request:"?output=json",
		        callback:myCallback,
		        cfg:{method:"POST",form:{id:Y.one("#search_Form")}}
			});
			*/
		});
		
		//등록
		Y.one("#regist_btn").on("click",function(){
			alert("등록 개발중.");
		});
		
		//수정
		Y.one("#update_btn").on("click",function(){
			alert("수정 개발중.");
			
		});
		
		//삭제
		Y.one("#delete_btn").on("click",function(){
			alert("삭제 개발중.");
			
		});
		
		
		
	
		
		
		
	});
	
	
	
	
	
	
</script>
		
	<div class="span10">
	
	<!-- 헤더영역 -->
	<div class="page-header">
		<table width="100%">
			<tr>
			<!-- 페이지 제목 영역 -->
			
				<td width="30%">
					<!--  
					<h4><i class="icon-hand-right" ></i>신용카드정보(YUI)조회</h4>
					-->
					<span class="label label-inverse">
						<i class="icon-hand-right icon-white" ></i>
						신용카드정보(YUI)조회
					</span>
				</td>
					
			<!-- 버튼영역 -->
				<td width="70%">
					<div class="btn-toolbar pull-right" style="margin-right: 3px;">
					
						<div class="btn-group">
							<button class="btn btn-primary" id="search_btn">
								<i class="icon-search icon-white"/></i>조회
							</button>
						</div>
						
						<div class="btn-group">
							<button class="btn btn-primary" id="regist_btn">
								<i class="icon-plus icon-white"/></i>등록
							</button>
						</div>
						
						<div class="btn-group">
							<button class="btn btn-info" id="update_btn">
								<i class="icon-pencil icon-white"/></i>수정
							</button>
						</div>
						
						
						<div class="btn-group">
							<button class="btn btn-danger" id="delete_btn">
								<i class="icon-remove icon-white"/></i>삭제
							</button>
						</div>
				
						
						<div class="btn-group">
			
							<button class="btn btn-success dropdown-toggle" id="excel_btn" data-toggle="dropdown">
								<i class="icon-download icon-white"></i>엑셀다운<span class="caret"></span>
							</button>
							<!-- pull-right 클래스를 줘서 위치 맞출건 화면에 스크롤 생기지 않도록 -->
							<ul class="dropdown-menu pull-right">
				              <li><a class="clickable" id="page_excel" custom_attr="page">Page</a></li>
				              <li class="divider"></li>
				              <li><a class="clickable" id="all_excel" custom_attr="all">All</a></li>
				            </ul>
			            </div>
			     		
			     		
						
						
					 </div>
					 
				
				</td>
			</tr>
		</table>
	</div>
	
	<!-- 검색조건 영역 -->   
	 <form id="search_Form" name="search_Form" class="well form-search" style="padding: 8px;">
      	<table id="search_Tbl" class="table table-bordered">
			<tr>
				<th width="15%">카드타입</th>
				<td width="35%">
					<select id="s_card_type" name="s_card_type" class="span4">
						<option value="none">선택</option>
						<option value="SuperiorCard">SuperiorCard</option>
						<option value="Vista">Vista</option>
						<option value="Distinguish">Distinguish</option>
						<option value="ColonialVoice">ColonialVoice</option>
					</select>
				</td>
				<th width="15%">카드번호</th>
				<td width="35%">
					<!-- class span1,2,3,4 로 크기 조절 가능 -->
					<input type="text" id="s_card_no" name="s_card_no" class="input-medium" placeholder="ex)40285705..." />
				</td>
			</tr>
			<tr>
				<th>유효기간년</th>
				<td>
					<input type="text" id="s_exp_year" name="s_exp_year" class="input-medium" placeholder="ex)2008" />
				</td>
				<th>유효기간월</th>
				<td>
					<input type="text" id="s_exp_month" name="s_exp_month" class="input-medium" placeholder="ex)1~12" />
				</td>
			</tr>
		</table>
      </form>	 	
		
		

	<!-- 컨텐츠 영역 -->
      <div class="row-fluid">
    	
    	<div class="span12">
    		
    		<span class="label label-inverse">
	    		<i class="icon-search icon-white"></i>
	    		조회결과
    		</span>
    		
    		<div style="height: 5px;"></div>
    		
    		<!-- YUI Grid -->
    		<div id="YUI_Grid_Area1"></div>
    		
    		<!-- YUI 페이징 -->
    		<div id="pagContB"></div>
			<div id="tmpl-bar"></div>
    	</div>
    	
    	
      </div>
      
    </div>  