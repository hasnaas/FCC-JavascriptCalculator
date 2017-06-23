var operande='',oper='%';//use an array instead to keep track of all operations
var expression='';
var done=false;

function calculate(expr){
  var res=0;
  var o1='',o2='';
  if(expr.charAt(0)!="-")
    expr="+"+expr;
  for(var i=expr.length-1;i>=0;i--){
    switch(expr.charAt(i)){
      case "+": res=res+parseFloat(o1);o1=''; break;
      case "-" : res=res-parseFloat(o1); o1=''; break;
      case "*" :i--;
        while("*+-/".indexOf(expr.charAt(i))<0){
          o2=expr.charAt(i)+o2;
          i--;
        }
        i++;
        o1=(parseFloat(o1)*parseFloat(o2)).toString();
        o2='';
        break;
      case "/" : if (o1=="0") return undefined;
        i--;
        while("*+-/".indexOf(expr.charAt(i))<0){
          o2=expr.charAt(i)+o2;
          i--;
        }
        i++;
        o1=(parseFloat(o2)/parseFloat(o1)).toString();
        o2='';
        break;
      default: o1=expr.charAt(i)+o1; break;
                         }
  }
  return res;
  
}
$(".bouton").click(function(e){
  var l=$(this).attr("name");
  switch(l){
    case "ac":$("#bscreen").val("0");
      $("#sscreen").val("0");
      expression='';
      operande='';
      oper='';
      break;
    case "ce":$("#bscreen").val("0");
      expression=$("#sscreen").val();
      var indice=expression.lastIndexOf(oper);
      if(done || indice<0){
        expression='';
        operande='';
        $("#sscreen").val('0');
        done=false;
      }
      else
        {
          if(indice==expression.length-1){
            expression=expression.slice(0,indice);
          }
          else{
          expression=expression.slice(0,indice+1);  
          }
          operande='';
          $("#sscreen").val(expression);
        }
      break;
    case "0" :case "1": case "2" : case "3": case "4" : case "5" : case "6" : case "7" : case "8": case "9": case ".":
      if(done){
        expression='';
        oper='';
        operande='';
        done=false;
      }
      operande+=l; expression+=l;
      $("#bscreen").val(operande);
      $("#sscreen").val(expression);
      break;
    case "+":case "-":case "*":case "/": oper=l; expression+=l;operande=''; done=false;
      $("#bscreen").val(l);
      $("#sscreen").val(expression);
      break;
    case "=":if(oper=='')break;
      var result=calculate(expression);
      $("#bscreen").val(result);
      $("#sscreen").val(expression+"="+result);
      expression=result;
      oper='';
      operande='';
      done=true;
      break;
          }
  
});