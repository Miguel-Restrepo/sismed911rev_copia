<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use App\Models\Distrito_reniec;
use App\Models\Pacientegeneral;
use App\Models\Provincias;
use App\Models\Sala_admission;
use App\Models\Tipo_edad;
use App\Models\Tipo_genero;
use App\Models\Tipo_id;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PacientegeneralController extends Controller
{
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $objeto = DB::table('pacientegeneral')
            ->leftJoin('tipo_id', 'tipo_id.id_tipo', '=', 'pacientegeneral.tipo_doc')
            ->leftJoin('tipo_edad', 'tipo_edad.id_edad', '=', 'pacientegeneral.cod_edad')
            ->leftJoin('tipo_genero', 'tipo_genero.id_genero', '=', 'pacientegeneral.genero')
            ->leftJoin('departamento', 'departamento.cod_dpto', '=', 'pacientegeneral.dpto_pte')
            ->leftJoin('provincias', 'provincias.cod_provincia', '=', 'pacientegeneral.provin_pte')
            ->leftJoin('distrito_reniec', 'distrito_reniec.cod_distrito', '=', 'pacientegeneral.distrito_pte')
            ->select(
                'pacientegeneral.id_paciente as codigo',
                'pacientegeneral.*',
                'tipo_id.*',
                'tipo_edad.*',
                'tipo_genero.*',
                'departamento.*',
                'provincias.*',
                'distrito_reniec.*'
            )
            ->get();

        return $objeto;
    }
    public function show($id)
    { //Muestra uno en especifico
        //$objeto= Pacientegeneral::find($id);
        $objeto = Pacientegeneral::where('id_paciente', $id)
            ->leftJoin('tipo_id', 'tipo_id.id_tipo', '=', 'pacientegeneral.tipo_doc')
            ->leftJoin('tipo_edad', 'tipo_edad.id_edad', '=', 'pacientegeneral.cod_edad')
            ->leftJoin('tipo_genero', 'tipo_genero.id_genero', '=', 'pacientegeneral.genero')
            ->leftJoin('departamento', 'departamento.cod_dpto', '=', 'pacientegeneral.dpto_pte')
            ->leftJoin('provincias', 'provincias.cod_provincia', '=', 'pacientegeneral.provin_pte')
            ->leftJoin('distrito_reniec', 'distrito_reniec.cod_distrito', '=', 'pacientegeneral.distrito_pte')
            ->select(
                'pacientegeneral.id_paciente as codigo',
                'pacientegeneral.*',
                'tipo_id.*',
                'tipo_edad.*',
                'tipo_genero.*',
                'departamento.*',
                'provincias.*',
                'distrito_reniec.*'
            )->first();
        return $objeto;
    }
    public function store(Request $request)
    { //Guardar informacion
        $objeto = Pacientegeneral::create($request->all());
        $objeto->save();
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Pacientegeneral::find($id);
        $objeto = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto->update($request->all());
        return $objeto;
    }

    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Pacientegeneral::find($id);
        $objeto = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto->delete();
        return "OK";
    }

    public function verTipoId($id)
    { //Muestra uno en especifico
        $objeto1 = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto = Tipo_id::where('id_tipo', $objeto1->tipo_doc)->first();
        return $objeto;
    }

    public function verTipoGenero($id)
    { //Muestra uno en especifico
        $objeto1 = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto = Tipo_genero::where('id_genero', $objeto1->genero)->first();
        return $objeto;
    }

    public function verTipoEdad($id)
    { //Muestra uno en especifico
        $objeto1 = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto = Tipo_edad::where('id_edad', $objeto1->cod_edad)->first();
        return $objeto;
    }

    public function verDepartamento($id)
    { //Muestra uno en especifico
        $objeto1 = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto = Departamento::where('cod_dpto', $objeto1->dpto_pte)->first();
        return $objeto;
    }

    public function verProvincias($id)
    { //Muestra uno en especifico
        $objeto1 = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto = Provincias::where('cod_provincia', $objeto1->provin_pte)->first();
        return $objeto;
    }

    public function verDistrito($id)
    { //Muestra uno en especifico
        $objeto1 = Pacientegeneral::where('id_paciente', $id)->first();
        $objeto = Distrito_reniec::where('cod_distrito', $objeto1->distrito_pte)->first();
        return $objeto;
    }

    public function verSalasAdmision($id)
    { //Muestra uno en especifico
        $objeto = Sala_admission::where('id_paciente', $id)->get();
        return $objeto;
    }

    public function getToken(Request $request)
    { // Obtiene el token
        try {
            return file_get_contents('https://sns-intranet-imp.azurewebsites.net/token?key=' . $request['key']);
            //return file_get_contents('https://sns-intranet-imp.azurewebsites.net/token?key=' . $request['key']);
        } catch (\Exception $e) {
            return 'Ha ocurrido un error';
        }
    }

    public function getDatos(Request $request)
    { // Obtiene los datos según una cédula dada
        try {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://sns-intranet-imp.azurewebsites.net/personas/info?cd=' . $request['doc'],
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_HTTPHEADER => array(
                    'Authorization: Bearer ' . $request['token']
                ),
            ));

            $data = curl_exec($curl);
            curl_close($curl);
            return $data;
        } catch (\Exception $e) {
            return 'Ha ocurrido un error';
        }
    }
}
