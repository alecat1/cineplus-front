-	function calcular_fecha(){
-	    var fecha_fin = document.formulario.fecha.value;
-	    if(fecha_fin == 0){
-	        alert("Ingresa una fecha");
-	        document.formulario.fecha.focus()
-	        return 0;
-	    }else{
-	        if (fecha_fin.length < 10){
-	            alert("Ingrese una fecha válida");
-	            document.formulario.fecha.focus()
-	            return 0;
-	        }
-	        if(isNaN(fecha_fin)){
-	            alert("Ingrese una fecha númerica");
-	        }
-	        separadores = ['-','/'],
-	        arr_fecha_fin = fecha_fin.split (new RegExp (separadores.join('|'),'g'));
-	        año = Math.max.apply(null,arr_fecha_fin);
-	        if (arr_fecha_fin[2] == año){
-	            var nueva_fecha = arr_fecha_fin[1] + '-' + arr_fecha_fin[0]+ '-' + arr_fecha_fin[2]; /*dd/MM/yyyy*/
-	        }
-	        if (arr_fecha_fin[0] == año){
-	            nueva_fecha = arr_fecha_fin[1] + '-' + arr_fecha_fin[2]+ '-' + arr_fecha_fin[0]; /*yyyy/MM/dd*/
-	        }
-	        var fechai = new Date(año +'-01-01');
-	        var fechaf = new Date(nueva_fecha);
-	        var dias= fechaf.getTime()-fechai.getTime();
-	        var contdias = Math.round(dias/(1000*60*60*24));
-	        document.getElementById('respuesta').innerHTML = contdias;
-	
-	    }
-	
-	}