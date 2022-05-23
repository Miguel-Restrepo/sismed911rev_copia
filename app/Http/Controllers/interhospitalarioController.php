<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class interhospitalarioController extends Controller
{
    //
    public function index(){//inicio
        return "Modulo interhospitalario";
    }
    public function create(){//Crear uno
        return "Modulo interhospitalario crear";
    }
    public function show($id){//Muestra uno en especifico
        return "Modulo interhospitalario ".$id;
    }
}
