<?php

namespace App\Http\Controllers;

use App\Models\Alerta_censo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Alerta_censoController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $acercades = Alerta_censo::all();
        return $acercades;
    }
    public function obtenerProximosNotificaciones()
    { //PARA OBTENER TODOS LOS REGISTROS

        $SQLconsulta = "SELECT 	texto_notificacion from (
            SELECT texto_notificacion,   
            EXTRACT(min FROM age(timestamp 'now()',hora1 ) )+CAST(t_notificacion AS int) as tiempo1,
            EXTRACT(min FROM age(timestamp 'now()',hora2 ) )+CAST(t_notificacion AS int) as tiempo2,
            EXTRACT(min FROM age(timestamp 'now()',hora3 ) )+CAST(t_notificacion AS int) as tiempo3,
            EXTRACT(min FROM age(timestamp 'now()',hora4 ) )+CAST(t_notificacion AS int) as tiempo4,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora1) ) ) as t1,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora2) ) ) as t2,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora3) ) ) as t3,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora4) ) ) as t4,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora1) ) ) as d1,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora2) ) ) as d2,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora3) ) ) as d3,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora4) ) ) as d4,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora1) ) ) as m1,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora2) ) ) as m2,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora3) ) ) as m3,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora4) ) ) as m4,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora1) ) ) as y1,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora2) ) ) as y2,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora3) ) ) as y3,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora4) ) ) as y4
            FROM  alerta_censo
             ) re
             where (tiempo1>=-5 and tiempo1 <=5 and t1=0 and d1=0 and m1=0 and y1=0) or
                     (tiempo2>=-5 and tiempo2 <=5 and t2=0 and d2=0 and m2=0 and y2=0) or
                    (tiempo3>=-5 and tiempo3 <=5 and t3=0 and d3=0 and m3=0 and y3=0) or
                    (tiempo4>=-5 and tiempo4 <=5 and t4=0 and d4=0 and m4=0 and y4=0);";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function obtenerProximosRecordatorios()
    { //PARA OBTENER TODOS LOS REGISTROS
        $SQLconsulta = "SELECT 	texto_recordatorio, * from (
            SELECT texto_recordatorio,   
            EXTRACT(min FROM age(timestamp 'now()',hora1 ) )+CAST(t_recordatorio AS int) as tiempo1,
            EXTRACT(min FROM age(timestamp 'now()',hora2 ) )+CAST(t_recordatorio AS int) as tiempo2,
            EXTRACT(min FROM age(timestamp 'now()',hora3 ) )+CAST(t_recordatorio AS int) as tiempo3,
            EXTRACT(min FROM age(timestamp 'now()',hora4 ) )+CAST(t_recordatorio AS int) as tiempo4,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora1) ) ) as t1,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora2) ) ) as t2,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora3) ) ) as t3,
            EXTRACT(HOUR FROM age(timestamp 'now()',(hora4) ) ) as t4,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora1) ) ) as d1,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora2) ) ) as d2,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora3) ) ) as d3,
            EXTRACT(DAY FROM age(timestamp 'now()',(hora4) ) ) as d4,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora1) ) ) as m1,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora2) ) ) as m2,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora3) ) ) as m3,
            EXTRACT(MONTH FROM age(timestamp 'now()',(hora4) ) ) as m4,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora1) ) ) as y1,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora2) ) ) as y2,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora3) ) ) as y3,
            EXTRACT(YEAR FROM age(timestamp 'now()',(hora4) ) ) as y4
            FROM  alerta_censo
             ) re
             where (tiempo1>=-5 and tiempo1 <=5 and t1=0 and d1=0 and m1=0 and y1=0) or
                     (tiempo2>=-5 and tiempo2 <=5 and t2=0 and d2=0 and m2=0 and y2=0) or
                    (tiempo3>=-5 and tiempo3 <=5 and t3=0 and d3=0 and m3=0 and y3=0) or
                    (tiempo4>=-5 and tiempo4 <=5 and t4=0 and d4=0 and m4=0 and y4=0) ;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function show($id)
    { //Muestra uno en especifico
        //$objeto= Alerta_censo::find($id);
        $objeto = Alerta_censo::where('id_tiempocenso', $id)->first();
        return $objeto;
    }
    public function store(Request $request)
    { //Guardar informacion
        $objeto = Alerta_censo::create($request->all());
        $objeto->save();
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Alerta_censo::find($id);
        $objeto = Alerta_censo::where('id_tiempocenso', $id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Alerta_censo::find($id);
        $objeto = Alerta_censo::where('id_tiempocenso', $id)->first();
        $objeto->delete();
        return "OK";
    }
}
