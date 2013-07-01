<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../include/ssi.jsp" %>

<style type="text/css">

/*   Paginator Bar CSS  */


		.pagBar {
            font-size:      12px;
            padding:        4px 0;
        }

        .pagBar img.pgControls {
            width:          auto;
            height:         12px;
            padding:        0 4px;
            border:         none;
            vertical-align: middle;
            cursor:         pointer;
        }

    	.pagBar img.yui3-pagview-disabled {
            cursor:         pointer;
        }
		
		
		#pagBarACont {
            padding:    3px 0 0 2px;
            width:      99.75%;
            height:     auto;
        }
        
        #pagBarACont a.yui3-pagview-link-page {
            color:            black;
            background-color: #f0f0f0;
            border:           10px solid #d3d3d3;
            text-decoration:  none;
            padding:          4px;
            margin:           0 10px 0 0;
        }
        
		.yui3-pagview-select-rowsperpage{
			width: 80px;
		}
		
		.yui3-pagview-input-page{
			 width: 40px; 
		}
		
</style>


<script type="text/javascript">
	
	var dataSource;//데이터 소스
	var myCallback;//콜백
	var table; //테이블 렌더
	var o; //YUI그리드 및 페이징을 위한 object 모음
	
	//jQuery
	$(function(){
		
		
		
		
	});
	
		
	
	//YUI node(dom) controller
	YUI().use(	'node',"io-form", "datatable-core" , "datatable-base" , "datasource-get" ,
				"datasource-io","datasource-jsonschema"  , "datatable-datasource", 
				"datatable-scroll", "datatable-message", "datatable-column-widths" ,
				"datatable-formatters", "datatable-mutable" , "datatable-head" ,
				"datatable-body" , "gallery-datatable-paginator","gallery-paginator-view" , "button-group" , function (Y) {
		
		/*
		Y.on("domready",function(){
			
			
		});
		*/
		//Y.one("#s_card_type").set("value","Distinguish");
		
		//=====================YUI그리드 영역 시작=====================
	   o = {
				url : "${root}/yui/yuiSearch_Sample.json",
				keys : [
							{key : "RNUM"},	
				       	 	{key : "CREDITCARDID"},
				       	 	{key : "CARDTYPE"},
				       	 	{key : "CARDNUMBER"},
				       	 	{key : "CARDNUMBER_V"},
				       	 	{key : "EXPYEAR"},
				       	 	{key : "EXPMONTH"},
				       	 	{key : "MODIFIEDDATE"}
				       ],
				cols : [
							{key : "RNUM" , label : "No"},
				       	 	{key : "CREDITCARDID" , label : "카드ID"},
				       	 	{key : "CARDTYPE" , label : "카드타입"},
				       	 	{key : "CARDNUMBER" , label : "카드번호"},
				       	 	{key : "CARDNUMBER_V" , label : "카드번호 포맷터"},
				       	 	{key : "EXPYEAR" , label : "만료년"},
				       	 	{key : "EXPMONTH" , label : "만료월"} ,
				       	 	{key : "MODIFIEDDATE" , label : "수정일자"}
				        ],
				yuipagiDiv : "#yui_paginator_area",
				yuiPaginator : "#pagBarACont",
				yuiPagiscript : "#tmpl-bar-A",
				webroot : "${root}"  ,
				page : 1,
				itemsPerPage : 25 //페이징시 초기 보여질 페이지 여기만 고치면 된다
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
                    //alert("데이터 조회 성공");
                },
                failure: function(e){
                    alert("!!!!Could not retrieve data: " + e.error.message);
                }
            };
		
        
		dataSource.plug(Y.Plugin.DataSourceJSONSchema, {
	        schema: {
	           resultListLocator: "ResultSet.Result",
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
		
 		table.plug(Y.Plugin.DataTableDataSource, {datasource: dataSource});
 		//table.datasource.load();
 		table.render("#YUI_Grid_Area1").showMessage("조회 버튼을 클릭하여 주십시요.");
 		//=====================YUI그리드 영역 종료=====================
 		
 			
 			
 		
 		//==========================YUI페이징 영역 시작==============================	
 			
 		var pmodel = new Y.PaginatorModel({
		 	 page:           o.page, // default 값으로 일단 생성 사실 해당 값은 의미 없음 동적으로 변경됨.
		 	 itemsPerPage:   o.itemsPerPage,// default 값으로 일단 생성 사실 해당 값은 의미 없음 동적으로 변경됨.
		 	 totalItems:     200 // default 값으로 일단 생성 사실 해당 값은 의미 없음 동적으로 변경됨.
		});
				
				
		var pageBar = new Y.PaginatorView({
	        model:      		pmodel,
	        container:          o.yuiPaginator ,
	        paginatorTemplate:  Y.one(o.yuiPagiscript).getHTML(),
	        pageOptions:        [ 10, 25, 50, 100, 200 , 400 , 800], //400이상 넘어가기 시작하면 데이터 로드시 시간이 걸린다..
	        events: {//selectbox 이벤트 여기서
	            '.yui3-pagview-select-rowsperpage' : {
	                change : function(e){
	                    //this.model.set('page', +e.target.get('value') );
	                    //alert(e.target.get('value'));
	                   // p_util.PaginatorRender(e);
	                  	p_util.PaginatorRender(1,e.target.get('value'),table,Y); //1페이지 Or itemPerPages             
		                  
	                }
	            }
	        }
		}).render();	
 		
		//page input box 이벤트
	    pmodel.after('pageChange',function(e){
	         //alert("현제페이지=>" + e.newVal);
	         //alert(pageBar);
	         //alert(Y.one("#itemsPerPage").get("value"));
	         p_util.PaginatorRender(e.newVal,Y.one("#itemsPerPage").get("value"),table,Y); //1페이지 Or itemPerPages       
	    });
		
		p_util.PaginatorInitOrEnd(pageBar,Y);//페이징 관련 초기화 시작
		
	
		
		//페이지 변경시 이벤트 셀렉트 박스 변경시 두번호출되기 때문에 사용불가
		/*
		pageBar.after("pageChange",function(e){
			alert(e);
		});
		*/

		//==========================YUI페이징 영역 종료==============================
			
 		
			
 		
		//==========================YUI그리드 조회후 콜백 영역 시작==============================
		dataSource.after("response", function(e) {
			if(e.response.results.length === 0){
				table.render("#YUI_Grid_Area1").showMessage("조회된 데이터가 없습니다.");
			}else{
				//여기서 부터 페이징 처리 시작..
				p_util.PaginatorStart(pageBar,Y,e);
			}
			//fnCloseLoading();
			oBlock.blockEnd("YUI_Grid_Area1");
		});
		//==========================YUI그리드 조회후 콜백 영역 종료==============================
			
		
		
		
		//=====================YUI dom 컨트롤러 영역 시작=====================
		
		//조회
		Y.one("#search_btn").on("click",function(){
			//사용시 데이터를 post 방식으로 계속 넘기고 싶을 경우
			//table.render("#YUI_Grid_Area1");
			//fnShowLoading();
			oBlock.blockStart("${root}","YUI_Grid_Area1");
			p_util.PaginatorInitOrEnd(pageBar,Y);//페이징 관련 초기화 시작
			//console.log(table.datasource.get('config'));
			//table.datasource.set('', null);
			table.datasource.load({
				request : "namespace=yui.getList&getCount=yui.getCount",
			}); 
			//console.log(Y.one("#search_Form")._node.length);
			
			
			//해당시점에서 페이징 엘리먼트만 빼고 나머지 검색조건은 가지고 온다
			//console.log(Y.one("#search_Form")._node);
			
			//검색조건을 유지시키기 위한 펑션
			//즉 최초 검색한후 해당 검색값을 계속 유지한다 허나 페이징에 관련된 엘리먼트들은 formdata=N를 줘서 엘리먼트에서 뺸다
			p_util.PaginatorSearch(Y.one("#search_Form"));
			
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
		
		
		
		//=====================YUI dom 컨트롤러 영역 종료=====================
		
		
	});
	
	
	
	var p_util =  {
			
			//YUI Paginator
			 o : {},//dynamic object 지우면 안된다..사용하고 있음
			 a : [],//dynamic array
			
			PaginatorStart : function(pagebar,Y,e){
				
				//alert(Y.one("#pagBarACont").getStyle("display"));
				//페이징시 토탈레코드가 보여질 페이지와 같거나 작다면 페이징을 할 필요가 없다.
				
				var op =(eval(eval("(" + e.data.responseText + ")").ResultSet));//IE,Crom,FF 
				
				if(parseInt(op.totalRecord) > parseInt(op.itemsPerPage)){//현제 레코드 수가 보여질 레코드 수보다 클 경우에만 페이징이 나오도록
					
					
					pagebar.model.set("page",parseInt(op.page));
					pagebar.model.set("itemsPerPage",parseInt(op.itemsPerPage));
					pagebar.model.set("totalItems",parseInt(op.totalRecord));
					Y.one(o.yuipagiDiv).setStyle("display","block");	
					
					
				}else{
					p_util.PaginatorInitOrEnd(pagebar,Y);
				}
				
			},
			
			
			PaginatorRender : function(page,itemsPerPage,yui_Tb,Y){
				
				oBlock.blockStart(o.webroot,"YUI_Grid_Area1");
				
				Y.one("#page").set("value",page);
				Y.one("#itemsPerPage").set("value",itemsPerPage);
				
				
				//검색조건의 값을 유지시켜주기 위한 작업후 서치
				
				Y.Array.forEach(p_util.o.queryString.split("&"), function(data, i) {
					//console.log(data.split("="));  
					Y.one("#" + data.split("=")[0]).set("value" , data.split("=")[1]);
				});
				
				
				yui_Tb.datasource.load({
					request : "namespace=yui.getList&getCount=yui.getCount"    /*&" + p_util.o.queryString,*/
				}); 
				
			},
			
			PaginatorSearch : function(yFormObj){
				//console.log(yFormObj._node.elements);
				p_util.o.queryString = "";
				for(var i = 0; i < yFormObj._node.elements.length; i++){
					//console.log(yFormObj._node.elements[i].getAttribute("formdata"));
					if(yFormObj._node.elements[i].getAttribute("formdata") == undefined){
						//console.log(yFormObj._node.elements[i].name + " : "+ yFormObj._node.elements[i].value);
						p_util.o.queryString += yFormObj._node.elements[i].name + "=" + yFormObj._node.elements[i].value + "&";
					}
				}
				p_util.o.queryString = p_util.o.queryString.substring(0,(p_util.o.queryString.length - 1));
				
				//console.log(p_util.o.queryString);
				
			},
			
			PaginatorInitOrEnd : function(pagebar,Y){	
				Y.one(o.yuipagiDiv).setStyle("display","none");	
				Y.one("#page").set("value",o.page);
				Y.one("#itemsPerPage").set("value",o.itemsPerPage);
			}
	};
	
	
	
	
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
	 	<input type="hidden" id="page" name="page" value="" formdata="N"><!-- 현제페이지 default 1 (o.page)-->
	 	<input type="hidden" id="itemsPerPage" name="itemsPerPage" value="" formdata="N"> <!-- 보여질 페이지 25 (o.itemsPerPage)-->
	 	
	 	
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
    		<div id="yui_grid_area">
    			<div id="YUI_Grid_Area1"></div>
    		</div>
    		
    		<!-- YUI Paginator -->
			<div id="yui_paginator_area" style="display: none;">
	    		<div id="pagBarACont" class="pagBar yui3-pagview-bar"></div>
				<script type="text/x-template" id="tmpl-bar-A">
       	 			&nbsp;
        			<img src="${root}/resources/images/paginator/glyphicons_170_step_backward.png" class="pgControls {pageLinkClass}" data-pglink="first" title="First Page" border="0" />
        			<img src="${root}/resources/images/paginator/glyphicons_173_backTES.png" class="pgControls {pageLinkClass}" data-pglink="prev" title="Prior Page" border="0" />
        			{inputPage} / {totalPages}
        			<img src="${root}/resources/images/paginator/glyphicons_173_play.png" class="pgControls {pageLinkClass}" data-pglink="next" title="Next Page" border="0" />
        			<img src="${root}/resources/images/paginator/glyphicons_178_step_forward.png" class="pgControls {pageLinkClass}" data-pglink="last" title="Last Page" border="0" />
        			<span style="float:right;margin-right:20px;margin-top:2px;">Rows per Page: {selectRowsPerPage}</span>
    			</script>
			</div>

    		
    	</div>
    	
    	
      </div>
      
    </div>  