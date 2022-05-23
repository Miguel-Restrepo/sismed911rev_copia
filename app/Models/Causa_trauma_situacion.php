<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Causa_trauma_situacion extends Model
{
    use HasFactory;
    protected $table= "causa_trauma_situacion";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
