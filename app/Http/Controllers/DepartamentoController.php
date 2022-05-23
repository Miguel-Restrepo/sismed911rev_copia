<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use App\Models\Depto_reniec;
use App\Models\Distrito;
use App\Models\Distrito_reniec;
use App\Models\Provincias;
use App\Models\Provincias_reniec;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Departamento::all();
        return $acercades;
    }
    public function anidado(){
        $objeto= Departamento::all();
        foreach ($objeto as $post) {
            $post->provincias=Provincias::where('cod_departamento',$post->cod_dpto)->get();
            foreach ($post->provincias as $key) {
                $key->distritos=Distrito::where('cod_provincia',$key->cod_provincia)->get();
            }

        }
        return $objeto;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Departamento::find($id);
        $objeto= Departamento::where('cod_dpto',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Departamento::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Departamento::find($id);
        $objeto= Departamento::where('cod_dpto',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Departamento::find($id);
        $objeto= Departamento::where('cod_dpto',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
