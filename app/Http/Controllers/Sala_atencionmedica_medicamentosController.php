<?php

namespace App\Http\Controllers;

use App\Models\Sala_atencionmedica_medicamentos;
use Illuminate\Http\Request;

class Sala_atencionmedica_medicamentosController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $acercades = Sala_atencionmedica_medicamentos::all();
        return $acercades;
    }
    public function show($id)
    { //Muestra uno en especifico
        //$objeto= Sala_atencionmedica_medicamentos::find($id);
        $objeto = Sala_atencionmedica_medicamentos::where('id_atencionmedica_medicamentos', $id)->first();
        return $objeto;
    }
    public function store(Request $request)
    { //Guardar informacion
        $objeto = Sala_atencionmedica_medicamentos::create($request->all());
        $objeto->save();
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Sala_atencionmedica_medicamentos::find($id);
        $objeto = Sala_atencionmedica_medicamentos::where('id_atencionmedica_medicamentos', $id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Sala_atencionmedica_medicamentos::find($id);
        $objeto = Sala_atencionmedica_medicamentos::where('id_atencionmedica_medicamentos', $id)->first();
        $objeto->delete();
        return "OK";
    }
    public function eliminar(Request $request)
    { //Guardar informacion
        $objeto = Sala_atencionmedica_medicamentos::where('id_atencionmedica', $request->id_atencionmedica)
            ->where('id_medicamentos', $request->id_medicamentos)->firt();
        $objeto->delete();
        return "OK";
    }
}
