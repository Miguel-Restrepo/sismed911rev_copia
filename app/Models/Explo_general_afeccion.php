<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Explo_general_afeccion extends Model
{
    use HasFactory;
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    
    protected $table= "explo_general_afeccion";
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
