<?php

namespace App\Http\Controllers;

use App\Models\Imagendx;
use Illuminate\Http\Request;

class ImagendxController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        return Imagendx::all();
    }
}
