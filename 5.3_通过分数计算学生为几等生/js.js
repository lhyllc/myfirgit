// 采用ifelse和switch两种判断
function ifshow() {
	var grade;
	var scoreshow = document.getElementById('scoreshow');
	var score = document.getElementById('score').value;
	if (score =="" || score == null || isNaN(score) || score > 100 || score < 0){
		grade = "请输入正确内容，分数应该在0~100之间";
	} 
	else if (score >89) {
		grade = "该学生为：一等生";
	} 
	else if(score > 79) {
		grade = "该学生为：二等生";
	} 
	else if(score > 69) {
		grade = "该学生为：三等生";
	} 
	else if(score > 59) {
		grade = "该学生为：四等生";
	} 
	else if(score > 49) {
		grade = "该学生为：五等生";	
	} 
	else if(score > 39) {
		grade = "该学生为：六等生";		
	} 
	else if(score > 29) {
		grade = "该学生为：七等生";		
	} 
	else if(score > 19) {
		grade = "该学生为：八等生";		
	} 
	else if(score > 9) {
		grade = "该学生为：九等生";	
	} 
	else if(score >= 0) {
		grade = "该学生为：十等生";	
	} 
	else{
		grade = "你太厉害了！成绩超出了我们的想象";
	}

	scoreshow.innerHTML= grade;
}
// switch判断
function switchshow(){
	var grade;
	var scoreshow = document.getElementById('scoreshow');
	var score = document.getElementById('score').value;
	if (score =="" || score == null || isNaN(score) || score > 100 || score < 0){
		grade = "请输入正确内容，分数应该在0~100之间";
	}else{
		var tempscore = parseInt(score/10);
		switch (tempscore){
		case 10 :
			grade = "该学生为：一等生";
			break;
		case 9 :
			grade = "该学生为：一等生";
			break;
		case 8 :
			grade = "该学生为：二等生";
			break;
		case 7 :
			grade = "该学生为：三等生";
			break;
		case 6 :
			grade = "该学生为：四等生";
			break;
		case 5 :
			grade = "该学生为：五等生";
			break;
		case 4 :
			grade = "该学生为：六等生";
			break;
		case 3 :
			grade = "该学生为：七等生";
			break;
		case 2 :
			grade = "该学生为：八等生";
			break;
		case 1 :
			grade = "该学生为：九等生";
			break;
		default :
			grade = "该学生为：十等生";
			break;
		}
	}
	



scoreshow.innerHTML= grade;
}