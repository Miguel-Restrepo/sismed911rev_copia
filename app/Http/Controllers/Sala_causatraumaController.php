<?php

namespace App\Http\Controllers;

use App\Models\Sala_causatrauma;
use Illuminate\Http\Request;

class Sala_causatraumaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_causatrauma::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_causatrauma::find($id);
        $objeto= Sala_causatrauma::where('id_salaCausa',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_causatrauma::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_causatrauma::find($id);
        $objeto= Sala_causatrauma::where('id_salaCausa',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_causatrauma::find($id);
        $objeto= Sala_causatrauma::where('id_salaCausa',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
