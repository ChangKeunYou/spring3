function includeScriptByCallback(scriptFile, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.charset = 'utf-8';
	script.src = scriptFile;
	if (script.readyState) {
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} 
	else {
		script.onload = function(){
			callback();
		};
	}
	head.appendChild(script);
}
