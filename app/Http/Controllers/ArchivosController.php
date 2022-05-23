<?php

namespace App\Http\Controllers;

use App\Models\Archivos;
use Illuminate\Http\Request;

class ArchivosController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $objeto= Archivos::all();
        return $objeto;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Archivos::find($id);
        //$objeto= Ambulancia_taller::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
       

        $objeto= new Archivos;
        $objeto->cod_casointerh=$request->input('cod_casointerh');
        $objeto->cod_casopreh=$request->input('cod_casopreh');
        $objeto1=Archivos::latest('id_archivo')->first();
        $objeto->id_archivo=$objeto1->id_archivo+1;
        $objeto->nombre_archivo=$request->file('archivo')->store('archivos');
        $objeto->nombre_original=$request->input('nombre_original');
        
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Archivos::find($id);
        //$objeto= Ambulancia_taller::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Archivos::find($id);
        //$objeto= Ambulancia_taller::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
