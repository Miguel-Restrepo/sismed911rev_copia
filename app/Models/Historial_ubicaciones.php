<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historial_ubicaciones extends Model
{
    use HasFactory;
    public $timestamps = false;//Evita columnas de actualizacion y creacio
    protected $table= "historial_ubicaciones";
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
